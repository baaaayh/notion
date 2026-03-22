import type { Metadata } from "next";
import "@/styles/globals.css";
import ResizableLayout from "@/components/layout/ResizableLayout";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarStoreProvider } from "@/store/SidebarStoreProvider";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Notion",
  description:
    "A tool that connects everyday work into one space. It gives you and your teams AI tools—search, writing, note-taking—inside an all-in-one, flexible workspace.",
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("sidebar-storage")?.value;

  let initialWidth = 240;
  if (cookieValue) {
    try {
      initialWidth = JSON.parse(cookieValue).state.width;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      initialWidth = 240;
    }
  }

  return (
    <SidebarStoreProvider initialWidth={initialWidth}>
      <div className="app-layout h-full">
        <ResizableLayout sidebar={<Sidebar />}>{children}</ResizableLayout>
      </div>
    </SidebarStoreProvider>
  );
}
