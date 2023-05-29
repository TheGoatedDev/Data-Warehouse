import { DashboardNavbar } from "@/components/dashboard/layout/DashboardNavbar";
import ComponentWithChild from "@/types/ComponentWithChild";
import { AppShell } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export const DashboardLayout: ComponentWithChild = ({ children }) => {
    const { status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn("google");
        }
    }, [status]);

    return <AppShell navbar={<DashboardNavbar />}>{children}</AppShell>;
};

export default DashboardLayout;
