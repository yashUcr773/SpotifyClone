"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import PlayButton from "./play-button"
import { PlaylistWithSongsAndUsers } from "@/types"
import useAudioPlayer from "@/hooks/use-audio-player"
import PlaylistCover from "./playlist-cover"

interface PlaylistItemProps {
    playlist: PlaylistWithSongsAndUsers,
}

export default function PlaylistItem({ playlist }: PlaylistItemProps) {

    const router = useRouter()
    const player = useAudioPlayer()
    const onClick = () => {
        router.push(`/playlist/${playlist.id}`)
    }

    const playSongs = () => {
        player.setAllSongs(playlist?.songs!)
        player.setActiveSong(playlist.songs[0])
        player.setActivePlaylist(playlist!)
    }


    return (
        <div className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
            <div onClick={onClick} className="relative min-h-[64px] min-w-[64px] cursor-pointer">
                <PlaylistCover playlist={playlist} iconSize={16} coverSize={16}></PlaylistCover>
            </div>
            <p onClick={onClick} className="font-medium truncate py-4 text-bold text-white text-lg cursor-pointer">{playlist.name}</p>
            <div className="absolute right-4 ">
                <PlayButton onClick={playSongs} ></PlayButton>
            </div>
        </div>
    )
}