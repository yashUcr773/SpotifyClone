"use client"

import { Play } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

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
        <button onClick={onClick} className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
            <div className="relative min-h-[64px] min-w-[64px]">
                {/* TODO: ADD hook to use liked image for liked playlist and create own covers using songs */}
                <Image className="object-cover" fill src={image} alt="Image"></Image>
            </div>
            <p className="font-medium truncate py-4 text-bold text-white text-lg">{name}</p>
            <div className="transition absolute opacity-0 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md right-4 group-hover:opacity-100 hover:scale-110">
                <Play size={24} className="text-black fill-black"></Play>
            </div>
        </button>
    )
}