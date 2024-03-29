"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TooltipWrapperProps {
    label: string,
    children: React.ReactNode
    side?: "top" | "right" | "bottom" | "left"
    align?: "start" | "center" | "end"
}

export default function TooltipWrapper({ label, children, side, align }: TooltipWrapperProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align} className="bg-neutral-700 border-none shadow">
                    <p className="font-semibold text-sm capitalize text-white tracking-wider" >{label.toLowerCase()}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}