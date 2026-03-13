"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { heroImageUrl } from "@/features/home/data/home-content";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion/fade-up";

export function HomeHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden pt-16 pb-24 lg:pt-28 lg:pb-32">
      <div className="absolute inset-0 -z-10 bg-grid opacity-70" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-y-16 lg:grid-cols-2 lg:gap-x-16">
          <motion.div
            className="relative z-10 max-w-2xl"
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={staggerContainerVariants}
          >
            <motion.div
              variants={fadeUpVariants}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/60 px-3 py-1 text-xs font-semibold text-accent"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400/70" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Latest: Best Paper Award at ICC 2024
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="mb-6 text-5xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-6xl"
            >
              Engineering the <br />
              <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                Intelligent Network
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mb-10 max-w-lg text-lg leading-8 font-light text-slate-500"
            >
              We bridge theoretical machine learning with practical distributed
              systems to power the next generation of secure, autonomous
              connectivity.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/publications"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-accent"
              >
                Explore Research
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <a
                href="#mission"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50"
              >
                Our Team
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex w-full items-center justify-center lg:h-[600px]"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-[2rem] border border-slate-100 bg-gradient-to-br from-white to-slate-50 shadow-2xl lg:h-[500px]">
              <div
                className="absolute inset-0 opacity-80 mix-blend-multiply"
                style={{
                  backgroundImage: `url(${heroImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "grayscale(100%) contrast(1.2) brightness(1.2)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent" />
              <motion.div
                className="absolute top-1/4 left-1/4 size-24 rounded-full border border-white/50 bg-gradient-to-br from-blue-100 to-white opacity-90 shadow-lg blur-sm"
                animate={
                  shouldReduceMotion ? undefined : { y: [0, -16, 0] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute right-1/4 bottom-1/3 size-32 rounded-full border border-white/50 bg-gradient-to-tl from-slate-100 to-white shadow-xl"
                animate={
                  shouldReduceMotion ? undefined : { y: [0, -20, 0] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <div className="absolute right-10 bottom-10 left-10 rounded-xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="size-2 rounded-full bg-green-500" />
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-2/3 rounded-full bg-accent" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    NODE_SYNC_active
                  </span>
                </div>
                <div className="mt-3 flex justify-between text-xs font-mono text-slate-500">
                  <span>Latency: 12ms</span>
                  <span>Throughput: 98%</span>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 opacity-40 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
