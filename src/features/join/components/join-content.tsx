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
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-800">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-lg text-slate-400"
        >
          +
        </motion.span>
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
            <p className="pb-4 text-sm leading-relaxed text-slate-500">
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
          className="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900"
          variants={fadeUpVariants}
        >
          <span className="h-6 w-1.5 rounded-full bg-accent" />
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
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
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
          className="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900"
          variants={fadeUpVariants}
        >
          <span className="h-6 w-1.5 rounded-full bg-teal-500" />
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
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
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
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
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
          className="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900"
          variants={fadeUpVariants}
        >
          <span className="h-6 w-1.5 rounded-full bg-violet-500" />
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

      {/* How to Apply */}
      <motion.section
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900"
          variants={fadeUpVariants}
        >
          <span className="h-6 w-1.5 rounded-full bg-amber-500" />
          {dict.apply.title}
        </motion.h2>
        <motion.div
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          variants={fadeUpVariants}
        >
          <p className="mb-4 text-sm leading-relaxed text-slate-600">
            {dict.apply.description}
          </p>
          <div className="mb-4 rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-700">
              {dict.apply.emailLabel}
            </p>
            <a
              href="mailto:dyoung.kim@sch.ac.kr"
              className="text-sm text-accent hover:underline"
            >
              dyoung.kim@sch.ac.kr
            </a>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {dict.apply.documentsLabel}
            </p>
            <ul className="space-y-1.5">
              {dict.apply.documents.map((doc: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-300" />
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
