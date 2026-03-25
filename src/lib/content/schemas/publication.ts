import { z } from "zod";

export const PublicationTypeSchema = z.enum([
  "Journal",
  "Conference",
  "Domestic",
]);

export const PublicationSchema = z.object({
  id: z.string(),
  year: z.number().int(),
  type: PublicationTypeSchema,
  title: z.string(),
  authors: z.array(z.string()),
  venue: z.string(),
  details: z.string(),
  tags: z.array(z.string()),
  pdfUrl: z.string(),
  doiUrl: z.string(),
});

export const PublicationsSchema = z.array(PublicationSchema);

export type PublicationType = z.infer<typeof PublicationTypeSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
