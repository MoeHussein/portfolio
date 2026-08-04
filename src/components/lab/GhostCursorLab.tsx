import GhostCursor from '../react-bits/GhostCursor';

import './GhostCursorLab.css';

type GhostCursorLabProps = {
  homeHref: string;
};

export default function GhostCursorLab({ homeHref }: GhostCursorLabProps) {
  return (
    <section className="ghost-lab" aria-labelledby="ghost-lab-title">
      <GhostCursor
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={0.1}
        bloomRadius={1}
        brightness={2}
        color="#06B6D4"
        secondaryColor="#ff9d45"
        colorCycleSeconds={8}
        colorHoldSeconds={3}
        interactive={false}
        positionX={0.68}
        positionY={0.5}
        edgeIntensity={0}
        zIndex={3}
      />

      <a className="ghost-lab__back" href={homeHref}>
        Back to portfolio
      </a>

      <div className="ghost-lab__content">
        <p className="ghost-lab__eyebrow">Local interaction lab / Cyan to Orange</p>
        <h1 id="ghost-lab-title">Mohammad Hussein</h1>
        <p className="ghost-lab__role">Biomedical Engineer in Computational Imaging</p>
        <p className="ghost-lab__instruction">
          A fixed ambient form sits right of center, resting briefly at cyan and orange before each
          transition.
        </p>

        <div className="ghost-lab__actions">
          <a href="mailto:mohammad.mtr.hussein@gmail.com">Contact</a>
        </div>
      </div>

      <p className="ghost-lab__hint" aria-hidden="true">
        Static ambient effect
      </p>
    </section>
  );
}
