"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion/fade-up";

const satelliteNodes = [
  { id: "s1", x: 132, y: 150, delay: 0.1, rotation: -24 },
  { id: "s2", x: 218, y: 104, delay: 0.8, rotation: 16 },
  { id: "s3", x: 316, y: 172, delay: 0.4, rotation: -12 },
  { id: "s4", x: 404, y: 118, delay: 1.2, rotation: 20 },
  { id: "s5", x: 492, y: 188, delay: 0.6, rotation: -18 },
  { id: "s6", x: 256, y: 268, delay: 1.5, rotation: 10 },
  { id: "s7", x: 386, y: 286, delay: 0.9, rotation: -8 },
];

const meshLinks = [
  { id: "m1", from: [132, 150], to: [218, 104] },
  { id: "m2", from: [218, 104], to: [316, 172] },
  { id: "m3", from: [316, 172], to: [404, 118] },
  { id: "m4", from: [404, 118], to: [492, 188] },
  { id: "m5", from: [218, 104], to: [256, 268] },
  { id: "m6", from: [316, 172], to: [256, 268] },
  { id: "m7", from: [316, 172], to: [386, 286] },
  { id: "m8", from: [404, 118], to: [386, 286] },
  { id: "m9", from: [256, 268], to: [386, 286] },
  { id: "m10", from: [386, 286], to: [492, 188] },
];

const meshPackets = meshLinks.map((link, index) => ({
  ...link,
  delay: index * 0.35,
  duration: 3.2 + (index % 3) * 0.4,
}));

const signalLayers = [
  "LEO Mesh Relay",
  "Autonomous Routing",
  "Orbital Edge AI",
];

