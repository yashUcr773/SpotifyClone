import { cn } from "@/lib/utils"
import Link from "next/link"

interface SidebarNavigationProps {
    icon: React.ReactNode,
    label: string,
    active?: boolean,
    href: string
}

export default function SidebarNavigation({ icon, label, active, href }: SidebarNavigationProps) {
    return (
        <Link href={href} className={cn("flex flex-row h-auto items-center w-full gap-x-4 text-md font-bold cursor-pointer hover:text-white transition text-neutral-400 py-1", active && "text-white")}>
            {icon}
            <p className="truncate w-full">{label}</p>
        </Link>
    )
}