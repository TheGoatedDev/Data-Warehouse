import { AppShell, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const IndexPage: NextPage = () => {
    const { status, data } = useSession();

    return (
        <AppShell>
            <Title>Data Warehouse</Title>
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
