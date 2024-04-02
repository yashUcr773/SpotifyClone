import useAudioPlayer from "@/hooks/use-audio-player"
import { useModal } from "@/hooks/use-modal"
import { cn } from "@/lib/utils"
import { PlaylistWithSongsAndUsers } from "@/types"
import { Music } from "lucide-react"
import Image from "next/image"

interface PlaylistCoverProps {
    playlist: PlaylistWithSongsAndUsers
    iconSize: number
    coverSize: number
    className?: string
    suppressModal?: boolean
}


const roundedMap: Record<number, string> = {
    0: 'rounded-tl-lg',
    1: 'rounded-tr-lg',
    2: 'rounded-bl-lg',
    3: 'rounded-br-lg',
}

export default function PlaylistCover({ playlist, iconSize, coverSize, className, suppressModal = false }: PlaylistCoverProps) {
    const { openModal } = useModal()
    const player = useAudioPlayer()

    if (playlist.songs.length >= 1 && playlist.songs.length < 4) {
        return (
            <div className={cn("flex flex-row flex-wrap rounded-lg", `h-${coverSize} w-${coverSize}`, player.activePlaylist?.id === playlist.id && "border-2 border-green-500",)}>
                <div className={cn("flex flex-col rounded-lg")}>
                    <img src={playlist.songs[0].image_path} alt="cover" className={cn("h-full w-full rounded-lg")}></img>
                </div>
            </div>
        )
    }

    if (playlist.songs.length >= 4) {
        return (
            <div className={cn("flex flex-row flex-wrap  rounded-lg", `h-${coverSize} w-${coverSize}`, player.activePlaylist?.id === playlist.id && "border-2 border-green-500",)}>
                {playlist.songs.map((song, i) => i < 4 && (
                    <div key={song.id} className={cn("flex flex-col rounded-lg", `h-1/2 w-1/2`)}>
                        <img  src={song.image_path} alt="cover" className={cn("h-full w-full", roundedMap[i])}></img>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div onClick={() => { !suppressModal && openModal('editPlaylist', { playlist }) }}
            className={cn(`bg-neutral-800 rounded-md flex items-center justify-center shadow-[0_0px_72px_4px_rgba(0,0,0,0.75)] h-8 w-8`,
                `h-${coverSize} w-${coverSize}`, player.activePlaylist?.id === playlist.id && "border-2 border-green-500", className)}>
            <Music className="text-gray-400" size={iconSize}></Music>
        </div>
    )
}