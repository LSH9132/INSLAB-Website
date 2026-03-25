"use client";

import { motion, useReducedMotion } from "motion/react";

import { PublicationListItem } from "@/features/publications/components/publication-list-item";
import type { Publication } from "@/features/publications/types";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion/fade-up";

export function PublicationList({
  publications,
}: {
  publications: Publication[];
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.12 }}
      variants={staggerContainerVariants}
    >
      <div className="divide-y divide-slate-100">
        {publications.map((publication) => (
          <motion.div key={publication.id} variants={fadeUpVariants}>
            <PublicationListItem publication={publication} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
