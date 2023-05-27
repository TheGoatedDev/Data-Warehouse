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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconDatabase } from "@tabler/icons-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FC } from "react";

export const StatsSection: FC = () => {
    const theme = useMantineTheme();
    const iconMode = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const [animationParent] = useAutoAnimate();

    return (
        <Navbar.Section
            px={"sm"}
            py={8}
            sx={{
                justifyContent: "center",
            }}
        >
            <Group
                sx={{
                    justifyContent: iconMode ? "center" : "flex-start",
                    overflow: "hidden",
                    maxHeight: "45px",
                }}
                ref={animationParent}
            >
                <Tooltip
                    position="right"
                    label={
                        <Stack spacing={0}>
                            <Text size={"sm"}>Total Storage Used</Text>
                            <Text size={"xs"}>1.5 GB of 1 TB</Text>
                        </Stack>
                    }
                    withArrow
                    disabled={!iconMode}
                >
                    <RingProgress
                        size={45}
                        thickness={4}
                        label={
                            <Center>
                                <IconDatabase size={18} />
                            </Center>
                        }
                        sections={[
                            {
                                color: "orange",

                                value: 50,
                            },
                        ]}
                    />
                </Tooltip>
                {!iconMode ? (
                    <>
                        <Stack spacing={0}>
                            <Text size={"sm"} weight={"bold"}>
                                Total Storage Used
                            </Text>
                            <Text size={"xs"} color={"dimmed"}>
                                1.5 GB of 1 TB
                            </Text>
                        </Stack>
                    </>
                ) : null}
            </Group>
        </Navbar.Section>
    );
};

export default StatsSection;
