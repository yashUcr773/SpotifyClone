"use client"
import { PlaylistWithSongsAndUsers } from "@/types"
import PlaylistCover from "../playlist-cover"
import { Checkbox } from "../ui/checkbox"
import { Song } from "@prisma/client"
import { useState } from "react"

interface SearchPlaylistItemProps {
    playlist: PlaylistWithSongsAndUsers
    song: Song
    onChange: (id: string, value: boolean) => void
}

export default function SearchPlaylistItem({ playlist, onChange, song }: SearchPlaylistItemProps) {

    const [initialState, setInitialState] = useState(!!playlist.songs.some(s => s.id === song.id))

    const handleChange = (checked: boolean) => {
        setInitialState(c => !c)
        return onChange(playlist.id, checked)
    }

    return (
        <div className="hover:bg-neutral-700/50 flex flex-row p-1 rounded-lg items-center justify-between mr-8 w-full">
            <div className="flex flex-row gap-x-2 items-center  w-48">
                <PlaylistCover coverSize={8} playlist={playlist} iconSize={16} className="shadow-xl bg-neutral-700 shrink-0"></PlaylistCover>
                <span className="truncate text-sm">{playlist.name}</span>
            </div>
            <Checkbox className="bg-neutral-300 " onCheckedChange={handleChange} checked={initialState}></Checkbox>
        </div>
    )
}