export function HomeHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.2),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_55%,_#ffffff_100%)] pt-16 pb-24 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0 -z-20 bg-grid opacity-50" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,_rgba(14,165,233,0.14),_transparent_20%),radial-gradient(circle_at_82%_14%,_rgba(56,189,248,0.14),_transparent_26%),radial-gradient(circle_at_78%_72%,_rgba(15,23,42,0.08),_transparent_28%)]" />

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-8 -z-10 h-80"
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.24, 0.42, 0.24], y: [0, 12, 0] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mx-auto h-full max-w-6xl bg-[radial-gradient(circle,_rgba(56,189,248,0.18)_0%,_rgba(56,189,248,0.03)_42%,_transparent_70%)] blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-y-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-x-12">
          <motion.div
            className="relative z-10 max-w-2xl"
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={staggerContainerVariants}
          >
            <motion.div
              variants={fadeUpVariants}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-sky-100 bg-white/80 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-sky-700 uppercase shadow-sm backdrop-blur-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400/70" />
                <span className="relative inline-flex size-2 rounded-full bg-sky-600" />
              </span>
              Intelligence Network System Lab
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="max-w-3xl text-5xl leading-[0.98] font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-[4.7rem]"
            >
              Neural intelligence for
              <span className="block bg-gradient-to-r from-sky-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                orbital mesh networks
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mt-6 max-w-xl text-lg leading-8 text-slate-600"
            >
              INSLAB explores adaptive routing, distributed learning, and
              resilient control across satellite constellations that communicate
              as a self-organizing mesh.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/publications"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-sky-700"
              >
                Explore Research
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <a
                href="#mission"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/90 px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm hover:border-slate-300 hover:bg-slate-50"
              >
                Our Vision
              </a>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="mt-12 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {signalLayers.map((layer) => (
                <div
                  key={layer}
                  className="rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm"
                >
                  {layer}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative lg:min-h-[620px]"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="relative mx-auto aspect-[11/10] w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(7,18,43,0.98),rgba(17,38,82,0.92)_52%,rgba(210,229,255,0.72)_100%)] shadow-[0_28px_80px_rgba(14,30,67,0.18)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(125,211,252,0.26),transparent_22%),radial-gradient(circle_at_50%_110%,rgba(147,197,253,0.36),transparent_28%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_0.8px)] [background-position:0_0] [background-size:26px_26px] opacity-[0.16]" />

              <motion.div
                aria-hidden="true"
                className="absolute left-1/2 top-[9%] h-[78%] w-[78%] -translate-x-1/2 rounded-full border border-sky-200/20"
                animate={
                  shouldReduceMotion ? undefined : { rotate: [0, 360] }
                }
                transition={{
                  duration: 42,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute left-1/2 top-[16%] h-[58%] w-[58%] -translate-x-1/2 rounded-full border border-cyan-200/20"
                animate={
                  shouldReduceMotion ? undefined : { rotate: [360, 0] }
                }
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="absolute inset-x-[-8%] bottom-[-34%] h-[58%] rounded-[50%] border border-sky-200/15 bg-[radial-gradient(circle_at_50%_25%,rgba(191,219,254,0.42),rgba(96,165,250,0.14)_42%,rgba(15,23,42,0)_72%)] shadow-[0_-30px_90px_rgba(125,211,252,0.18)]" />

              <svg
                viewBox="0 0 620 560"
                className="absolute inset-0 h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="mesh-line"
                    x1="100"
                    y1="80"
                    x2="500"
                    y2="320"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#7dd3fc" />
                    <stop offset="1" stopColor="#60a5fa" />
                  </linearGradient>
                  <radialGradient id="sat-glow">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="62%" stopColor="#93c5fd" stopOpacity="0.62" />
                    <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  d="M70 338C164 268 244 254 336 280C434 308 510 294 566 238"
                  stroke="rgba(186,230,253,0.26)"
                  strokeWidth="1.5"
                  strokeDasharray="6 10"
                />
                <path
                  d="M88 142C176 82 280 74 390 104C470 126 522 160 554 206"
                  stroke="rgba(147,197,253,0.24)"
                  strokeWidth="1.5"
                  strokeDasharray="5 9"
                />

                <g opacity="0.42">
                  {meshLinks.map((link) => (
                    <line
                      key={link.id}
                      x1={link.from[0]}
                      y1={link.from[1]}
                      x2={link.to[0]}
                      y2={link.to[1]}
                      stroke="url(#mesh-line)"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  ))}
                </g>

                {!shouldReduceMotion && (
                  <g>
                    {meshPackets.map((packet) => (
                      <g key={`${packet.id}-packet`}>
                        <motion.circle
                          cx={packet.from[0]}
                          cy={packet.from[1]}
                          r="8"
                          fill="rgba(125,211,252,0.18)"
                          animate={{
                            cx: [packet.from[0], packet.to[0]],
                            cy: [packet.from[1], packet.to[1]],
                            opacity: [0, 0.7, 0],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            duration: packet.duration,
                            delay: packet.delay,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <motion.circle
                          cx={packet.from[0]}
                          cy={packet.from[1]}
                          r="3.2"
                          fill="#e0f2fe"
                          animate={{
                            cx: [packet.from[0], packet.to[0]],
                            cy: [packet.from[1], packet.to[1]],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: packet.duration,
                            delay: packet.delay,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </g>
                    ))}
                  </g>
                )}

                {satelliteNodes.map((satellite) => (
                  <g key={satellite.id}>
                    <motion.circle
                      cx={satellite.x}
                      cy={satellite.y}
                      r="24"
                      fill="url(#sat-glow)"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { opacity: [0.12, 0.42, 0.12], scale: [0.92, 1.08, 0.92] }
                      }
                      transition={{
                        duration: 4.4,
                        delay: satellite.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <g
                      transform={`translate(${satellite.x} ${satellite.y}) rotate(${satellite.rotation})`}
                    >
                      <rect
                        x="-7"
                        y="-7"
                        width="14"
                        height="14"
                        rx="3"
                        fill="#eff6ff"
                        stroke="rgba(15,23,42,0.18)"
                      />
                      <rect
                        x="-22"
                        y="-4.5"
                        width="11"
                        height="9"
                        rx="2"
                        fill="rgba(125,211,252,0.92)"
                      />
                      <rect
                        x="11"
                        y="-4.5"
                        width="11"
                        height="9"
                        rx="2"
                        fill="rgba(125,211,252,0.92)"
                      />
                      <path
                        d="M0 -13V-7"
                        stroke="rgba(186,230,253,0.95)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>
                ))}

                <motion.circle
                  cx="316"
                  cy="172"
                  r="164"
                  stroke="rgba(125,211,252,0.16)"
                  strokeWidth="1"
                  strokeDasharray="3 10"
                  animate={
                    shouldReduceMotion ? undefined : { rotate: [0, 360] }
                  }
                  transition={{
                    duration: 36,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "316px 172px" }}
                />
              </svg>

              <motion.div
                className="absolute top-10 right-10 rounded-2xl border border-white/12 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md"
                animate={
                  shouldReduceMotion ? undefined : { y: [0, -8, 0] }
                }
                transition={{
                  duration: 5.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="text-[11px] font-semibold tracking-[0.22em] text-sky-200 uppercase">
                  Active Orbit
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  Inter-Satellite Relay Plane
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-12 left-10 max-w-[272px] rounded-3xl border border-white/12 bg-slate-950/70 px-5 py-4 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-md"
                animate={
                  shouldReduceMotion ? undefined : { y: [0, 10, 0] }
                }
                transition={{
                  duration: 6.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.45,
                }}
              >
                <div className="flex items-center justify-between text-[11px] font-medium tracking-[0.18em] text-sky-200 uppercase">
                  <span>Mesh Stability</span>
                  <span>99.1%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : { x: ["-10%", "6%", "-10%"] }
                    }
                    transition={{
                      duration: 4.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ width: "84%" }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] text-slate-300">
                  <div>
                    <div className="text-slate-500">Satellites</div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      24
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Hop Delay</div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      18ms
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Coverage</div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      Global
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute top-12 -right-8 -z-10 h-52 w-52 rounded-full bg-sky-200/45 blur-3xl" />
            <div className="absolute -bottom-4 left-0 -z-10 h-56 w-56 rounded-full bg-blue-100/70 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
