"use client"

import { Song } from "@prisma/client"
import SongItem from "./song-item"

interface PageContentProps {
    songs: Song[]
}

export default function PageContent({ songs }: PageContentProps) {

    if (songs.length == 0) {
        return (
            <div className="mt-4 text-neutral-400"><p>No Songs Available!</p></div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-2 mt-4">
            {songs.map((song: Song) => <SongItem key={song.id} song={song} songs={songs}></SongItem>)}
        </div>
    )
}