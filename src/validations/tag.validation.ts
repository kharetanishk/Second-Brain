import { z } from "zod";

export const tagSchema = z.object({
  title: z.string().min(1, "Tag title is required"),
});
