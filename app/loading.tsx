"use client"

import BoxWrapper from "@/components/box-wrapper"
import { Loader2 } from "lucide-react"



export default function Loader() {
    return (
        <BoxWrapper className="h-full flex items-center justify-center text-green-500">
            <div>
                <Loader2 className="animate-spin" size={40}></Loader2>
            </div>
        </BoxWrapper>
    )
} 