"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/content";
import { FolderGit2, CheckCircle2, Clock } from "lucide-react";
import {
  sectionTitleVariants,
  cardVariants,
  teamStaggerContainer,
} from "@/lib/motion/team-variants";

export function DirectorProjects({ projects }: { projects: Project[] }) {
  const t = useTranslations("Director");
  const shouldReduceMotion = useReducedMotion();

  const ongoingProjects = projects.filter((p) => p.status === "Ongoing");
  const pastProjects = projects.filter((p) => p.status === "Past");

  return (
    <section id="projects" className="relative w-full overflow-hidden bg-slate-50/40 py-16">
      {/* Dot pattern background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.h2
          className="mb-12 flex items-center justify-center gap-3 text-center text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl md:text-5xl"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true }}
          variants={sectionTitleVariants}
        >
          <FolderGit2 className="h-8 w-8 text-teal-600" />
          {t("projects")}
        </motion.h2>

        <div className="space-y-12">
          {ongoingProjects.length > 0 && (
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-teal-600">
                <Clock className="h-5 w-5" /> {t("ongoingProjects")}
              </h3>
              <motion.div
                className="grid gap-4 sm:grid-cols-2"
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true }}
                variants={teamStaggerContainer}
              >
                {ongoingProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="space-y-2">
                      <span className="inline-block rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                        {project.period}
                      </span>
                      <h4 className="text-base font-semibold leading-tight text-slate-900">
                        {project.title}
                      </h4>
                      <p className="text-sm font-medium text-slate-500">
                        {t("agencyLabel")} {project.agency}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {pastProjects.length > 0 && (
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-500">
                <CheckCircle2 className="h-5 w-5" /> {t("pastProjects")}
              </h3>
              <motion.div
                className="grid gap-4 sm:grid-cols-2"
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true }}
                variants={teamStaggerContainer}
              >
                {pastProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="space-y-2">
                      <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                        {project.period}
                      </span>
                      <h4 className="text-base font-medium leading-tight text-slate-900">
                        {project.title}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {t("agencyLabel")} {project.agency}
                      </p>
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
