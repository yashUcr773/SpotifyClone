"use client"

import { useRouter } from "next/navigation"
import React from "react"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, Home, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderWrapperProps {
    children: React.ReactNode,
    className?: string
}

export default function HeaderWrapper({ children, className }: HeaderWrapperProps) {
    const router = useRouter()

    const handleLogout = async () => {
        // TODO: ADD LOGOUT
    }


    return (
        <div className={cn("h-fit p-6", className)}>
            <div className="w-full mb-4 flex items-center justify-between">

                {/* Navigation icons visible in desktop view */}
                <div className="hidden md:flex gap-x-2 items-center">
                    <button onClick={() => router.back()} className="p-0.5 rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <ChevronLeft size={28} className="stroke-white"></ChevronLeft>
                    </button>
                    <button onClick={() => router.forward()} className="p-0.5 rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <ChevronRight size={28} className="stroke-white"></ChevronRight>
                    </button>
                </div>

                {/* Navigation icons in mobile view */}
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center hover:opacity-75 transition">
                        <Home className="text-black" size={20}></Home>
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center hover:opacity-75 transition">
                        <Search className="text-black" size={20}></Search>
                    </button>
                </div>

                {/* Login-logout */}
                <div className="flex justify-between items-center gap-x-4">
                    <div>
                        <Button className="text-neutral-300 text-base font-bold hover:scale-110 hover:text-neutral-200 hover:no-underline" variant={"link"}>
                            Sign up
                        </Button>
                    </div>
                    <div>
                        <Button className="px-6 py-4 text-base hover:scale-110" variant={'primary'}>
                            Log in
                        </Button>
                    </div>
                </div>

            </div>
            {children}
        </div >
    )
}