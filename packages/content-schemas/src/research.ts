import { z } from "zod";

export const ResearchAreaSchema = z.object({
  id: z.string(),
  title: z.object({ ko: z.string(), en: z.string() }),
  description: z.object({ ko: z.string(), en: z.string() }),
  keywords: z.array(z.string()),
  papers: z.array(
    z.object({
      title: z.string(),
      venue: z.string(),
      year: z.number().int(),
    }),
  ),
});

export const ResearchAreasSchema = z.array(ResearchAreaSchema);

export type ResearchArea = z.infer<typeof ResearchAreaSchema>;
