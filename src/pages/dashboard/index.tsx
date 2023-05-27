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
import DashboardLayout from "@/layouts/DashboardLayout";

const DashboardIndexPage: NextPage = () => {
    const { status, data } = useSession();

    return (
        <DashboardLayout>
            <Container size={"lg"}>
                <Title order={1}>Dashboard</Title>
                <Text size={"lg"} weight={500}>
                    Welcome to the dashboard, {data?.user?.name ?? "friend"}!
                </Text>
            </Container>
        </DashboardLayout>
    );
};

export default DashboardIndexPage;
