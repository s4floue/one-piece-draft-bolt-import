export function enhanceDraftDialogs(root: HTMLElement): () => void {
  const dialogs = [...root.querySelectorAll<HTMLElement>(".finish-modal")];
  const background = [root.querySelector<HTMLElement>("header"), root.querySelector<HTMLElement>("main"), root.querySelector<HTMLElement>("footer")];
  const controller = new AbortController();
  let active: HTMLElement | undefined;
  let returnFocus: HTMLElement | null = null;
  const previousOverflow = document.body.style.overflow;

  for (const dialog of dialogs) {
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.tabIndex = -1;
    const heading = dialog.querySelector("h2");
    if (heading) {
      heading.id = `${dialog.id}-heading`;
      dialog.setAttribute("aria-labelledby", heading.id);
    }
  }

  const focusable = (dialog: HTMLElement) => [...dialog.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]')].filter(element => element.getClientRects().length > 0);
  const sync = () => {
    const next = [...dialogs].reverse().find(dialog => !dialog.hidden);
    if (next === active) return;
    if (!active && next) returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    active = next;
    background.forEach(element => { if (element) element.inert = !!active; });
    document.body.style.overflow = active ? "hidden" : previousOverflow;
    if (active) (focusable(active)[0] ?? active).focus();
    else if (returnFocus?.isConnected) {
      returnFocus.focus();
      returnFocus = null;
    }
  };

  const observer = new MutationObserver(sync);
  dialogs.forEach(dialog => observer.observe(dialog, { attributes: true, attributeFilter: ["hidden"] }));
  root.addEventListener("keydown", event => {
    if (event.key !== "Tab" || !active) return;
    const elements = focusable(active);
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (!first || !last) { event.preventDefault(); active.focus(); return; }
    if (event.shiftKey && (document.activeElement === first || document.activeElement === active)) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }, { signal: controller.signal });
  sync();

  return () => {
    observer.disconnect();
    controller.abort();
    background.forEach(element => { if (element) element.inert = false; });
    document.body.style.overflow = previousOverflow;
  };
}
