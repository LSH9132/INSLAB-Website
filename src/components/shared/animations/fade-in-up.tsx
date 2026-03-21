"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/motion/fade-up";

export function FadeInUp({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}
