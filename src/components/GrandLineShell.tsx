import "@/styles/landing.css";
import { useEffect, useMemo, useState } from "react";
import { Anchor, Crown, History, Radio, ScrollText, Shield, Sparkles, Swords, Trophy, Users } from "lucide-react";
import { OceanScene } from "@/components/OceanScene";
import { DraftExperience } from "@/components/DraftExperience";
import { GameLobby, LaunchConfig } from "@/components/GameLobby";
import { Button } from "@/components/ui/button";
import {
  ArchivedRound,
  ensurePlayerRegistry,
  PlayerIdentity,
  readArchivedRounds,
  readLegacyScoreboard,
} from "@/lib/grand-line";

type Scene = "landing" | "archive" | "statistics" | "hall" | "lobby" | "draft";

type Profile = {
  id: string;
  name: string;
  games: number;
  wins: number;
  seconds: number;
  thirds: number;
  points: number;
  winRate: number;
  averageSpend: number;
  highestPrice: number;
  favorite: string;
};

function useArchiveData(registry: PlayerIdentity[]) {
  return useMemo(() => {
    const rounds = readArchivedRounds();
    const scoreboard = readLegacyScoreboard();
    const identitiesById = new Map(registry.map((player) => [player.id, player]));
    const currentNameMatches = new Map<string, PlayerIdentity[]>();
    const legacyNameMatches = new Map<string, PlayerIdentity[]>();
    registry.forEach((player) => {
      currentNameMatches.set(player.name, [...(currentNameMatches.get(player.name) ?? []), player]);
    });
    registry.forEach((player) => {
      if (player.legacyName && !currentNameMatches.has(player.legacyName)) {
        legacyNameMatches.set(player.legacyName, [...(legacyNameMatches.get(player.legacyName) ?? []), player]);
      }
    });
    const resolveIdentity = (playerId?: string, name?: string) => {
      if (playerId) {
        const byId = identitiesById.get(playerId);
        if (byId) return byId;
      }
      if (!name) return undefined;
      const current = currentNameMatches.get(name) ?? [];
      if (current.length === 1) return current[0];
      if (current.length > 1) return undefined;
      const legacy = legacyNameMatches.get(name) ?? [];
      return legacy.length === 1 ? legacy[0] : undefined;
    };
    const profiles = new Map<string, Profile>();
    registry.forEach((player) => profiles.set(player.id, {
      id: player.id,
      name: player.name,
      games: 0,
      wins: 0,
      seconds: 0,
      thirds: 0,
      points: Number(scoreboard[player.name]?.points || 0),
      winRate: 0,
      averageSpend: 0,
      highestPrice: 0,
      favorite: "—",
    }));
    rounds.forEach((round) => {
      const ranking = round.ranking || [];
      const teams = round.teams || [];
      teams.forEach((team) => {
        const identity = resolveIdentity(team.playerId, String(team.name || ""));
        if (!identity) return;
        const profile = profiles.get(identity.id);
        if (!profile) return;
        profile.games += 1;
        const rankingWithPlayerId = ranking.filter((entry) => entry.playerId === identity.id);
        const rankingByName = ranking.filter((entry) => !entry.playerId && entry.name === team.name);
        const rank = rankingWithPlayerId.length === 1
          ? rankingWithPlayerId[0].rank
          : rankingWithPlayerId.length > 1
            ? undefined
            : rankingByName.length === 1
              ? rankingByName[0].rank
              : undefined;
        if (rank === 1) profile.wins += 1;
        if (rank === 2) profile.seconds += 1;
        if (rank === 3) profile.thirds += 1;
        profile.averageSpend += Number(team.spent || 0);
        const teamMax = Math.max(0, ...(team.characters || []).map((character) => Number(character.price || 0)));
        profile.highestPrice = Math.max(profile.highestPrice, teamMax);
      });
    });
    const list = [...profiles.values()].map((profile) => ({
      ...profile,
      winRate: profile.games ? Math.round((profile.wins / profile.games) * 100) : 0,
      averageSpend: profile.games ? profile.averageSpend / profile.games : 0,
    })).sort((a, b) => b.wins - a.wins || b.points - a.points || b.games - a.games);
    const totalGames = rounds.length;
    const totalChampions = list.reduce((sum, profile) => sum + profile.wins, 0);
    const highestPrice = Math.max(0, ...rounds.flatMap((round) => (round.teams || []).flatMap((team) => (team.characters || []).map((character) => Number(character.price || 0)))));
    const recent = [...rounds].sort((a, b) => Number(b.playedAt || 0) - Number(a.playedAt || 0)).slice(0, 4);
    const champions = rounds.filter((round) => (round.ranking || []).some((entry) => Number(entry.rank) === 1));
    return { rounds: [...rounds].sort((a, b) => Number(b.playedAt || 0) - Number(a.playedAt || 0)), profiles: list, totalGames, totalChampions, highestPrice, recent, champions };
  }, [registry]);
}

