import { Anchor, History, Radio, ShipWheel, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DraftHeader() {
  return (
    <header className="draft-header">
      <div className="header-inner mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#draft-title" className="draft-brand flex shrink-0 items-center gap-3 no-underline" aria-label="Kıraç ve Abileri One Piece Draft">
          <span className="brand-emblem grid size-11 place-items-center rounded-xl"><ShipWheel className="size-7" strokeWidth={1.6} /></span>
          <span className="flex flex-col gap-1">
            <span className="brand-title">KIRAÇ VE ABİLERİ</span>
            <span className="brand-caption flex items-center gap-1.5"><Anchor className="size-3" /> ONE PIECE DRAFT</span>
          </span>
        </a>
        <nav className="top-actions flex flex-wrap items-center gap-1" aria-label="Draft menüsü">
          <Button id="openScoreboard" variant="ghost" className="draft-nav-button"><Trophy className="size-4" /><span>Puan Durumu</span></Button>
          <Button id="openPastResults" variant="ghost" className="draft-nav-button"><History className="size-4" /><span>Geçmiş Sonuçlar</span></Button>
          <Button id="openPlayerProfiles" variant="ghost" className="draft-nav-button"><Users className="size-4" /><span>Oyuncu Profilleri</span></Button>
          <Button id="broadcastMode" variant="outline" aria-pressed="false" className="draft-nav-button broadcast-button"><Radio className="size-4" /><span>Yayın Modu</span></Button>
        </nav>
        <Badge variant="outline" className="season-badge hidden items-center gap-2 rounded-lg px-3 py-2 xl:flex"><span className="season-dot" /> YENİ SEZON</Badge>
      </div>
    </header>
  );
}
