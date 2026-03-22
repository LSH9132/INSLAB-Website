import { z } from "zod";

export const AnnouncementSchema = z.object({
  ko: z.string(),
  en: z.string(),
  href: z.string().optional(),
});

export const AnnouncementsSchema = z.array(AnnouncementSchema);

export type Announcement = z.infer<typeof AnnouncementSchema>;
