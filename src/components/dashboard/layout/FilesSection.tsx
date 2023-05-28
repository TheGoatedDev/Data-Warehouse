import ComponentWithChild from "@/types/ComponentWithChild";
import {
    Navbar,
    Group,
    Tooltip,
    Stack,
    RingProgress,
    Center,
    Text,
    useMantineTheme,
    ThemeIcon,
    Input,
    NavLink,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
    Icon,
    IconDatabase,
    IconFile,
    IconHome,
    IconSearch,
} from "@tabler/icons-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IconFolder } from "@tabler/icons-react";
import { trpcClient } from "@/libs/trpcClient";
import IFileSystemItem from "@/types/FileSystemItem";

const Item: ComponentWithChild<{
    name: string;
    path: string;
}> = ({ children, name, path }) => {
    return (
        <NavLink
            label={
                <Tooltip label={name}>
                    <Text size={"xs"} lineClamp={1}>
                        {name}
                    </Text>
                </Tooltip>
            }
            p={0}
            px="sm"
            py={1}
            icon={children ? <IconFolder size={16} /> : <IconFile size={16} />}
            childrenOffset={"xs"}
        >
            {children}
        </NavLink>
    );
};

export const FilesSection: FC = () => {
    const theme = useMantineTheme();
    const iconMode = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const getFiles = trpcClient.getFiles.useQuery();

    const [files, setFiles] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        // Map the files to the file tree using the Item component and run it through a recursive function for each folder
        const mapFiles = (files: IFileSystemItem[]) => {
            return files.map((file, i) => {
                return (
                    <Item key={i} name={file.Name} path={file.Path}>
                        {file.items && mapFiles(file.items)}
                    </Item>
                );
            });
        };

        if (getFiles.data) {
            console.log(getFiles.data);
            setFiles(mapFiles(getFiles.data));
        }
    }, [getFiles.data]);

    if (iconMode) {
        return (
            <Navbar.Section grow>
                <></>
            </Navbar.Section>
        );
    }

    return (
        <Navbar.Section grow>
            <Input
                mx={"sm"}
                mt={"xs"}
                placeholder="Search Files"
                rightSection={<IconSearch size={18} />}
            />
            <Text size={"xs"} weight={"bold"} px={"sm"} mt={4} color="dimmed">
                Overview
            </Text>
            <Item name="~" path="/">
                {files}
            </Item>
        </Navbar.Section>
    );
};

export default FilesSection;
