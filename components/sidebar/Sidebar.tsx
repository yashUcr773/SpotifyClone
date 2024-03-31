"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Home, Search, Upload } from "lucide-react";
import SidebarLibrary from "./sidebar-library";
import SidebarNavigation from "./sidebar-navigation";
import BoxWrapper from "../box-wrapper";
import { PlaylistWithSongsAndUsers } from "@/types";

interface SidebarProps {
    playlists: PlaylistWithSongsAndUsers[]
}

export default function Sidebar({ playlists }: SidebarProps) {

    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            icon: <Home></Home>,
            label: 'Home',
            active: pathname === '/',
            href: '/'
        },
        {
            icon: <Search></Search>,
            label: 'Search',
            active: pathname === '/search',
            href: '/search'
        },
        {
            icon: <Upload></Upload>,
            label: 'Upload',
            active: pathname === '/upload',
            href: '/upload'
        }
    ], [pathname])

    return (
        <aside className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[320px] p-2">
            <BoxWrapper>
                <nav className="flex flex-col gap-y-4 px-6 py-4">
                    {routes.map((route) => <SidebarNavigation key={route.label} {...route}></SidebarNavigation>)}
                </nav>
            </BoxWrapper>
            <BoxWrapper className="flex overflow-hidden h-full w-full">
                <SidebarLibrary playlists={playlists} />
            </BoxWrapper>
        </aside>
    )
}