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

function MapPinIcon() {
  return (
    <svg className="h-5 w-5 text-stone-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg className="h-5 w-5 text-stone-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5 text-stone-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

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
          className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400"
          variants={fadeUpVariants}
        >
          {dict.info.title}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={fadeUpVariants}
        >
          {/* Address */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100">
              <MapPinIcon />
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
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100">
              <EnvelopeIcon />
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
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100">
              <PhoneIcon />
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
          className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400"
          variants={fadeUpVariants}
        >
          {dict.inquiries.title}
        </motion.h2>
        <motion.div
          className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white shadow-sm"
          variants={fadeUpVariants}
        >
          {dict.inquiries.types.map(
            (type: { title: string; description: string; icon: string }, i: number) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5"
              >
                <span className="mt-0.5 text-lg text-stone-400">{type.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900">{type.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {type.description}
                  </p>
                </div>
              </div>
            )
          )}
        </motion.div>
      </motion.section>

      {/* Campus Map */}
      <motion.section
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400"
          variants={fadeUpVariants}
        >
          {dict.directions.title}
        </motion.h2>
        <motion.div
          className="overflow-hidden rounded-2xl border border-stone-200"
          variants={fadeUpVariants}
        >
          <iframe
            src="https://maps.google.com/maps?q=충청남도+아산시+신창면+순천향로+22+멀티미디어관&t=&z=17&ie=UTF8&iwloc=&output=embed"
            className="h-[28rem] w-full md:h-[32rem]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="순천향대학교 멀티미디어관 위치"
          />
        </motion.div>
        <motion.div
          className="mt-4 flex items-center justify-between"
          variants={fadeUpVariants}
        >
          <p className="text-sm text-stone-500">
            {dict.directions.address}
          </p>
          <a
            href="https://maps.google.com/maps?q=충청남도+아산시+신창면+순천향로+22+멀티미디어관"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-stone-600 underline underline-offset-4 transition-colors hover:text-stone-900"
          >
            {dict.directions.openInMap}
          </a>
        </motion.div>
      </motion.section>
    </div>
  );
}
