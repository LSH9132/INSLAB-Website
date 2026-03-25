import { z } from "zod";

export const EducationSchema = z.object({
  id: z.string(),
  period: z.string(),
  degree: z.string(),
  institution: z.string(),
  details: z.string().optional(),
});

export const CareerSchema = z.object({
  id: z.string(),
  period: z.string(),
  role: z.string(),
  organization: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  period: z.string(),
  title: z.string(),
  agency: z.string(),
  status: z.enum(["Ongoing", "Past"]),
});

export const PatentSchema = z.object({
  id: z.string(),
  title: z.string(),
  number: z.string(),
  date: z.string(),
  status: z.enum(["Registered", "Filed"]),
});

export const DirectorDataSchema = z.object({
  education: z.array(EducationSchema),
  career: z.array(CareerSchema),
  projects: z.array(ProjectSchema),
  patents: z.array(PatentSchema),
});

export type Education = z.infer<typeof EducationSchema>;
export type Career = z.infer<typeof CareerSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Patent = z.infer<typeof PatentSchema>;
