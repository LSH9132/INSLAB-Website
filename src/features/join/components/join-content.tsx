"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/lib/motion/fade-up";

/* eslint-disable @typescript-eslint/no-explicit-any */
type JoinContentProps = {
  dict: any;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center gap-3 py-4 text-left"
      >
        <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
        <span className="flex-1 text-sm font-semibold text-slate-800">
          {question}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="h-4 w-4 flex-shrink-0 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 pl-[18px] text-sm leading-relaxed text-slate-500">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function JoinContent({ dict }: JoinContentProps) {
  return (
    <div className="space-y-16">
      {/* Why INSLAB */}
      <motion.section
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="mb-8 text-xl font-bold text-slate-900"
          variants={fadeUpVariants}
        >
          {dict.why.title}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={fadeUpVariants}
        >
          {dict.why.points.map(
            (point: { title: string; description: string }, i: number) => (
              <div
                key={i}
                className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-emerald-200"
              >
                <span className="pointer-events-none absolute top-4 right-5 text-4xl font-bold text-emerald-200/60 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 font-bold text-slate-900">{point.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {point.description}
                </p>
              </div>
            )
          )}
        </motion.div>
      </motion.section>

      {/* Recruitment Info */}
      <motion.section
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="mb-8 text-xl font-bold text-slate-900"
          variants={fadeUpVariants}
        >
          {dict.recruitment.title}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={fadeUpVariants}
        >
          {dict.recruitment.tracks.map(
            (
              track: {
                degree: string;
                requirements: string[];
                timeline: string;
              },
              i: number
            ) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-100 border-l-4 border-l-emerald-400 bg-white p-6 shadow-sm"
              >
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  {track.degree}
                </h3>
                <ul className="mb-4 space-y-2">
                  {track.requirements.map((req: string, ri: number) => (
                    <li
                      key={ri}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      {req}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-400">{track.timeline}</p>
              </div>
            )
          )}
        </motion.div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="mb-8 text-xl font-bold text-slate-900"
          variants={fadeUpVariants}
        >
          {dict.faq.title}
        </motion.h2>
        <motion.div
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          variants={fadeUpVariants}
        >
          {dict.faq.items.map(
            (item: { question: string; answer: string }, i: number) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            )
          )}
        </motion.div>
      </motion.section>

      {/* How to Apply — inverted CTA */}
      <motion.section
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="rounded-2xl bg-emerald-600 p-8 text-white shadow-sm lg:p-10"
          variants={fadeUpVariants}
        >
          <h2 className="mb-4 text-xl font-bold">{dict.apply.title}</h2>
          <p className="mb-6 text-sm leading-relaxed text-emerald-100">
            {dict.apply.description}
          </p>
          <div className="mb-6">
            <p className="text-sm font-medium text-emerald-100">
              {dict.apply.emailLabel}
            </p>
            <a
              href="mailto:dyoung.kim@sch.ac.kr"
              className="text-sm font-semibold text-emerald-200 hover:text-white hover:underline"
            >
              dyoung.kim@sch.ac.kr
            </a>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              {dict.apply.documentsLabel}
            </p>
            <ul className="space-y-1.5">
              {dict.apply.documents.map((doc: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-emerald-100"
                >
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-300" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
