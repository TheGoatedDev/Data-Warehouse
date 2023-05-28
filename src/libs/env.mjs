import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NEXT_AUTH_GOOGLE_ID: z.string().min(1),
        NEXT_AUTH_GOOGLE_SECRET: z.string().min(1),
        NEXTAUTH_SECRET: z.string().min(1),
        NEXTAUTH_URL: z.string().default("http://localhost:3000"),

        S3_BUCKET: z.string().min(1),

        AWS_ACCESS_KEY_ID: z.string().min(1),
        AWS_SECRET_ACCESS_KEY: z.string().min(1),
        AWS_REGION: z.string().min(1),
    },
    client: {},
    runtimeEnv: {
        NEXT_AUTH_GOOGLE_ID: process.env.NEXT_AUTH_GOOGLE_ID,
        NEXT_AUTH_GOOGLE_SECRET: process.env.NEXT_AUTH_GOOGLE_SECRET,

        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,

        S3_BUCKET: process.env.S3_BUCKET,

        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_REGION: process.env.AWS_REGION,
    },
});