function SceneNav({ scene, setScene }: { scene: Scene; setScene: (scene: Scene) => void }) {
  return (
    <header className="grand-line-nav">
      <button type="button" className="grand-line-brand" onClick={() => setScene("landing")}>
        <span><Anchor /></span>
        <div><strong>KIRAÇ VE ABİLERİ</strong><small>GRAND LINE DRAFT</small></div>
      </button>
      <nav>
        <button onClick={() => setScene("archive")}>Sefer Arşivi</button>
        <button onClick={() => setScene("statistics")}>İstatistikler</button>
        <button onClick={() => setScene("hall")}>Şampiyonluk</button>
      </nav>
    </header>
  );
}

function Landing({ setScene, hasActiveDraft }: { setScene: (scene: Scene) => void; hasActiveDraft: boolean }) {
  return (
    <section className="landing-scene">
      <OceanScene />
      <div className="landing-vignette" />
      <div className="landing-content">
        <div className="landing-title">
          <h1>KIRAÇ VE ABİLERİ</h1>
          <p>ONE PIECE DRAFT</p>
        </div>
        <div />
        <div className="landing-actions">
          <Button onClick={() => setScene("lobby")} className="landing-main-cta">⚙ DRAFT'A BAŞLA <span>→</span></Button>
          <nav className="landing-nav" aria-label="Ana menü">
            <button type="button" onClick={() => setScene("archive")}><ScrollText /> Sefer Arşivi</button>
            <button type="button" onClick={() => setScene("statistics")}><Users /> Oyuncu İstatistikleri</button>
            <button type="button" onClick={() => setScene("hall")}><Trophy /> Şampiyonluklar</button>
          </nav>
          {hasActiveDraft && <button className="resume-voyage" onClick={() => setScene("draft")}><Radio /> Yarım kalan seferi devam et</button>}
        </div>
      </div>
      <div className="landing-footer">KIRAÇ VE ABİLERİ · ONE PIECE DRAFT · 2026</div>
    </section>
  );
}

function EmptyArchive() {
  return (
    <div className="empty-archive">
      <span><ScrollText /></span>
      <h2>Henüz sefer kaydı yok</h2>
      <p>İlk draft tamamlandığında tayfalar, sıralamalar ve şampiyonlar burada belirecek. Henüz veri olmadığı için hiçbir istatistik uydurulmadı.</p>
    </div>
  );
}

function ArchiveScene({ data }: { data: ReturnType<typeof useArchiveData> }) {
  if (!data.rounds.length) return <EmptyArchive />;
  return (
    <div className="archive-grid">
      {data.rounds.map((round, index) => {
        const winner = (round.ranking || []).find((entry) => Number(entry.rank) === 1);
        const winnerTeamMatches = winner?.playerId
          ? (round.teams || []).filter((team) => team.playerId === winner.playerId)
          : (round.teams || []).filter((team) => !team.playerId && team.name === winner?.name);
        const winnerTeam = winnerTeamMatches.length === 1 ? winnerTeamMatches[0] : undefined;
        return (
          <article className="voyage-card" key={round.id || index}>
            <div className="voyage-card-head"><span>SEFER {String(data.rounds.length - index).padStart(2, "0")}</span><time>{new Date(Number(round.playedAt || 0)).toLocaleDateString("tr-TR")}</time></div>
            <Crown className="voyage-crown" />
            <h3>{winner ? `${winner.name} şampiyon` : "Sıralama kaydedilmedi"}</h3>
            <p>{(round.teams || []).map((team) => team.name).filter(Boolean).join(" · ")}</p>
            {winnerTeam && <div className="voyage-winner-crew">{(winnerTeam.characters || []).slice(0, 4).map((character) => <span key={character.name}>{character.name}</span>)}</div>}
            <div className="voyage-meta"><span>{round.teams?.length || 0} korsan</span><span>${round.settings?.budget || 0} bütçe</span><span>{round.settings?.crewLimit || 0} kadro</span></div>
          </article>
        );
      })}
    </div>
  );
}

