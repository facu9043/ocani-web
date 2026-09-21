import type { SVGProps } from "react";

export function NutsIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      {/* nuez (dos lóbulos + veta central) */}
      <g transform="translate(30 30) rotate(-10)">
        <path
          d="M-16 -18c8.5 -7 23 -7 31 0c8.5 7 8.5 29 -3.5 36c-5 3 -7.5 3 -12 0c-12 -7 -24 -29 -15.5 -36Z"
          fill="var(--color-forest)"
        />
        <path
          d="M0 -17v34"
          stroke="var(--color-cream)"
          strokeWidth={2.2}
          strokeLinecap="round"
          opacity={0.6}
        />
      </g>
      {/* almendra */}
      <ellipse
        cx={72}
        cy={32}
        rx={13}
        ry={20}
        transform="rotate(22 72 32)"
        fill="var(--color-gold)"
      />
      {/* avellana */}
      <circle cx={72} cy={70} r={16} fill="var(--color-rust)" />
      {/* castaña de cajú */}
      <path
        d="M14 62c5 -13 21 -18 28 -8c6 8 1 20 -10 23c-10 3 -23 -5 -18 -15Z"
        fill="var(--color-forest-light)"
      />
    </svg>
  );
}

export function SeedsIllustration(props: SVGProps<SVGSVGElement>) {
  const seeds: Array<[number, number, number, string]> = [
    [38, 58, 3.2, "var(--color-forest-dark)"],
    [46, 53, 3.6, "var(--color-gold)"],
    [55, 57, 3, "var(--color-rust)"],
    [63, 52, 3.4, "var(--color-forest)"],
    [42, 65, 3, "var(--color-rust)"],
    [50, 62, 3.6, "var(--color-forest-dark)"],
    [58, 65, 3, "var(--color-gold)"],
    [30, 40, 2.6, "var(--color-gold)"],
    [70, 36, 2.6, "var(--color-forest)"],
  ];
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      {/* bowl */}
      <path
        d="M22 50c0 15 12.5 27 28 27s28 -12 28 -27Z"
        fill="none"
        stroke="var(--color-forest-dark)"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {seeds.map(([cx, cy, r, fill], index) => (
        <ellipse
          key={index}
          cx={cx}
          cy={cy}
          rx={r}
          ry={r * 0.75}
          fill={fill}
          transform={`rotate(${(index * 37) % 180} ${cx} ${cy})`}
        />
      ))}
    </svg>
  );
}

export function FlourIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      {/* montículo de harina */}
      <path
        d="M14 54c3 -11 16 -17 24 -9c4 -8 15 -9 19 -2c8 -5 19 1 17 10Z"
        fill="var(--color-sage)"
        stroke="var(--color-forest-dark)"
        strokeWidth={1.75}
        strokeLinejoin="round"
      />
      {/* vasija de barro */}
      <path
        d="M30 51h30l5 9c3 7 1 17 -8 22c-7 4.5 -17 4.5 -24 0c-9 -5 -11 -15 -8 -22Z"
        fill="var(--color-rust)"
      />
      <path d="M30 51h30" stroke="var(--color-forest-dark)" strokeWidth={2.5} strokeLinecap="round" />
      {/* motas de harina */}
      <circle cx={68} cy={36} r={2.4} fill="var(--color-sage)" />
      <circle cx={78} cy={46} r={1.8} fill="var(--color-sage)" />
      <circle cx={10} cy={46} r={1.8} fill="var(--color-sage)" />
    </svg>
  );
}

export function SpicesIllustration(props: SVGProps<SVGSVGElement>) {
  const jars: Array<[number, number, number, string]> = [
    [26, 44, 34, "var(--color-rust)"],
    [44, 34, 44, "var(--color-gold)"],
    [62, 40, 38, "var(--color-forest)"],
    [80, 46, 32, "var(--color-forest-dark)"],
  ];
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      {jars.map(([cx, top, height, fill], index) => (
        <g key={index}>
          <rect x={cx - 7} y={top} width={14} height={height} rx={3} fill={fill} />
          <rect x={cx - 8} y={top - 5} width={16} height={6} rx={2} fill="var(--color-forest-dark)" />
        </g>
      ))}
    </svg>
  );
}
