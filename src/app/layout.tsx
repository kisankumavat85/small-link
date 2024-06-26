import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Bungee_Shade } from "next/font/google";
import { getServerSession } from "next-auth";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/shared/layout";
import SessionProvider from "@/providers/session-provider";
import { authOptions } from "@/lib/auth";
import "./globals.css";

const bungee = Bungee_Shade({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
});

const inter = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Small Link",
  description: "The simplest URL shortener you were waiting for",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={cn(
            "svgBg font-sans antialiased dark h-dvh",
            bungee.variable,
            inter.variable
          )}
        >
          <Layout>{children}</Layout>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
