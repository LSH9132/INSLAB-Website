"use client";

import { motion } from "motion/react";
import { useLightMotion } from "@/lib/hooks/use-light-motion";

const shapes = [
  {
    size: 200,
    rounded: "rounded-full",
    color: "bg-teal-200/25",
    blur: "blur-3xl",
    position: { top: "10%", left: "5%" },
    animate: { x: [0, 60, -30, 0], y: [0, -40, 50, 0] },
    duration: 24,
  },
  {
    size: 120,
    rounded: "rounded-3xl",
    color: "bg-violet-200/20",
    blur: "blur-2xl",
    position: { top: "60%", right: "8%" },
    animate: { x: [0, -50, 30, 0], y: [0, 30, -60, 0] },
    duration: 28,
  },
  {
    size: 160,
    rounded: "rounded-full",
    color: "bg-blue-200/20",
    blur: "blur-3xl",
    position: { top: "30%", right: "20%" },
    animate: { x: [0, 40, -20, 0], y: [0, 50, -30, 0] },
    duration: 22,
  },
  {
    size: 100,
    rounded: "rounded-3xl",
    color: "bg-teal-300/15",
    blur: "blur-2xl",
    position: { bottom: "15%", left: "15%" },
    animate: { x: [0, -30, 50, 0], y: [0, -50, 20, 0] },
    duration: 26,
  },
  {
    size: 80,
    rounded: "rounded-full",
    color: "bg-blue-100/25",
    blur: "blur-2xl",
    position: { top: "50%", left: "45%" },
    animate: { x: [0, 35, -45, 0], y: [0, -35, 40, 0] },
    duration: 30,
  },
];

export function FloatingShapes() {
  const shouldReduceMotion = useLightMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.rounded} ${shape.color} ${shape.blur}`}
          style={{
            width: shape.size,
            height: shape.size,
            ...shape.position,
          }}
          animate={shouldReduceMotion ? undefined : shape.animate}
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: shape.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
