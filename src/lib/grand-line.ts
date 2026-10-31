export type PlayerIdentity = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  legacyName?: string;
};

export type MechanicKey =
  | "jokers"
  | "chest"
  | "raid"
  | "bounty"
  | "curses"
  | "events";

export type MechanicConfig = Record<MechanicKey, boolean>;

export type ArchivedRound = {
  id?: string;
  playedAt?: number;
  settings?: {
    crewLimit?: number;
    passLimit?: number;
    budget?: number;
    timer?: number;
    tiers?: string[];
  };
  teams?: Array<{
    name?: string;
    playerId?: string;
    remaining?: number;
    spent?: number;
    passes?: number;
    characters?: Array<{ name?: string; tier?: string; price?: number }>;
  }>;
  ranking?: Array<{ name?: string; playerId?: string; rank?: number }>;
  highlights?: Record<string, unknown>;
};

const REGISTRY_KEY = "onePieceDraftPlayerIdentitiesV1";
const MANAGER_KEY = "onePieceDraftManagerPlayerIdV1";
const MECHANICS_KEY = "onePieceDraftMechanicConfigV1";
const PAST_ROUNDS_KEY = "onePieceDraftPastRoundsV1";
const SCOREBOARD_KEY = "onePieceDraftScoreboard";

export const defaultMechanics: MechanicConfig = {
  jokers: false,
  chest: false,
  raid: false,
  bounty: false,
  curses: false,
  events: false,
};

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? `pirate-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function readPlayerRegistry(): PlayerIdentity[] {
  const stored = safeParse<PlayerIdentity[]>(localStorage.getItem(REGISTRY_KEY), []);
  if (!Array.isArray(stored)) return [];
  const seen = new Set<string>();
  return stored.filter((player) => {
    if (!player?.id || !player?.name || seen.has(player.id)) return false;
    seen.add(player.id);
    return true;
  });
}

export function writePlayerRegistry(players: PlayerIdentity[]) {
  localStorage.setItem(REGISTRY_KEY, JSON.stringify(players));
}

export function ensurePlayerRegistry(defaultNames: string[]): PlayerIdentity[] {
  const registry = readPlayerRegistry();
  const byName = new Map(registry.map((player) => [player.name, player]));
  const next = [...registry];
  defaultNames.forEach((name) => {
    if (!byName.has(name)) {
      const player: PlayerIdentity = {
        id: makeId(),
        name,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      next.push(player);
      byName.set(name, player);
    }
  });
  writePlayerRegistry(next);
  return next;
}

export function addPlayerIdentity(name: string): PlayerIdentity {
  const clean = name.trim();
  if (!clean) throw new Error("Oyuncu adı boş olamaz.");
  const registry = readPlayerRegistry();
  if (registry.some((player) => player.name.toLocaleLowerCase("tr-TR") === clean.toLocaleLowerCase("tr-TR"))) {
    throw new Error("Bu oyuncu zaten kayıtlı.");
  }
  const player: PlayerIdentity = {
    id: makeId(),
    name: clean,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  writePlayerRegistry([...registry, player]);
  return player;
}

export function renamePlayerIdentity(id: string, name: string) {
  const clean = name.trim();
  if (!clean) throw new Error("Oyuncu adı boş olamaz.");
  const registry = readPlayerRegistry();
  if (registry.some((player) => player.id !== id && player.name.toLocaleLowerCase("tr-TR") === clean.toLocaleLowerCase("tr-TR"))) {
    throw new Error("Bu ad başka bir oyuncuya ait.");
  }
  writePlayerRegistry(
    registry.map((player) =>
      player.id === id
        ? { ...player, name: clean, legacyName: player.legacyName ?? player.name, updatedAt: Date.now() }
        : player,
    ),
  );
}

export function removePlayerIdentity(id: string) {
  const registry = readPlayerRegistry().filter((player) => player.id !== id);
  writePlayerRegistry(registry);
  if (localStorage.getItem(MANAGER_KEY) === id) localStorage.removeItem(MANAGER_KEY);
}

export function readManagerId(fallbackId?: string) {
  const stored = localStorage.getItem(MANAGER_KEY);
  if (stored && readPlayerRegistry().some((player) => player.id === stored)) return stored;
  if (fallbackId) {
    localStorage.setItem(MANAGER_KEY, fallbackId);
    return fallbackId;
  }
  return null;
}

export function writeManagerId(id: string | null) {
  if (id) localStorage.setItem(MANAGER_KEY, id);
  else localStorage.removeItem(MANAGER_KEY);
}

export function readMechanicConfig(): MechanicConfig {
  const stored = safeParse<Partial<MechanicConfig>>(localStorage.getItem(MECHANICS_KEY), {});
  return { ...defaultMechanics, ...stored };
}

export function writeMechanicConfig(config: MechanicConfig) {
  localStorage.setItem(MECHANICS_KEY, JSON.stringify(config));
}

export function readArchivedRounds(): ArchivedRound[] {
  const rounds = safeParse<ArchivedRound[]>(localStorage.getItem(PAST_ROUNDS_KEY), []);
  return Array.isArray(rounds) ? rounds : [];
}

export function readLegacyScoreboard(): Record<string, { points?: number; games?: number; wins?: number }> {
  return safeParse<Record<string, { points?: number; games?: number; wins?: number }>>(
    localStorage.getItem(SCOREBOARD_KEY),
    {},
  );
}

export function hasExtendedMechanics(config: MechanicConfig) {
  return Object.values(config).some(Boolean);
}
