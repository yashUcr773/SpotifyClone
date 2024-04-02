"use client"

import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, Home, Search, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { useModal } from "@/hooks/use-modal"
import { signOut } from "next-auth/react"
import UserAvatar from "./user-avatar"
import toast from "react-hot-toast"
import useIsAuthenticated from "@/hooks/use-is-authenticated"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

interface HeaderWrapperProps {
    children: React.ReactNode,
    className?: string
}

export default function HeaderWrapper({ children, className }: HeaderWrapperProps) {

    const { openModal } = useModal()
    const router = useRouter()

    const { isAuthenticated, session } = useIsAuthenticated()

    const handleLogout = async () => {
        signOut()
        toast.success('Logout successful!')
    }

    const uploadSongs = async () => {
        router.push('/upload')
    }

    const myPage = async () => {
        router.push('/me')
    }

    return (
        <div className={cn("h-fit p-6", className)}>
            <div className="w-full mb-4 flex items-center justify-between">

                {/* Navigation icons visible in desktop view */}
                <div className="flex gap-x-2 items-center">
                    <button onClick={() => router.back()} className="p-0.5 rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <ChevronLeft size={28} className="stroke-white"></ChevronLeft>
                    </button>
                    <button onClick={() => router.forward()} className="p-0.5 rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <ChevronRight size={28} className="stroke-white"></ChevronRight>
                    </button>
                </div>

                {/* Login-logout */}
                <div className="flex flex-row justify-between items-center gap-x-4">
                    {isAuthenticated && (
                        <>
                            <Button onClick={handleLogout} className="px-6 py-4 text-base hover:scale-110" variant={'primary'}>
                                Logout
                            </Button>

                            <DropdownMenu >
                                <DropdownMenuTrigger className="outline-none flex flex-row items-center justify-center">
                                    <UserAvatar imageUrl={session?.data?.user?.image!}></UserAvatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side={'left'} sideOffset={10} className="mt-10 outline-none flex flex-col bg-neutral-800 text-white shadow-lg border-neutral-400/50 rounded-lg px-4 py-2 overflow-hidden max-h-[360px]">
                                    <DropdownMenuLabel className="text-base tracking-wide">Logged in as {session.data?.user?.email}</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-neutral-400/50" />
                                    <DropdownMenuItem className="flex gap-x-2 hover:bg-neutral-700/80 rounded-md cursor-pointer" onClick={myPage}>My Songs</DropdownMenuItem>
                                    <DropdownMenuItem className="flex gap-x-2 hover:bg-neutral-700/80 rounded-md cursor-pointer" onClick={uploadSongs}>Upload Songs</DropdownMenuItem>
                                    <DropdownMenuItem className="flex gap-x-2 hover:bg-neutral-700/80 rounded-md cursor-pointer">Edit Profile</DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-neutral-400/50" />
                                    <DropdownMenuItem className="flex gap-x-2 hover:bg-neutral-700/80 rounded-md cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>


                        </>
                    )}
                    {!isAuthenticated && (
                        <>
                            <div>
                                <Button onClick={() => { openModal('signup') }} className="text-neutral-300 text-base font-bold hover:scale-110 hover:text-neutral-200 hover:no-underline" variant={"link"}>
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => { openModal('signin') }} className="px-6 py-4 text-base hover:scale-110" variant={'primary'}>
                                    Log in
                                </Button>
                            </div>
                        </>

                    )}
                </div>

            </div>
            {children}
        </div >
    )
}