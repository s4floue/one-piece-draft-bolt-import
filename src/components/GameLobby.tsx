import { useMemo, useState } from "react";
import {
  Anchor,
  Crown,
  Flame,
  Gem,
  GripVertical,
  Plus,
  Skull,
  Sparkles,
  Swords,
  Trash2,
  Wallet,
  UserRoundCog,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  addPlayerIdentity,
  defaultMechanics,
  MechanicConfig,
  MechanicKey,
  PlayerIdentity,
  readManagerId,
  readMechanicConfig,
  removePlayerIdentity,
  renamePlayerIdentity,
  writeManagerId,
  writeMechanicConfig,
} from "@/lib/grand-line";

export type LaunchConfig = {
  launchId: string;
  players: Array<{ id: string; name: string; legacyName?: string }>;
  managerId: string;
  crewLimit: number;
  passLimit: number;
  budget: number;
  timerEnabled: boolean;
  timerSeconds: number;
  soundEnabled: boolean;
  soundVolume: number;
  mechanics: MechanicConfig;
};

const MECHANIC_META: Array<{
  key: MechanicKey;
  title: string;
  eyebrow: string;
  description: string;
  detail: string;
  icon: typeof Gem;
}> = [
  { key: "jokers", title: "Joker Sistemi", eyebrow: "Karteninle oyna", description: "Her korsana özel jokerler ver.", detail: "İndirim, ekstra çekiliş, yenileme ve koruma jokerleri aynı alımda kullanılabilir.", icon: Gem },
  { key: "chest", title: "Hazine Sandığı", eyebrow: "Bir kez aç", description: "Oyuncunun kaderine bir kasa.", detail: "Para, joker veya boş bir ödül; sandık karakter veya pas hakkı tüketmez.", icon: Wallet },
  { key: "raid", title: "Korsan Baskını", eyebrow: "Hedefi seç", description: "Rakiplerin hazinesinden yağma.", detail: "Her oyuncu bir kez hedef seçer; hedeften en fazla $10 alınır.", icon: Swords },
  { key: "bounty", title: "Kafa Ödülü", eyebrow: "Gizli av", description: "Kim gerçekten ödüllü?", detail: "Gizli karakteri ilk ekleyen oyuncuya $15 ek ödül verilir.", icon: Skull },
  { key: "curses", title: "Şeytan Meyvesi Laneti", eyebrow: "Kader cezası", description: "Belirli aralıklarla lanetler tetiklenir.", detail: "Her üç tamamlanmış seçimde yüzde 50 kontrol yapılır; oyuncu başına bir lanet.", icon: Flame },
  { key: "events", title: "Oyun Olayları", eyebrow: "Grand Line haberi", description: "Masaya sürpriz seferler katılır.", detail: "Takvim oyun başında oluşturulur; olaylar iki tam masa turu aralıkla planlanır.", icon: Sparkles },
];

