import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { trpcClient } from "@/libs/trpcClient";
import { RouterTransition } from "@/components/shared/RouterTransition";
import { Notifications } from "@mantine/notifications";

function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Data Warehouse</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    primaryColor: "orange",
                    /** Put your mantine theme override here */
                    colorScheme: "dark",
                }}
            >
                <SessionProvider session={pageProps.session}>
                    <RouterTransition />
                    <Notifications />
                    <Component {...pageProps} />
                </SessionProvider>
            </MantineProvider>
        </>
    );
}

export default trpcClient.withTRPC(App);
