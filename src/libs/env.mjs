import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXT_AUTH_GOOGLE_ID: z.string().min(1),
    NEXT_AUTH_GOOGLE_SECRET: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    NEXT_AUTH_GOOGLE_ID: process.env.NEXT_AUTH_GOOGLE_ID,
    NEXT_AUTH_GOOGLE_SECRET: process.env.NEXT_AUTH_GOOGLE_SECRET,
  },
});
