"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import type { Education, Career } from "@/lib/content";
import { GraduationCap, Briefcase } from "lucide-react";
import {
  sectionTitleVariants,
  cardVariants,
  teamStaggerContainer,
} from "@/lib/motion/team-variants";

export function DirectorEducation({
  education: educationData,
  career: careerData,
}: {
  education: Education[];
  career: Career[];
}) {
  const t = useTranslations("Director");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl md:text-5xl"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true }}
          variants={sectionTitleVariants}
        >
          {t("education")}
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Career Section */}
          <div className="space-y-8">
            <div className="mb-6 flex items-center space-x-3">
              <div className="rounded-lg bg-teal-50 p-2 text-teal-600">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">Career</h3>
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true }}
              variants={teamStaggerContainer}
              className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent md:before:mx-auto md:before:translate-x-0"
            >
              {careerData.map((career) => (
                <motion.div
                  key={career.id}
                  variants={cardVariants}
                  className="group is-active relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
                >
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-white shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                  </div>
                  <div className="w-[calc(100%-4rem)] rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:shadow-md md:w-[calc(50%-2.5rem)]">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium text-teal-600">
                        {career.period}
                      </span>
                      <h4 className="text-lg font-semibold text-slate-900">
                        {career.role}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {career.organization}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education Section */}
          <div className="space-y-8">
            <div className="mb-6 flex items-center space-x-3">
              <div className="rounded-lg bg-teal-50 p-2 text-teal-600">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">
                Education
              </h3>
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true }}
              variants={teamStaggerContainer}
              className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent md:before:mx-auto md:before:translate-x-0"
            >
              {educationData.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={cardVariants}
                  className="group is-active relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
                >
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-white shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                  </div>
                  <div className="w-[calc(100%-4rem)] rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:shadow-md md:w-[calc(50%-2.5rem)]">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium text-teal-600">
                        {edu.period}
                      </span>
                      <h4 className="text-lg font-semibold text-slate-900">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {edu.institution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
