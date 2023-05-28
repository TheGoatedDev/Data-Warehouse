import { env } from "@/libs/env.mjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import Email from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import {
    HeadBucketCommand,
    HeadObjectCommand,
    NotFound,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import s3Client from "@/libs/s3Client";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: env.NEXT_AUTH_GOOGLE_ID,
            clientSecret: env.NEXT_AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),

        // ...add more providers here
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (!profile?.email?.endsWith("@devarksolutions.com")) {
                return false;
            }

            try {
                const CheckFolderInBucket = new HeadObjectCommand({
                    Bucket: env.S3_BUCKET,
                    Key: `${user.email}/`,
                });

                await s3Client.send(CheckFolderInBucket);
            } catch (error) {
                if (error instanceof NotFound) {
                    if (error.$metadata.httpStatusCode === 404) {
                        const CreateFolderInBucket = new PutObjectCommand({
                            Bucket: env.S3_BUCKET,
                            Key: `${user.email}/`,
                        });

                        await s3Client.send(CreateFolderInBucket);
                    }
                }
            }

            return true;
        },
    },
};

export default NextAuth(authOptions);
