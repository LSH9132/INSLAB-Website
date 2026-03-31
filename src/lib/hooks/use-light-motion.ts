"use client";

import { useReducedMotion } from "motion/react";
import { useState, useEffect } from "react";

/**
 * Returns true when heavy animations should be disabled:
 * - OS prefers-reduced-motion is set, OR
 * - Device is a small touch screen (mobile phone)
 */
export function useLightMotion(): boolean {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse) and (max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return !!reducedMotion || isMobile;
}
