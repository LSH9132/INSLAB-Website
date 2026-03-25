import { z } from "zod";

export const NewsCategorySchema = z.enum([
  "Awards",
  "Papers",
  "Events",
  "Notices",
]);

export const NewsItemSchema = z.object({
  id: z.string(),
  category: NewsCategorySchema,
  date: z.string(),
  title: z.object({ ko: z.string(), en: z.string() }),
  description: z.object({ ko: z.string(), en: z.string() }),
  imageUrl: z.string(),
});

export const NewsItemsSchema = z.array(NewsItemSchema);

export type NewsCategory = z.infer<typeof NewsCategorySchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
