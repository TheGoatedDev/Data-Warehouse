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
import { FC, useMemo } from "react";
import { trpcClient } from "@/libs/trpcClient";
import { get } from "http";

export const StatsSection: FC = () => {
    const theme = useMantineTheme();
    const iconMode = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const [animationParent] = useAutoAnimate();

    const getStorage = trpcClient.getStorage.useQuery();

    const usedStorage = useMemo(
        () => (getStorage.data ? getStorage.data?.usedStorage : 0),
        [getStorage.data]
    );

    const maxStorage = useMemo(
        () => (getStorage.data ? getStorage.data?.maxStorage : 0),
        [getStorage.data]
    );

    const percentage = useMemo(
        () =>
            getStorage.data
                ? (getStorage.data?.usedStorage / getStorage.data?.maxStorage) *
                  100
                : 0,
        [getStorage.data]
    );

    const storageText = useMemo(() => {
        return `${(usedStorage / 1000000000).toFixed(2)}GB / ${(
            maxStorage / 1000000000
        ).toFixed(2)}GB`;
    }, [maxStorage, usedStorage]);

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
                            <Text size={"xs"}>{storageText}</Text>
                        </Stack>
                    }
                    withArrow
                    disabled={!iconMode}
                    withinPortal
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

                                value: percentage,
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
                                {storageText}
                            </Text>
                        </Stack>
                    </>
                ) : null}
            </Group>
        </Navbar.Section>
    );
};

export default StatsSection;
