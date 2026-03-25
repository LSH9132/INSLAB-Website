"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import type { Patent } from "@/lib/content";
import { ShieldCheck, FileCheck, FileClock } from "lucide-react";
import {
  sectionTitleVariants,
  cardVariants,
  teamStaggerContainer,
} from "@/lib/motion/team-variants";

export function DirectorPatents({ patents }: { patents: Patent[] }) {
  const t = useTranslations("Director");
  const shouldReduceMotion = useReducedMotion();

  const registered = patents.filter((p) => p.status === "Registered");
  const filed = patents.filter((p) => p.status === "Filed");

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.h2
          className="mb-12 flex items-center justify-center gap-3 text-center text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl md:text-5xl"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true }}
          variants={sectionTitleVariants}
        >
          <ShieldCheck className="h-8 w-8 text-teal-600" />
          {t("patents")}
        </motion.h2>

        <div className="space-y-12">
          {registered.length > 0 && (
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-teal-600">
                <FileCheck className="h-5 w-5" /> {t("registered")} (
                {registered.length})
              </h3>
              <motion.div
                className="grid gap-4 sm:grid-cols-2"
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true }}
                variants={teamStaggerContainer}
              >
                {registered.map((patent) => (
                  <motion.div
                    key={patent.id}
                    variants={cardVariants}
                    className="rounded-xl border border-slate-100 bg-white/70 p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-block rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                          {patent.date}
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          {patent.number}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold leading-tight text-slate-900">
                        {patent.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {filed.length > 0 && (
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-500">
                <FileClock className="h-5 w-5" /> {t("filed")} ({filed.length})
              </h3>
              <motion.div
                className="grid gap-4 sm:grid-cols-2"
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true }}
                variants={teamStaggerContainer}
              >
                {filed.map((patent) => (
                  <motion.div
                    key={patent.id}
                    variants={cardVariants}
                    className="rounded-xl border border-slate-100 bg-white/70 p-5 opacity-90 shadow-sm transition-opacity hover:opacity-100"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                          {patent.date}
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          {patent.number}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium leading-tight text-slate-900">
                        {patent.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
