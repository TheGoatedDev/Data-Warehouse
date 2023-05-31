import {
    ActionIcon,
    Anchor,
    AppShell,
    Button,
    Container,
    Flex,
    Group,
    Header,
    NavLink,
    Paper,
    Text,
    ThemeIcon,
    Title,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import {
    IconDatabase,
    IconDownload,
    IconFile,
    IconFolder,
    IconTrash,
    IconUpload,
    IconX,
} from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import DashboardLayout from "@/layouts/DashboardLayout";
import { trpcClient } from "@/libs/trpcClient";
import { useMemo, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import IFileSystemItem from "@/types/FileSystemItem";
import { sortItemsDeep } from "@/libs/sortItems";
import { set } from "zod";
import { FileItem } from "@/components/dashboard/files/FileItem";

const DashboardFilesPage: NextPage = () => {
    const theme = useMantineTheme();

    const [currentPath, setCurrentPath] = useState<string>("");

    const trpcContext = trpcClient.useContext();
    const getFileSignedUploadURL =
        trpcClient.getFileSignedUploadURL.useMutation();

    const getFiles = trpcClient.getFiles.useQuery({
        basePath: currentPath,
    });

    // Flatten items, even nested ones
    const flattenItems = useMemo(() => {
        const items: IFileSystemItem[] = [];

        const flatten = (item: IFileSystemItem) => {
            items.push(item);

            if (item.Type === "folder") {
                item.items?.forEach((child) => {
                    flatten(child);
                });
            }
        };

        getFiles.data?.forEach((item) => {
            flatten(item);
        });

        return items;
    }, [getFiles.data]);

    return (
        <DashboardLayout>
            <Dropzone.FullScreen
                onDrop={async (files) => {
                    const promises = files.map(async (file) => {
                        // Check if file already exist in the current directory

                        const fileExists = flattenItems.some(
                            (item) => item.Path === currentPath + file.name
                        );

                        if (fileExists) {
                            notifications.show({
                                title: "File already exists",
                                message: `File ${file.name} already exists in this directory`,
                                color: "red",
                            });
                            return;
                        }

                        const url = await getFileSignedUploadURL.mutateAsync({
                            fileName: file.name,
                            path: currentPath,
                        });

                        const response = await axios.put(url, file, {
                            headers: {
                                "Content-Type": file.type,
                            },
                        });

                        if (response.status === 200) {
                            notifications.show({
                                title: "File uploaded",
                                message: `File ${file.name} has been uploaded`,
                            });
                        } else {
                            notifications.show({
                                title: "File upload failed",
                                message: `File ${file.name} failed to upload`,
                                color: "red",
                            });
                        }
                    });

                    await Promise.all(promises);

                    trpcContext.getFiles.invalidate();
                    trpcContext.getStorage.invalidate();
                }}
            >
                <Group
                    position="center"
                    spacing="xl"
                    mih={220}
                    sx={{ pointerEvents: "none" }}
                >
                    <Dropzone.Accept>
                        <IconUpload
                            size="3.2rem"
                            stroke={1.5}
                            color={
                                theme.colors[theme.primaryColor][
                                    theme.colorScheme === "dark" ? 4 : 6
                                ]
                            }
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            size="3.2rem"
                            stroke={1.5}
                            color={
                                theme.colors.red[
                                    theme.colorScheme === "dark" ? 4 : 6
                                ]
                            }
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconFile size="3.2rem" stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag files here or click to select files
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Attach as many files as you like.
                        </Text>
                    </div>
                </Group>
            </Dropzone.FullScreen>
            <Container
                size={"lg"}
                h={"100%"}
                sx={() => ({
                    display: "flex",
                    flexDirection: "column",
                })}
            >
                <Title mb="md">My Files</Title>
                <Paper shadow="sm" p="md" withBorder h={"100%"}>
                    {currentPath !== "" && (
                        <FileItem
                            item={{
                                Name: "..",
                                Path: "",
                                Type: "folder",
                                items: [],
                                Size: 0,
                                LastModified: new Date(),
                                StorageClass: "",
                            }}
                            onClickFolder={() => {
                                const backPath = currentPath
                                    .split("/")
                                    .slice(0, -2)
                                    .join("/");
                                console.log(backPath);
                                setCurrentPath(
                                    backPath + (backPath !== "" ? "/" : "")
                                );
                            }}
                        />
                    )}
                    {sortItemsDeep(getFiles.data ?? []).map((item) => (
                        <FileItem
                            key={item.Path}
                            item={item}
                            onClickFolder={() => {
                                console.log(currentPath);
                                setCurrentPath((prev) => prev + item.Path);
                                console.log(currentPath);
                            }}
                        />
                    ))}
                </Paper>
            </Container>
        </DashboardLayout>
    );
};

export default DashboardFilesPage;
