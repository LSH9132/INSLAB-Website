import type { ReactElement } from "react";

/** Shape types used across team/join hero components */
export type Shape = "circle" | "fourStar" | "diamond" | "triangle" | "cross" | "ring";

export type FloatingShape = {
  x: number;
  cy: number;
  size: number;
  dur: number;
  delay: number;
  shape: Shape;
  color: string;
  spin?: number;
};

/** Smooth easing constant used across team components */
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

/** Render the SVG element for a given floating shape */
export function renderShape(s: FloatingShape): ReactElement {
  const sz = s.size;
  switch (s.shape) {
    case "circle":
      return <circle r={sz * 0.5} fill={s.color} />;
    case "fourStar": {
      const a = sz * 0.5;
      const b = sz * 0.15;
      return (
        <path
          d={`M0,${-a} L${b},${-b} L${a},0 L${b},${b} L0,${a} L${-b},${b} L${-a},0 L${-b},${-b}Z`}
          fill={s.color}
        />
      );
    }
    case "diamond": {
      const h = sz * 0.5;
      const w = sz * 0.3;
      return <path d={`M0,${-h} L${w},0 L0,${h} L${-w},0Z`} fill={s.color} />;
    }
    case "triangle": {
      const h = sz * 0.5;
      const w = sz * 0.4;
      return <path d={`M0,${-h} L${w},${h} L${-w},${h}Z`} fill={s.color} />;
    }
    case "cross": {
      const a = sz * 0.5;
      const t = sz * 0.12;
      return (
        <path
          d={`M${-t},${-a} L${t},${-a} L${t},${-t} L${a},${-t} L${a},${t} L${t},${t} L${t},${a} L${-t},${a} L${-t},${t} L${-a},${t} L${-a},${-t} L${-t},${-t}Z`}
          fill={s.color}
        />
      );
    }
    case "ring":
      return (
        <circle
          r={sz * 0.4}
          fill="none"
          stroke={s.color}
          strokeWidth={sz * 0.1}
        />
      );
  }
}

/** Generate halftone dots pattern */
export function generateHalftoneDots(
  config: {
    rows: number;
    cols: number;
    startCx: number;
    startCy: number;
    spacing: number;
    maxFade: number;
    baseRadius: number;
  },
): { cx: number; cy: number; r: number }[] {
  const dots: { cx: number; cy: number; r: number }[] = [];
  for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.cols; col++) {
      const fade = (row + col) / (config.rows + config.cols);
      if (fade < config.maxFade) {
        dots.push({
          cx: config.startCx + col * config.spacing,
          cy: config.startCy + row * config.spacing,
          r: config.baseRadius * (1 - fade),
        });
      }
    }
  }
  return dots;
}

/** Generate radial speed lines from center */
export function generateSpeedLines(count: number, inner: number, outer: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = i * (360 / count);
    const rad = (angle * Math.PI) / 180;
    return {
      x1: 50 + Math.cos(rad) * inner,
      y1: 50 + Math.sin(rad) * inner,
      x2: 50 + Math.cos(rad) * outer,
      y2: 50 + Math.sin(rad) * outer,
    };
  });
}
