"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { Patent } from "@/lib/content";
import { ShieldCheck, FileCheck, FileClock } from "lucide-react";

export function DirectorPatents({ patents }: { patents: Patent[] }) {
  const t = useTranslations("Director");

  const registered = patents.filter((p) => p.status === "Registered");
  const filed = patents.filter((p) => p.status === "Filed");

  return (
    <section className="w-full py-16">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center justify-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            {t("patents")}
          </h2>
        </motion.div>

        <div className="space-y-12">
          {registered.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                <FileCheck className="w-5 h-5" /> Registered ({registered.length})
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {registered.map((patent, index) => (
                  <motion.div
                    key={patent.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-5 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {patent.date}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {patent.number}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm leading-tight">
                        {patent.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {filed.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-muted-foreground">
                <FileClock className="w-5 h-5" /> Filed ({filed.length})
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {filed.map((patent, index) => (
                  <motion.div
                    key={patent.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-5 rounded-xl border bg-card/50 shadow-sm opacity-90 hover:opacity-100 transition-opacity"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                          {patent.date}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {patent.number}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm leading-tight">
                        {patent.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
