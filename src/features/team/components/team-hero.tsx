"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import {
  heroTitleVariants,
  heroSubtitleVariants,
  statVariants,
  teamStaggerContainer,
} from "@/lib/motion/team-variants";
import { FloatingShapes } from "./floating-shapes";

type Stat = { value: string; label: string };

type TeamHeroDictionary = {
  eyebrow: string;
  title: string;
  body: string;
};

type TeamHeroProps = {
  hero: TeamHeroDictionary;
  stats: Stat[];
};

export function TeamHero({ hero, stats }: TeamHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden"
    >
      {/* Floating background shapes */}
      <FloatingShapes />

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center sm:py-32"
        style={shouldReduceMotion ? undefined : { y: contentY }}
      >
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          variants={teamStaggerContainer}
          className="flex flex-col items-center gap-8"
        >
          {/* Eyebrow pill */}
          <motion.span
            className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-500"
            variants={heroSubtitleVariants}
          >
            {hero.eyebrow}
          </motion.span>

          {/* Title */}
          <motion.h1
            className="max-w-3xl font-serif text-5xl leading-[1.08] font-light tracking-tight text-slate-900 italic md:text-8xl"
            variants={heroTitleVariants}
          >
            {hero.title}
          </motion.h1>

          {/* Body */}
          <motion.p
            className="mx-auto max-w-xl text-lg leading-relaxed font-light text-slate-500 md:text-xl"
            variants={heroSubtitleVariants}
          >
            {hero.body}
          </motion.p>

          {/* Stats */}
          {stats.length > 0 && (
            <motion.div
              className="mt-4 flex flex-wrap justify-center gap-10 sm:gap-16"
              variants={teamStaggerContainer}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center"
                  variants={statVariants}
                >
                  <span className="font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs font-semibold tracking-widest text-slate-400 uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="h-10 w-px bg-gradient-to-b from-transparent to-slate-300" />
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-slate-400"
            animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
