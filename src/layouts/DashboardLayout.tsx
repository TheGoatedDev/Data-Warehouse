import { DashboardNavbar } from "@/components/dashboard/layout/DashboardNavbar";
import ComponentWithChild from "@/types/ComponentWithChild";
import { AppShell } from "@mantine/core";

export const DashboardLayout: ComponentWithChild = ({ children }) => {
    return <AppShell navbar={<DashboardNavbar />}>{children}</AppShell>;
};

export default DashboardLayout;
