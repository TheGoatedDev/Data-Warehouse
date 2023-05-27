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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Icon, IconDatabase, IconHome } from "@tabler/icons-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconFolder } from "@tabler/icons-react";

const NavbarLink: FC<{
    href: string;
    label: string;
    icon: React.ReactNode;
}> = ({ href, label, icon }) => {
    const router = useRouter();
    const theme = useMantineTheme();
    const iconMode = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const [animationParent] = useAutoAnimate();

    return (
        <Tooltip disabled={!iconMode} label={label} position="right" withArrow>
            <Group
                ref={animationParent}
                onClick={() => router.push(href)}
                px={"md"}
                sx={{
                    backgroundColor:
                        router.pathname === href
                            ? theme.colors.dark[6]
                            : undefined,
                    justifyContent: iconMode ? "center" : "flex-start",
                    height: "45px",
                    maxHeight: "45px",
                    transition: "background-color 200ms ease",
                    ":hover": {
                        backgroundColor: theme.colors.dark[6],
                    },
                }}
            >
                <ThemeIcon variant="light" size={"lg"} radius={"xl"}>
                    {icon}
                </ThemeIcon>

                {!iconMode ? <Text size={"sm"}>{label}</Text> : null}
            </Group>
        </Tooltip>
    );
};

export const LinksSection: FC = () => {
    return (
        <Navbar.Section>
            <NavbarLink
                href="/dashboard"
                label="Overview"
                icon={<IconHome />}
            />
            <NavbarLink
                href="/dashboard/files"
                label="All Files"
                icon={<IconFolder />}
            />
        </Navbar.Section>
    );
};

export default LinksSection;
