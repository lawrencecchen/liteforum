import { z } from "zod";

export const schema = {
  item: z.object({
    id: z.number(),
    url: z.string().url(),
    title: z.string(),
    insertedAt: z.date(),
    html: z.string(),
  }),
};
