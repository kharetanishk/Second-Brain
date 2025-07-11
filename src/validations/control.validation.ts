import { z } from "zod";

export const contentschema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["article", "image", "video", "pdf"]),
  link: z
    .object({
      url: z.string().url("Invalid Url"),
      hash: z.string().optional(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
});