function StatisticsScene({ data }: { data: ReturnType<typeof useArchiveData> }) {
  const played = data.profiles.filter((profile) => profile.games > 0);
  if (!played.length) return <EmptyArchive />;
  return (
    <div className="statistics-board">
      <div className="stat-hero-cards">
        <div><span>Toplam sefer</span><strong>{data.totalGames}</strong><small>Bu cihazda tamamlanan</small></div>
        <div><span>Şampiyonluk</span><strong>{data.totalChampions}</strong><small>Kayıtlı zaferler</small></div>
        <div><span>En yüksek transfer</span><strong>${data.highestPrice}</strong><small>Arşivdeki en yüksek fiyat</small></div>
      </div>
      <div className="profile-ledger">
        {data.profiles.map((profile, index) => (
          <article key={profile.id} className="profile-ledger-row">
            <span className="ledger-rank">{String(index + 1).padStart(2, "0")}</span>
            <div className="ledger-avatar">{profile.name.slice(0, 2).toLocaleUpperCase("tr-TR")}</div>
            <div className="ledger-name"><strong>{profile.name}</strong><span>{profile.games} sefer · {profile.wins} şampiyonluk</span></div>
            <div className="ledger-stat"><span>Zafer oranı</span><strong>%{profile.winRate}</strong></div>
            <div className="ledger-stat"><span>2. / 3.</span><strong>{profile.seconds} / {profile.thirds}</strong></div>
            <div className="ledger-stat"><span>Ort. harcama</span><strong>${profile.averageSpend.toFixed(1).replace(".", ",")}</strong></div>
            <div className="ledger-stat"><span>En yüksek</span><strong>${profile.highestPrice}</strong></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function HallScene({ data }: { data: ReturnType<typeof useArchiveData> }) {
  if (!data.champions.length) return <EmptyArchive />;
  const latest = data.champions[0];
  const winner = (latest.ranking || []).find((entry) => Number(entry.rank) === 1);
  const championTeamMatches = winner?.playerId
    ? (latest.teams || []).filter((team) => team.playerId === winner.playerId)
    : (latest.teams || []).filter((team) => !team.playerId && team.name === winner?.name);
  const championTeam = championTeamMatches.length === 1 ? championTeamMatches[0] : undefined;
  return (
    <div className="hall-scene">
      <div className="hall-crown"><Crown /></div>
      <span className="scene-kicker"><Sparkles /> Şampiyonluk kürsüsü</span>
      <h2>{winner?.name || "Şampiyon kaydı bulunamadı"}</h2>
      <p>Son şampiyonluk · {new Date(Number(latest.playedAt || 0)).toLocaleDateString("tr-TR", { dateStyle: "long" })}</p>
      <div className="hall-champion-team">
        {championTeam?.characters?.map((character) => (
          <div key={character.name}><span>{character.name}</span><small>${character.price || 0}</small></div>
        ))}
      </div>
      <div className="hall-timeline">
        {data.champions.slice(0, 8).map((round, index) => {
          const champion = (round.ranking || []).find((entry) => Number(entry.rank) === 1);
          return <div key={round.id || index}><Trophy /><span>{champion?.name || "Bilinmiyor"}</span><time>{new Date(Number(round.playedAt || 0)).toLocaleDateString("tr-TR")}</time></div>;
        })}
      </div>
    </div>
  );
}

export function GrandLineShell() {
  const [scene, setScene] = useState<Scene>("landing");
  const [registry, setRegistry] = useState<PlayerIdentity[]>(() => ensurePlayerRegistry(["Samed", "Efecan", "Ertuğrul", "Hasan", "Kıraç"]));
  const [launchConfig, setLaunchConfig] = useState<LaunchConfig | null>(null);
  const data = useArchiveData(registry);
  const hasActiveDraft = Boolean(localStorage.getItem("onePieceDraftActiveRoundV1"));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [scene]);

  return (
    <div className="grand-line-shell">
      {scene !== "landing" && scene !== "draft" && <SceneNav scene={scene} setScene={setScene} />}
      {scene === "landing" && <Landing setScene={setScene} hasActiveDraft={hasActiveDraft} />}
      {scene === "archive" && (
        <main className="grand-line-page archive-page">
          <header className="scene-heading"><span className="scene-kicker"><History /> Grand Line kayıt defteri</span><h1>Sefer <em>Arşivi</em></h1><p>Bu cihazda tamamlanan draftların gerçek kayıtları ve şampiyonları.</p></header>
          <ArchiveScene data={data} />
        </main>
      )}
      {scene === "statistics" && (
        <main className="grand-line-page archive-page">
          <header className="scene-heading"><span className="scene-kicker"><Shield /> Korsan sicili</span><h1>Oyuncu <em>İstatistikleri</em></h1><p>Yalnızca kayıtlı geçmiş verilerden hesaplanan gerçek performans.</p></header>
          <StatisticsScene data={data} />
        </main>
      )}
      {scene === "hall" && (
        <main className="grand-line-page archive-page">
          <header className="scene-heading"><span className="scene-kicker"><Trophy /> Efsanevi zaferler</span><h1>Şampiyonluk <em>Kürsüsü</em></h1><p>Bu masadan çıkan tacın sahipleri ve zafer anları.</p></header>
          <HallScene data={data} />
        </main>
      )}
      {scene === "lobby" && (
        <GameLobby registry={registry} onRegistryChange={setRegistry} onLaunch={(config) => { setLaunchConfig(config); setScene("draft"); }} />
      )}
      {scene === "draft" && <DraftExperience launchConfig={launchConfig} onExit={() => setScene("landing")} />}
    </div>
  );
}
