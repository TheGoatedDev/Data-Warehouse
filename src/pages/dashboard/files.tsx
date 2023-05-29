import {
    AppShell,
    Button,
    Container,
    Flex,
    Group,
    Header,
    NavLink,
    Text,
    ThemeIcon,
    Title,
    useMantineTheme,
} from "@mantine/core";
import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { IconDatabase, IconFile, IconUpload, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import DashboardLayout from "@/layouts/DashboardLayout";
import { trpcClient } from "@/libs/trpcClient";
import { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const DashboardFilesPage: NextPage = () => {
    const theme = useMantineTheme();

    const [path, setPath] = useState<string>("");

    const trpcContext = trpcClient.useContext();
    const getFileSignedUploadURL =
        trpcClient.getFileSignedUploadURL.useMutation();

    return (
        <DashboardLayout>
            <Dropzone.FullScreen
                onDrop={async (files) => {
                    const promises = files.map(async (file) => {
                        const url = await getFileSignedUploadURL.mutateAsync({
                            fileName: file.name,
                            path,
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
            <Container size={"lg"}>
                <Title order={1}>Files</Title>
            </Container>
        </DashboardLayout>
    );
};

export default DashboardFilesPage;
