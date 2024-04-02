"use client"
import { Song } from "@prisma/client";
import Image from "next/image";
import TooltipWrapper from "./tooltip-wrapper";

interface MediaItemProps {
    data: Song
}

export default function MediaItem({ data }: MediaItemProps) {

    return (
        <div className="flex items-center gap-x-3 cursor-pointer w-full p-2 rounded-md">
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image src={data.image_path || ""} fill alt={data.title} className="object-cover" />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <TooltipWrapper label={data.title}>
                    <p className="text-white truncate">{data.title}</p>
                </TooltipWrapper>
                <p className="text-neutral-400 text-sm truncate">{data.author}</p>
            </div>
        </div>
    )
}