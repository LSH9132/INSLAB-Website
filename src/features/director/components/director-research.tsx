"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Lightbulb } from "lucide-react";
import { sectionTitleVariants } from "@/lib/motion/team-variants";

export function DirectorResearch() {
  const t = useTranslations("Director");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-slate-50/60 py-16">
      {/* Dot pattern background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.h2
          className="mb-4 flex items-center justify-center gap-3 text-center text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl md:text-5xl"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true }}
          variants={sectionTitleVariants}
        >
          <Lightbulb className="h-8 w-8 text-teal-600" />
          {t("researchArea")}
        </motion.h2>

        <p className="mx-auto mb-8 max-w-2xl text-center text-xl font-medium text-slate-500">
          Computer systems, Network, Data, and Service using Intelligence
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md"
        >
          <div className="relative aspect-[16/9] md:aspect-[16/10]">
            <Image
              src="/images/director/researchv2.jpg"
              alt="Research Areas Diagram"
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
