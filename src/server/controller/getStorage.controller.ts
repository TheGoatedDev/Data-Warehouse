import s3Client from "@/libs/s3Client";
import IFileSystemItem from "@/types/FileSystemItem";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { trpc } from "../trpc";
import { ControllerLogic } from "@/types/ControllerLogic";

export const getStorageControllerLogic: ControllerLogic<{
    maxStorage: number;
    usedStorage: number;
}> = async ({ ctx }) => {
    const Prefix = `${ctx.session?.user?.email}/`;

    const listObjects = new ListObjectsCommand({
        Bucket: process.env.S3_BUCKET,
        Prefix: Prefix,
    });

    const result = await s3Client.send(listObjects);

    return {
        maxStorage: 1000000000000,
        usedStorage:
            result.Contents?.reduce((acc, file) => {
                return acc + (file.Size ?? 0);
            }, 0) ?? 0,
    };
};

export const getStorageController = trpc.procedure.query(
    async ({ input, ctx }) => await getStorageControllerLogic({ input, ctx })
);
