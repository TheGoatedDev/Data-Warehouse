import s3Client from "@/libs/s3Client";
import IFileSystemItem from "@/types/FileSystemItem";
import { ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { trpc } from "../trpc";
import { ControllerLogic } from "@/types/ControllerLogic";
import isAuthenticatedMiddleware from "../middleware/isAuthenticated.middleware";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

const getFileSignedUploadURLControllerInput = z.object({
    fileName: z.string(),
    path: z.string(),
});

export const getFileSignedUploadURLControllerLogic: ControllerLogic<
    string,
    z.infer<typeof getFileSignedUploadURLControllerInput>
> = async ({ ctx, input }) => {
    const Prefix = `${ctx.session!.user!.email!}/`;

    const listObjects = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: Prefix + input.path + input.fileName,
    });

    const url = await getSignedUrl(s3Client, listObjects, {
        expiresIn: 60 * 5,
    });

    return url;
};

export const getFileSignedUploadURLController = trpc.procedure
    .use(isAuthenticatedMiddleware)
    .input(getFileSignedUploadURLControllerInput)
    .mutation(
        async ({ input, ctx }) =>
            await getFileSignedUploadURLControllerLogic({ input, ctx })
    );
