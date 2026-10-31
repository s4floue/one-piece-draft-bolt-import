export function OceanScene() {
  return (
    <div className="ocean-scene" aria-hidden="true">
      <video className="ocean-video" autoPlay muted loop playsInline preload="auto">
        <source src="/videos/grand-line-menu.mp4" type="video/mp4" />
      </video>
      <div className="ocean-video-shade" />
    </div>
  );
}
