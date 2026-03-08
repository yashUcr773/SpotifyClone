import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { cn } from "@/lib/utils";
import Player from "@/components/player/player";
import Sidebar from "@/components/sidebar/side";
import ModalProvider from "@/providers/modal-provider";
import ToasterProvider from "@/providers/toaster-provider";
import NextAuthProvider from "@/providers/next-auth-provider";
import getUserPlaylists from "./server-actions/get-user-playlists";
import RegisterSW from "@/components/register-sw";

const font = localFont({
    src: '../public/fonts/font.woff2'
})

export const metadata: Metadata = {
    title: "Spotify Clone",
    description: "Listen to your favorite songs",
    manifest: "/manifest.json",
    themeColor: "#1DB954",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Spotify Clone",
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const playlists = await getUserPlaylists()
    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" href="/images/icon-192x192.png" />
            </head>
            <body className={font.className}>
                <NextAuthProvider>
                    <RegisterSW />
                    <ToasterProvider></ToasterProvider>
                    <ModalProvider></ModalProvider>
                    <div className={cn('flex h-[calc(100%-88px)]')}>
                        <Sidebar playlists={playlists!}></Sidebar>
                        <main className="h-full flex-1 overflow-y-auto py-2 pr-2">
                            {children}
                        </main>
                    </div>
                    <div>
                        <Player playlists={playlists!}></Player>
                    </div>
                </NextAuthProvider>
            </body>
        </html>
    );
}
