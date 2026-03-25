"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { projectData } from "../data/director-data";
import { FolderGit2, CheckCircle2, Clock } from "lucide-react";

export function DirectorProjects() {
  const t = useTranslations("Director");

  const ongoingProjects = projectData.filter(p => p.status === "Ongoing");
  const pastProjects = projectData.filter(p => p.status === "Past");

  return (
    <section className="w-full py-16 bg-muted/10">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center justify-center gap-3">
            <FolderGit2 className="w-8 h-8 text-primary" />
            {t("projects")}
          </h2>
        </motion.div>

        <div className="space-y-12">
          {ongoingProjects.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" /> Ongoing Projects
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {ongoingProjects.map((project, index) => (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {project.period}
                      </span>
                      <h4 className="font-semibold text-base leading-tight">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground font-medium">
                        Agency: {project.agency}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {pastProjects.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5" /> Past Projects
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {pastProjects.map((project, index) => (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 rounded-xl border bg-card/50 shadow-sm opacity-90 hover:opacity-100 transition-opacity"
                  >
                     <div className="space-y-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                        {project.period}
                      </span>
                      <h4 className="font-medium text-base leading-tight">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Agency: {project.agency}
                      </p>
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
