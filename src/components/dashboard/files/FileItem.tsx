import IFileSystemItem from "@/types/FileSystemItem";
import {
    Paper,
    Flex,
    Anchor,
    Tooltip,
    ActionIcon,
    useMantineTheme,
    Text,
} from "@mantine/core";
import {
    IconFolder,
    IconFile,
    IconDownload,
    IconTrash,
} from "@tabler/icons-react";
import { FC } from "react";

export const FileItem: FC<{
    item: IFileSystemItem;
    onClickFolder: () => void;
}> = ({ item, onClickFolder }) => {
    const theme = useMantineTheme();

    return (
        <Paper
            shadow="sm"
            p="md"
            withBorder
            sx={() => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: "sm",
            })}
        >
            <Flex
                sx={() => ({
                    alignItems: "center",
                })}
            >
                {item.Type === "folder" ? (
                    <>
                        <IconFolder
                            size="1.5rem"
                            stroke={1.5}
                            color={theme.colors[theme.primaryColor][4]}
                        />
                        <Anchor
                            size={"sm"}
                            ml={"sm"}
                            weight={500}
                            color={theme.colors[theme.primaryColor][4]}
                            lineClamp={1}
                            onClick={onClickFolder}
                        >
                            {item.Name}
                        </Anchor>
                    </>
                ) : (
                    <>
                        <IconFile
                            size="1.5rem"
                            stroke={1.5}
                            color={theme.colors[theme.primaryColor][4]}
                        />
                        <Text
                            size="sm"
                            ml="sm"
                            weight={500}
                            color={theme.colors[theme.primaryColor][4]}
                            lineClamp={1}
                        >
                            {item.Name}
                        </Text>
                    </>
                )}
            </Flex>
            <Flex gap={"xs"} justify={"flex-end"}>
                <Tooltip label="Download">
                    <ActionIcon color="blue" size="sm">
                        <IconDownload />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Delete">
                    <ActionIcon color="red" size="sm">
                        <IconTrash />
                    </ActionIcon>
                </Tooltip>
            </Flex>
        </Paper>
    );
};
