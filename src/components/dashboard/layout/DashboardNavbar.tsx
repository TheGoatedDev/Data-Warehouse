import {
    Avatar,
    Center,
    Divider,
    Group,
    Input,
    NavLink,
    Navbar,
    RingProgress,
    Stack,
    Text,
    ThemeIcon,
    Title,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
    IconDatabase,
    IconFolder,
    IconHome,
    IconSearch,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import StatsSection from "./StatsSection";
import LinksSection from "./LinksSection";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import FilesSection from "./FilesSection";

export const DashboardNavbar: FC = () => {
    const { status, data } = useSession();

    const theme = useMantineTheme();
    const iconMode = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const [animationParent] = useAutoAnimate();

    return (
        <Navbar
            width={{
                base: 60,

                sm: 250,
            }}
        >
            <Navbar.Section py={"md"}>
                <Center>
                    <Group spacing={8}>
                        <ThemeIcon
                            variant="gradient"
                            size={"lg"}
                            gradient={{
                                from: "yellow",
                                to: "orange",
                                deg: -45,
                            }}
                        >
                            <IconDatabase size={24} />
                        </ThemeIcon>
                        {!iconMode ? (
                            <Title order={4} align="center">
                                Data Warehouse
                            </Title>
                        ) : null}
                    </Group>
                </Center>
            </Navbar.Section>
            <Divider />
            <StatsSection />
            <Divider />
            <LinksSection />
            <Divider />
            <FilesSection />
            <Divider />
            <Navbar.Section py="md" px="sm">
                <Group
                    spacing={"xs"}
                    sx={{
                        justifyContent: iconMode ? "center" : "flex-start",
                    }}
                >
                    <Avatar
                        radius={"xl"}
                        color="orange"
                        src={data?.user?.image}
                    />
                    {!iconMode ? (
                        <Stack spacing={0}>
                            <Text size={"sm"} weight={"bold"}>
                                {data?.user?.name}
                            </Text>
                            <Text size={"xs"} color={"dimmed"}>
                                {data?.user?.email}
                            </Text>
                        </Stack>
                    ) : null}
                </Group>
            </Navbar.Section>
        </Navbar>
    );
};
