"use client"

import Image from "next/image"
import PlayButton from "./play-button"
import { Song } from "@prisma/client"
import useAudioPlayer from "@/hooks/use-audio-player"

interface SongItemProps {
    song: Song
    songs: Song[]
}
export default function SongItem({ song, songs }: SongItemProps) {

    const player = useAudioPlayer();
    const playSongs = () => {
        player.setActivePlaylist(undefined)
        player.setActiveSong(song)
        player.setAllSongs(songs)
    }

    return (
        <div
            className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 cursor-pointer  hover:bg-neutral-400/25 transition px-4 py-4">
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image className="object-cover" src={song.image_path || ""} fill alt={song.title} />
            </div>
            <div className="flex flex-col items-start w-full p-2 gap-y-1" >
                <p className="text-white font-medium truncate w-full tracking-wider">{song.title}</p>
                <p className="text-neutral-400 text-sm pb-2 truncate w-full">{song.author}</p>
            </div>
            <div className="absolute bottom-20 right-2">
                <PlayButton onClick={playSongs}></PlayButton>
            </div>
        </div>
    )
}