"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Mail, GraduationCap, MapPin, Building, Globe } from "lucide-react";

export function DirectorHero() {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-end justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <Image
                src="/images/director/dk2022.jpg"
                alt="Director Dae-Young Kim"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            <div className="space-y-2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground mb-4"
              >
                Lab Director (PI)
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
                Dae-Young Kim <span className="text-muted-foreground whitespace-nowrap text-3xl sm:text-4xl md:text-5xl">(김대영)</span>
              </h1>
              <p className="text-xl text-muted-foreground pt-2 font-medium">
                Doctor of Philosophy
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm md:text-base">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Building className="w-5 h-5 text-primary" />
                <a href="https://homepage.sch.ac.kr/computer" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Dept. of Computer Software Engineering
                </a>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <GraduationCap className="w-5 h-5 text-primary" />
                <a href="https://www.sch.ac.kr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Soonchunhyang University
                </a>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground sm:col-span-2">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  Office) Room 510, 5th fl. Multimedia Bldg.<br/>
                  22 Soonchunhyang-ro, Asan-si, Chungcheongnam-do, 31538, Rep. of KOREA
                </span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:dyoung.kim@sch.ac.kr" className="hover:text-primary transition-colors font-medium">
                  dyoung.kim_at_sch.ac.kr
                </a>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Globe className="w-5 h-5 text-primary" />
                <a href="https://inslab.sch.ac.kr/~kimdy/lec/lec2026-1.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">
                  Lecture 2026-1
                </a>
              </div>
            </div>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.8 }}
               className="pt-4 text-sm italic text-muted-foreground border-t border-border mt-6 w-fit"
            >
              Recorded in &quot;Marquis Who&apos;s Who in the World 2016&quot;
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
