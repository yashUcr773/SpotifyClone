import { cn } from "@/lib/utils";
import React from "react";

interface BoxWrapperProps {
    children: React.ReactNode
    className?: string
}
export default function BoxWrapper({ children, className }: BoxWrapperProps) {
    return (
        <div className={cn("bg-neutral-900 rounded-lg h-fit w-full", className)}>
            {children}
        </div>
    )
}