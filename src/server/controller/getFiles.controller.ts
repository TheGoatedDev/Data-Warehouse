import s3Client from "@/libs/s3Client";
import IFileSystemItem from "@/types/FileSystemItem";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { trpc } from "../trpc";
import { ControllerLogic } from "@/types/ControllerLogic";
import isAuthenticatedMiddleware from "../middleware/isAuthenticated.middleware";

export const getFilesControllerLogic: ControllerLogic<
    IFileSystemItem[]
> = async ({ ctx }) => {
    const Prefix = `${ctx.session?.user?.email}/`;

    const listObjects = new ListObjectsCommand({
        Bucket: process.env.S3_BUCKET,
        Prefix: Prefix,
    });

    const result = await s3Client.send(listObjects);

    // Map the result so that the nested objects.
    const files =
        result.Contents?.map<IFileSystemItem>((file) => ({
            Name: file.Key?.split("/").pop() ?? "",
            Path: file.Key?.replace(Prefix, "") ?? "",
            LastModified: file.LastModified ?? new Date(),
            Size: file.Size ?? 0,
            StorageClass: file.StorageClass ?? "",
            Type: file.Size === 0 ? "folder" : "file",
        })) ?? [];

    const filteredFiles = files?.filter((file) => file.Size !== 0);

    // Nest the objects by their key if they don't end in a "/" simiar to a file system.
    // This is to make it easier to display the files in a tree structure
    // This data might be nested multiple levels deep.
    const nestedFiles = filteredFiles?.reduce<IFileSystemItem[]>(
        (acc, file) => {
            const path = file.Path.split("/");
            const name = path.pop();

            let currentPath = acc;

            path.forEach((path) => {
                const existingPath = currentPath.find(
                    (item) => item.Name === path
                );

                if (existingPath) {
                    currentPath = existingPath.items ?? [];
                } else {
                    const newFolder: IFileSystemItem = {
                        Name: path,
                        Path: `${path}/`,
                        LastModified: new Date(),
                        Size: 0,
                        StorageClass: "",
                        Type: "folder",
                        items: [],
                    };

                    currentPath.push(newFolder);
                    currentPath = newFolder.items ?? [];
                }
            });

            currentPath.push(file);

            return acc;
        },
        []
    );

    return nestedFiles ?? [];
};

export const getFilesController = trpc.procedure
    .use(isAuthenticatedMiddleware)
    .query(
        async ({ input, ctx }) => await getFilesControllerLogic({ input, ctx })
    );
