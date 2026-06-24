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
      className="absolute -top-[79px] left-0 w-full h-20 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0,80 C360,20 1080,20 1440,80 L1440,80 L0,80Z"
          style={{ fill: color }}
        />
      </svg>
    </div>
  );
}
