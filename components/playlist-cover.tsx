import { useModal } from "@/hooks/use-modal"
import { cn } from "@/lib/utils"
import { Playlist } from "@prisma/client"
import { Music } from "lucide-react"

interface PlaylistCoverProps {
    playlist: Playlist
    iconSize: number
    coverSize: number
    className?: string
}

export default function PlaylistCover({ playlist, iconSize, coverSize, className }: PlaylistCoverProps) {
    const { openModal } = useModal()

    // TODO: Add a mashup of images in case playlist has songs
    return (
        <div onClick={() => { openModal('editPlaylist', { playlist }) }} className={cn(`bg-neutral-800 rounded-md flex items-center justify-center shadow-[0_0px_72px_4px_rgba(0,0,0,0.75)] h-8 w-8`, `h-${coverSize} w-${coverSize}`, className)}>
            <Music className="text-gray-400" size={iconSize}></Music>
        </div>
    )
}