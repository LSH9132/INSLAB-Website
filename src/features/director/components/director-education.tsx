"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { Education, Career } from "@/lib/content";
import { GraduationCap, Briefcase } from "lucide-react";

export function DirectorEducation({
  education: educationData,
  career: careerData,
}: {
  education: Education[];
  career: Career[];
}) {
  const t = useTranslations("Director");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("education")}</h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Career Section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Career</h3>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent"
            >
              {careerData.map((career) => (
                <motion.div key={career.id} variants={itemVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium text-primary">{career.period}</span>
                      <h4 className="font-semibold text-lg">{career.role}</h4>
                      <p className="text-sm text-muted-foreground">{career.organization}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education Section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Education</h3>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent"
            >
              {educationData.map((edu) => (
                <motion.div key={edu.id} variants={itemVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium text-primary">{edu.period}</span>
                      <h4 className="font-semibold text-lg">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
