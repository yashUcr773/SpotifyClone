import { Playlist } from "@prisma/client"
import { Music } from "lucide-react"

interface PlaylistCoverProps {
    playlist: Playlist
    iconSize: number
    coverSize: number
}

export default function PlaylistCover({ playlist, iconSize, coverSize }: PlaylistCoverProps) {

    // TODO: Add a mashup of images in case playlist has songs
    return (
        <div className={`h-${coverSize} w-${coverSize} bg-neutral-800 rounded-md flex items-center justify-center shadow-[0_0px_72px_4px_rgba(0,0,0,0.75)]`}>
            <Music className="text-gray-400" size={iconSize}></Music>
        </div>
    )
}