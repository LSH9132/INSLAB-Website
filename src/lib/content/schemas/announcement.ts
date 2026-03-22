import { z } from "zod";

export const AnnouncementSchema = z.object({
  ko: z.string(),
  en: z.string(),
});

export const AnnouncementsSchema = z.array(AnnouncementSchema);

export type Announcement = z.infer<typeof AnnouncementSchema>;
