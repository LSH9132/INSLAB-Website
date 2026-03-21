"use client";

import { motion } from "motion/react";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/lib/motion/fade-up";

/* eslint-disable @typescript-eslint/no-explicit-any */
type ContactContentProps = {
  dict: any;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export function ContactContent({ dict }: ContactContentProps) {
  return (
    <div className="space-y-16">
      {/* Contact Information */}
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
          {dict.info.title}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={fadeUpVariants}
        >
          {/* Address */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-lg">
              <span role="img" aria-label="location">
                ◎
              </span>
            </div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">
              {dict.info.address.label}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500">
              {dict.info.address.line1}
              <br />
              {dict.info.address.line2}
            </p>
          </div>

          {/* Email */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-lg">
              <span role="img" aria-label="email">
                ✉
              </span>
            </div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">
              {dict.info.email.label}
            </h3>
            <a
              href="mailto:dyoung.kim@sch.ac.kr"
              className="text-sm text-accent hover:underline"
            >
              dyoung.kim@sch.ac.kr
            </a>
          </div>

          {/* Phone */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-lg">
              <span role="img" aria-label="phone">
                ☎
              </span>
            </div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">
              {dict.info.phone.label}
            </h3>
            <p className="text-sm text-slate-500">{dict.info.phone.value}</p>
          </div>
        </motion.div>
      </motion.section>

      {/* Inquiry Types */}
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
          {dict.inquiries.title}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={fadeUpVariants}
        >
          {dict.inquiries.types.map(
            (type: { title: string; description: string; icon: string }, i: number) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 text-2xl">{type.icon}</div>
                <h3 className="mb-2 font-bold text-slate-900">{type.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {type.description}
                </p>
              </div>
            )
          )}
        </motion.div>
      </motion.section>

      {/* Campus Map Placeholder */}
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
          {dict.directions.title}
        </motion.h2>
        <motion.div
          className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 md:h-80"
          variants={fadeUpVariants}
        >
          <div className="text-center">
            <p className="text-sm font-medium text-slate-400">
              {dict.directions.placeholder}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              {dict.directions.address}
            </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
