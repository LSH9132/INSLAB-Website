import { z } from "zod";

export const MemberRoleSchema = z.enum([
  "Professor",
  "PhD",
  "MS",
  "BS",
  "Alumni",
]);

export const MemberSchema = z.object({
  id: z.string(),
  name: z.object({ ko: z.string(), en: z.string() }),
  role: MemberRoleSchema,
  photo: z.string(),
  enrollYear: z.number().int(),
  interests: z.array(z.string()),
  email: z.string().optional(),
  links: z
    .object({
      scholar: z.string().optional(),
      github: z.string().optional(),
    })
    .optional(),
});

export const MembersSchema = z.array(MemberSchema);

export type MemberRole = z.infer<typeof MemberRoleSchema>;
export type Member = z.infer<typeof MemberSchema>;
