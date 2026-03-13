import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader currentPath="/" />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-20 lg:px-10">
        <section className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-slate-400 uppercase">
              Artificial Intelligence Network Systems Laboratory
            </p>
            <h1 className="max-w-4xl text-5xl leading-none font-medium tracking-tight text-slate-950 font-serif italic md:text-7xl">
              Research systems for adaptive, secure, and trustworthy computing.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-500">
              INSLAB studies intelligent networks, distributed systems, and
              applied AI. We build practical research experiences around clear
              structure, precise communication, and scalable implementation.
            </p>
          </div>

          <div className="rounded-[2rem] border border-border bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-medium text-slate-500">
              Current build focus
            </p>
            <p className="mt-3 text-3xl leading-tight font-medium text-slate-950 font-serif">
              Publications overview inspired by the Stitch design system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/publications"
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                View Publications
              </Link>
              <span className="inline-flex items-center rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-slate-500">
                Structured for Stitch-to-code workflow
              </span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
