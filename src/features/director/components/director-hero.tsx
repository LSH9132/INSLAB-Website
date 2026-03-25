"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, GraduationCap, MapPin, Building, Globe } from "lucide-react";
import {
  directorPhotoVariants,
  directorInfoVariants,
  teamStaggerContainer,
} from "@/lib/motion/team-variants";

export function DirectorHero({ locale }: { locale: string }) {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Director");

  return (
    <section className="relative isolate w-full overflow-hidden py-20 md:py-28">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute top-1/4 left-[10%] h-[420px] w-[420px] rounded-full bg-teal-300/20 blur-[100px]" />
        <div className="absolute top-1/3 right-[15%] h-[360px] w-[360px] rounded-full bg-blue-300/15 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-violet-300/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
          variants={teamStaggerContainer}
        >
          {/* Photo */}
          <motion.div
            className="group relative mx-auto w-full max-w-xs lg:max-w-sm"
            variants={directorPhotoVariants}
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              {/* Glow effect behind photo */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-teal-200/40 to-blue-200/40 blur-2xl transition-all duration-500 group-hover:from-teal-300/50 group-hover:to-blue-300/50" />
              <Image
                src="/images/director/kimdy.png"
                alt="Director Dae-Young Kim"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 320px, 384px"
                priority
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div className="flex flex-col" variants={directorInfoVariants}>
            <span className="mb-3 inline-block w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              {t("hero.badge")}
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-6xl">
              {locale === "ko" ? "김대영" : "Dae-Young Kim"}{" "}
              <span className="whitespace-nowrap text-3xl text-slate-400 lg:text-5xl">
                {locale === "ko" ? "(Dae-Young Kim)" : "(김대영)"}
              </span>
            </h1>

            <p className="mt-2 text-xl font-medium text-slate-500">
              {t("hero.degree")}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 md:text-base">
              <div className="flex items-center space-x-3 text-slate-500">
                <Building className="h-5 w-5 shrink-0 text-teal-600" />
                <a
                  href="https://homepage.sch.ac.kr/computer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-teal-600"
                >
                  {t("hero.department")}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-slate-500">
                <GraduationCap className="h-5 w-5 shrink-0 text-teal-600" />
                <a
                  href="https://www.sch.ac.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-teal-600"
                >
                  {t("hero.university")}
                </a>
              </div>
              <div className="flex items-start space-x-3 text-slate-500 sm:col-span-2">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <span>
                  {t("hero.address")}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-slate-500">
                <Mail className="h-5 w-5 shrink-0 text-teal-600" />
                <a
                  href="mailto:dyoung.kim@sch.ac.kr"
                  className="font-medium transition-colors hover:text-teal-600"
                >
                  dyoung.kim_at_sch.ac.kr
                </a>
              </div>
              <div className="flex items-center space-x-3 text-slate-500">
                <Globe className="h-5 w-5 shrink-0 text-teal-600" />
                <a
                  href="https://inslab.sch.ac.kr/~kimdy/lec/lec2026-1.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium transition-colors hover:text-teal-600"
                >
                  {t("hero.lectureLabel")}
                </a>
              </div>
            </div>

            <div className="mt-8 w-fit border-t border-slate-200 pt-4 text-sm italic text-slate-400">
              {t("hero.whosWho")}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
