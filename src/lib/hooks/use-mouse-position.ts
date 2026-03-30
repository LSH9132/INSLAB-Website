"use client";

import { useMotionValue, useSpring } from "motion/react";
import { useCallback, useRef } from "react";

type UseMousePositionOptions = {
  stiffness?: number;
  damping?: number;
  mass?: number;
};

export function useMousePosition(options?: UseMousePositionOptions) {
  const { stiffness = 150, damping = 20, mass = 1 } = options ?? {};

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness, damping, mass };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const isActive = useRef(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
      isActive.current = true;
    },
    [rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    isActive.current = false;
  }, []);

  return { smoothX, smoothY, isActive, handleMouseMove, handleMouseLeave };
}
