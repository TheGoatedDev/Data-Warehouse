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
import { FC } from "react";
import { useRouter } from "next/router";
import { IconFolder } from "@tabler/icons-react";

const Item: ComponentWithChild<{
    name: string;
    path: string;
}> = ({ children, name, path }) => {
    return (
        <NavLink
            label={<Text size={"xs"}>{name}</Text>}
            p={0}
            px="sm"
            py={1}
            icon={children ? <IconFolder size={16} /> : <IconFile size={16} />}
        >
            {children}
        </NavLink>
    );
};

export const FilesSection: FC = () => {
    return (
        <Navbar.Section grow>
            <Input
                mx={"sm"}
                mt={"xs"}
                placeholder="Search Files"
                rightSection={<IconSearch size={18} />}
            />
            <Text size={"xs"} weight={"bold"} px={"sm"} mt={4} color="dimmed">
                File Tree
            </Text>
            <Item name="~" path="/">
                <Item name="Documents" path="/documents">
                    <Item name="Project.pdf" path="/documents/Project.pdf" />
                </Item>
            </Item>
        </Navbar.Section>
    );
};

export default FilesSection;
