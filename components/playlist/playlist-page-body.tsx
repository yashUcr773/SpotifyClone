"use client"
import { Song } from "@prisma/client";
import SongList from "../song-list";
import SearchInput from "../search/search-input";
import { PlaylistWithSongsAndUsers } from "@/types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PlaylistPageBody {
    params: {
        playlistId: string
    }
    songs: Song[],
    playlist: PlaylistWithSongsAndUsers,
    playlists: PlaylistWithSongsAndUsers[]
}

export default function PlaylistPageBody({ params, songs, playlist, playlists }: PlaylistPageBody) {

    const [showSearch, setShowSearch] = useState(false)

    useEffect(() => {
        if (playlist.songs.length <= 4) {
            setShowSearch(true)
        }
    }, [playlist])

    return (
        <div className="w-11/12 text-white flex flex-col gap-y-4 p-4 mx-auto" >
            <SongList forceShow songs={playlist.songs} playlists={playlists!} playlist={playlist} className={cn("h-fit bg-transparent", showSearch && "max-h-80")} showRemoveButton></SongList>

            {showSearch && (
                <>
                    <span className="text-2xl font font-semibold tracking-wide">Let&apos;s find something for your playlist</span>
                    <div className="w-full flex flex-col gap-y-2">
                        <SearchInput apiUrl={`/playlist/${params.playlistId}`} placeholder="Search for songs"></SearchInput>
                        <SongList songs={songs} playlists={playlists!} playlist={playlist} className="h-fit max-h-80 px-6 py-4" showAddButton></SongList>
                    </div>
                </>
            )}
        </div>
    )
}