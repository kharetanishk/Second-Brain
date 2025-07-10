import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(2).max(30),
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignupInput = z.infer<typeof signupSchema>;
