import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/app/Providers";
import { type AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import SessionProviderWrapper from "@/components/base/SessionProviderWrapper";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notion",
  description:
    "A tool that connects everyday work into one space. It gives you and your teams AI tools—search, writing, note-taking—inside an all-in-one, flexible workspace.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions as AuthOptions);
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <SessionProviderWrapper session={session}>
            {children}
          </SessionProviderWrapper>
        </Providers>
      </body>
    </html>
  );
}
