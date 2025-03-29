import ResponsiveAppBar from "../_components/LayoutComponent/navbar";
export default function DashboardLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <ResponsiveAppBar />
            <div className="m-5 p-5 bg-white rounded-md">
                {children}
            </div>
        </>
    );
}
