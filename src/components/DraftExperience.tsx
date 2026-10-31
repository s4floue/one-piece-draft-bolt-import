import { useEffect, useRef } from "react";
import { ArrowLeft, Radio } from "lucide-react";
import { mountDraft } from "@/lib/draft-runtime";
import { enhanceDraftDialogs } from "@/lib/draft-dialogs";
import { LaunchConfig } from "@/components/GameLobby";
import markup from "@/data/draft-markup.html?raw";
import "@/styles/draft-base.css";
import "@/styles/draft.css";

export function DraftExperience({ launchConfig, onExit }: { launchConfig: LaunchConfig | null; onExit: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<ReturnType<typeof mountDraft> | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const runtime = mountDraft(root);
    runtimeRef.current = runtime;
    const disposeDialogs = enhanceDraftDialogs(root);
    return () => {
      runtimeRef.current = null;
      disposeDialogs();
      runtime.dispose();
    };
  }, []);

  useEffect(() => {
    if (!launchConfig) return;
    runtimeRef.current?.applyLaunchConfig(launchConfig);
  }, [launchConfig]);

  return (
    <div ref={rootRef} className="draft-app grand-line-draft min-h-screen bg-[#061423] text-[#fff8e8]">
      <header className="draft-command-bar">
        <button type="button" onClick={onExit} className="command-back"><ArrowLeft /> Ana üs</button>
        <div className="command-title"><span>CANLI YAYIN</span><strong>GRAND LINE · DRAFT KONTROL MERKEZİ</strong></div>
        <button type="button" id="broadcastMode" className="command-broadcast" aria-pressed="false"><Radio /> Yayın modu</button>
      </header>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      <footer className="draft-footer mx-auto flex max-w-[1344px] flex-wrap items-center justify-between gap-3 border-t border-[#25394b] px-5 py-7 text-xs text-[#9aafc3] sm:px-8">
        <span>Bir masa. Bir tayfa. Yeni bir macera.</span>
        <span>Discord yayın görünümü · Grand Line</span>
      </footer>
    </div>
  );
}
