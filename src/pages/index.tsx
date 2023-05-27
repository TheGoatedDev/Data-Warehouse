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
} from "@mantine/core";
import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { IconDatabase } from "@tabler/icons-react";

const IndexPage: NextPage = () => {
    const { status, data } = useSession();

    return (
        <AppShell
            header={
                <Header height={70} p="md" w={"100%"}>
                    <Container
                        fluid
                        h={"100%"}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
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
                            <Text size={"xl"} weight={"bold"}>
                                Data Warehouse
                            </Text>
                        </Group>
                        <Group align="center">
                            <Text
                                sx={(theme) => ({
                                    ":hover": {
                                        color: theme.colors.blue[6],
                                    },
                                })}
                                component={Link}
                                href={"/"}
                            >
                                Home
                            </Text>
                            <Text component={Link} href={"/features"}>
                                Features
                            </Text>
                        </Group>
                        <Button
                            component={Link}
                            href={"/dashboard"}
                            radius={"xl"}
                            variant="gradient"
                            gradient={{
                                from: "yellow",
                                to: "orange",
                                deg: -45,
                            }}
                        >
                            Open Web Client
                        </Button>
                    </Container>
                </Header>
            }
        >
            <Text>
                {status === "authenticated" ? (
                    <div>
                        Signed in as {data?.user?.email ?? "unknown"}
                        <button onClick={() => signOut()}>Sign out</button>
                    </div>
                ) : (
                    <button onClick={() => signIn("google")}>Sign in</button>
                )}
            </Text>
        </AppShell>
    );
};

export default IndexPage;
