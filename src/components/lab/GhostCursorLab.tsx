import { useState } from 'react';

import GhostCursor from '../react-bits/GhostCursor';

import './GhostCursorLab.css';

type GhostCursorLabProps = {
  homeHref: string;
};

export default function GhostCursorLab({ homeHref }: GhostCursorLabProps) {
  const [clickCount, setClickCount] = useState(0);

  return (
    <section className="ghost-lab" aria-labelledby="ghost-lab-title">
      <GhostCursor
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={0.1}
        bloomRadius={1}
        brightness={2}
        color="#EAB308"
        edgeIntensity={0}
        zIndex={3}
      />

      <a className="ghost-lab__back" href={homeHref}>
        Back to portfolio
      </a>

      <div className="ghost-lab__content">
        <p className="ghost-lab__eyebrow">Local interaction lab · Ghost Cursor</p>
        <h1 id="ghost-lab-title">Mohammad Hussein</h1>
        <p className="ghost-lab__role">Biomedical Engineer in Computational Imaging</p>
        <p className="ghost-lab__instruction">
          Move your cursor across the stage. The yellow trail follows it while the controls remain
          clickable.
        </p>

        <div className="ghost-lab__actions">
          <button type="button" onClick={() => setClickCount((count) => count + 1)}>
            Test interaction{clickCount > 0 ? ` · ${clickCount}` : ''}
          </button>
          <a href="mailto:mohammad.mtr.hussein@gmail.com">Contact</a>
        </div>
      </div>

      <p className="ghost-lab__hint" aria-hidden="true">
        Move cursor
      </p>
    </section>
  );
}
