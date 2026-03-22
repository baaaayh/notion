import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Notion",
  description:
    "A tool that connects everyday work into one space. It gives you and your teams AI tools—search, writing, note-taking—inside an all-in-one, flexible workspace.",
};

export default async function SignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="sign-layout h-full">{children}</div>;
}
