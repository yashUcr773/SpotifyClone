"use client"
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
    data: Song
}

export default function MediaItem({ data }: MediaItemProps) {

    return (
        <div className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md">
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image src={data.image_path || ""} fill alt={data.title} className="object-cover" />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.title}</p>
                <p className="text-neutral-400 text-sm truncate">{data.author}</p>
            </div>
        </div>
    )
}