/**
 * Onda SVG que separa seções com um corte orgânico.
 * Usar no topo da seção seguinte — a onda "invade" a seção anterior.
 * A seção pai precisa ter className="relative".
 */
export function WaveDivider({ fill }: { fill: 'gt-bg' | 'gt-card' }) {
  const color =
    fill === 'gt-bg' ? 'rgb(var(--gt-bg))' : 'rgb(var(--gt-card))';

  return (
    <div
      className="absolute -top-[119px] left-0 w-full h-[120px] pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0,120 C480,0 960,0 1440,120 L1440,120 L0,120Z"
          style={{ fill: color }}
        />
      </svg>
    </div>
  );
}
