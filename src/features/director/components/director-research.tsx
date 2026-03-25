"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Lightbulb } from "lucide-react";

export function DirectorResearch() {
  const t = useTranslations("Director");

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
            <Lightbulb className="w-8 h-8 text-primary" />
            {t("researchArea")}
          </h2>
        </motion.div>

        <div className="flex justify-center -mt-4 mb-8">
            <p className="text-xl text-muted-foreground font-medium text-center">
               Computer systems, Network, Data, and Service using Intelligence
            </p>
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border bg-muted/20"
        >
            {/* Fallback pattern in case image is missing */}
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            <Image
                src="/images/director/researchv2.jpg"
                alt="Research Areas Diagram"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 1024px"
            />
        </motion.div>
      </div>
    </section>
  );
}