export function GameLobby({
  registry,
  onRegistryChange,
  onLaunch,
}: {
  registry: PlayerIdentity[];
  onRegistryChange: (players: PlayerIdentity[]) => void;
  onLaunch: (config: LaunchConfig) => void;
}) {
  const [crewLimit, setCrewLimit] = useState(5);
  const [passLimit, setPassLimit] = useState(10);
  const [budget, setBudget] = useState(20);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(60);
  const [mechanics, setMechanics] = useState<MechanicConfig>(() => readMechanicConfig());
  const [managerId, setManagerId] = useState<string | null>(() => readManagerId(registry[0]?.id));
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>(() => registry.slice(0, 5).map((player) => player.id));
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  const activePlayers = useMemo(
    () => selectedPlayers.map((id) => registry.find((player) => player.id === id)).filter((player): player is PlayerIdentity => Boolean(player)),
    [registry, selectedPlayers],
  );

  const addPlayer = () => {
    try {
      const player = addPlayerIdentity(newName);
      onRegistryChange([...registry, player]);
      setSelectedPlayers((current) => [...current, player.id]);
      setNewName("");
      setError("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Oyuncu eklenemedi.");
    }
  };

  const movePlayer = (id: string, direction: -1 | 1) => {
    setSelectedPlayers((current) => {
      const index = current.indexOf(id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  };

  const toggleMechanic = (key: MechanicKey, enabled: boolean) => {
    const next = { ...mechanics, [key]: enabled };
    setMechanics(next);
    writeMechanicConfig(next);
  };

  const launch = () => {
    if (!activePlayers.length) {
      setError("En az bir korsan seçmelisin.");
      return;
    }
    if (!managerId || !activePlayers.some((player) => player.id === managerId)) {
      setError("Oyun yöneticisini seçmelisin.");
      return;
    }
    writeManagerId(managerId);
    onLaunch({
      launchId: globalThis.crypto?.randomUUID?.() ?? `launch-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      players: activePlayers.map((player) => ({ id: player.id, name: player.name, legacyName: player.legacyName })),
      managerId,
      crewLimit,
      passLimit,
      budget,
      timerEnabled,
      timerSeconds,
      soundEnabled,
      soundVolume,
      mechanics,
    });
  };

  return (
    <div className="grand-line-page lobby-page">
      <div className="ambient-grid" />
      <main className="grand-line-container lobby-layout">
        <header className="scene-heading lobby-heading">
          <span className="scene-kicker"><Anchor /> Mürettebat hazırlığı</span>
          <h1>Grand Line <em>Lobisi</em></h1>
          <p>Korsanlarını seç, seferin kurallarını belirle ve canlı masaya çık.</p>
        </header>

        <section className="lobby-crew-panel glass-panel">
          <div className="panel-title-row">
            <div><span className="panel-index">01</span><h2>Mürettebat</h2></div>
            <span className="panel-caption">Sürükle veya oklarla sırala</span>
          </div>
          <div className="lobby-player-grid">
            {activePlayers.map((player, index) => (
              <article key={player.id} className={`lobby-player-card ${managerId === player.id ? "is-manager" : ""}`}>
                <span className="drag-handle"><GripVertical /></span>
                <span className="crew-number">{String(index + 1).padStart(2, "0")}</span>
                <input
                  aria-label={`${player.name} adını değiştir`}
                  value={player.name}
                  onChange={(event) => {
                    const name = event.target.value;
                    onRegistryChange(registry.map((item) => item.id === player.id ? { ...item, name } : item));
                  }}
                  onBlur={(event) => {
                    try {
                      renamePlayerIdentity(player.id, event.target.value);
                      setError("");
                    } catch (reason) {
                      setError(reason instanceof Error ? reason.message : "Ad değiştirilemedi.");
                      onRegistryChange(registry);
                    }
                  }}
                />
                <div className="crew-card-actions">
                  <button type="button" onClick={() => movePlayer(player.id, -1)} disabled={index === 0} aria-label="Sırada geri taşı">←</button>
                  <button type="button" onClick={() => movePlayer(player.id, 1)} disabled={index === activePlayers.length - 1} aria-label="Sırada ilerlet">→</button>
                  <button type="button" onClick={() => {
                    removePlayerIdentity(player.id);
                    onRegistryChange(registry.filter((item) => item.id !== player.id));
                    setSelectedPlayers((current) => current.filter((id) => id !== player.id));
                  }} aria-label="Oyuncuyu sil"><Trash2 /></button>
                </div>
                <button
                  type="button"
                  className={`manager-select ${managerId === player.id ? "active" : ""}`}
                  onClick={() => setManagerId(player.id)}
                >
                  <Crown /> {managerId === player.id ? "Oyun yöneticisi" : "Yönetici yap"}
                </button>
              </article>
            ))}
          </div>
          <div className="add-crew-row">
            <div><Plus /><input value={newName} maxLength={24} onChange={(event) => setNewName(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addPlayer()} placeholder="Yeni korsan adı" /></div>
            <Button onClick={addPlayer} className="gold-action">Mürettebata katıl</Button>
          </div>
          {error && <p className="lobby-error">{error}</p>}
        </section>

        <section className="lobby-settings-panel glass-panel">
          <div className="panel-title-row">
            <div><span className="panel-index">02</span><h2>Sefer ayarları</h2></div>
            <UserRoundCog className="panel-icon" />
          </div>
          <div className="lobby-control-grid">
            <label><span>Tayfa kapasitesi</span><select value={crewLimit} onChange={(event) => setCrewLimit(Number(event.target.value))}>{Array.from({ length: 8 }, (_, index) => index + 3).map((value) => <option key={value}>{value}</option>)}</select><small>Her korsanın hedefi</small></label>
            <label><span>Pas hakkı</span><select value={passLimit} onChange={(event) => setPassLimit(Number(event.target.value))}>{[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((value) => <option key={value}>{value}</option>)}</select><small>Masada kullanılabilir</small></label>
            <label className="budget-control"><span>Başlangıç bütçesi</span><select value={budget} onChange={(event) => setBudget(Number(event.target.value))}>{Array.from({ length: 20 }, (_, index) => index + 5).map((value) => <option key={value}>{value}</option>)}</select><small>Kişi başı, dolar</small></label>
            <label><span>Süre sayacı</span><select value={timerEnabled ? "yes" : "no"} onChange={(event) => setTimerEnabled(event.target.value === "yes")}><option value="no">Kapalı</option><option value="yes">Açık</option></select><small>Karakter başına</small></label>
            <label><span>Çekiliş süresi</span><select value={timerSeconds} disabled={!timerEnabled} onChange={(event) => setTimerSeconds(Number(event.target.value))}>{[15, 20, 30, 45, 60].map((value) => <option key={value}>{value}</option>)}</select><small>Saniye</small></label>
            <label><span>Açılış sesi</span><select value={soundEnabled ? "yes" : "no"} onChange={(event) => setSoundEnabled(event.target.value === "yes")}><option value="yes">Açık</option><option value="no">Kapalı</option></select><small>Özel çıkarış</small></label>
          </div>
        </section>

        <section className="lobby-mechanics-panel glass-panel">
          <div className="panel-title-row">
            <div><span className="panel-index">03</span><h2>Korsan Olayları</h2></div>
            <span className="panel-caption">Her mod bağımsız açılır</span>
          </div>
          <div className="mechanic-grid">
            {MECHANIC_META.map(({ key, title, eyebrow, description, detail, icon: Icon }) => (
              <article key={key} className={`mechanic-card ${mechanics[key] ? "enabled" : ""}`}>
                <div className="mechanic-card-top">
                  <span className="mechanic-icon"><Icon /></span>
                  <Switch checked={mechanics[key]} onCheckedChange={(enabled) => toggleMechanic(key, enabled)} aria-label={`${title} aç veya kapat`} />
                </div>
                <span className="mechanic-eyebrow">{eyebrow}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                {mechanics[key] && <div className="mechanic-detail">{detail}</div>}
              </article>
            ))}
          </div>
        </section>

        <aside className="ready-console glass-panel">
          <span className="console-kicker">Son kontrol</span>
          <h2>Sefer emri</h2>
          <div className="console-stats">
            <div><span>Korsan</span><strong>{activePlayers.length}</strong></div>
            <div><span>Kadro hedefi</span><strong>{crewLimit}</strong></div>
            <div><span>Bütçe</span><strong>${budget}</strong></div>
          </div>
          <p>{activePlayers.map((player) => player.name).join(" · ") || "Mürettebat bekleniyor"}</p>
          <div className="active-mechanics-summary">
            {Object.entries(mechanics).filter(([, enabled]) => enabled).length
              ? Object.entries(mechanics).filter(([, enabled]) => enabled).map(([key]) => MECHANIC_META.find((item) => item.key === key)?.title).join(" · ")
              : "Klasik draft kuralları"}
          </div>
          <Button onClick={launch} className="launch-action">Masaya çık <span>→</span></Button>
        </aside>
      </main>
    </div>
  );
}
