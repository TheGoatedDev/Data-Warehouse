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

const DashboardFilesPage: NextPage = () => {
    const { status, data } = useSession();

    return (
        <DashboardLayout>
            <Container size={"lg"}>
                <Title order={1}>Files</Title>
            </Container>
        </DashboardLayout>
    );
};

export default DashboardFilesPage;
