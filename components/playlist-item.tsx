"use client"

import { Play } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import PlayButton from "./play-button"

interface PlaylistItemProps {
    image: string,
    name: string,
}

export default function PlaylistItem({ image, name }: PlaylistItemProps) {

    const router = useRouter()
    const onClick = () => {
        // TODO: implement onclick to go to playlist

    }


    return (
        <div onClick={onClick} className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
            <div className="relative min-h-[64px] min-w-[64px]">
                {/* TODO: ADD hook to use liked image for liked playlist and create own covers using songs */}
                <Image className="object-cover" fill src={image} alt="Image"></Image>
            </div>
            <p className="font-medium truncate py-4 text-bold text-white text-lg">{name}</p>
            <div className="absolute right-4 ">
                <PlayButton></PlayButton>
            </div>
        </div>
    )
}