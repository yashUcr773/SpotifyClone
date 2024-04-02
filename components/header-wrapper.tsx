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

interface HeaderWrapperProps {
    children: React.ReactNode,
    className?: string
}

// TODO: Add some settings for user avatar
// My songs.
// Change name, avatar image
// logout
// upload songs
// edit songs?
// remove songs?


export default function HeaderWrapper({ children, className }: HeaderWrapperProps) {

    const { openModal } = useModal()
    const router = useRouter()

    const { isAuthenticated, session } = useIsAuthenticated()

    const handleLogout = async () => {
        signOut()
        toast.success('Logout successful!')
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
                <div className="flex justify-between items-center gap-x-4">
                    {isAuthenticated && (
                        <>
                            <Button onClick={handleLogout} className="px-6 py-4 text-base hover:scale-110" variant={'primary'}>
                                Logout
                            </Button>
                            <UserAvatar imageUrl={session?.data?.user?.image!}></UserAvatar>
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