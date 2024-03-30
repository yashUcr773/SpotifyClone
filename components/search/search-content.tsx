"use client"
import { Song } from "@/types"
import MediaItem from "../media-item"

interface SearchContentProps {
    songs: Song[]
}
export default function SearchContent({ songs }: SearchContentProps) {


    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs Found!
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song: Song) => <div key={song.id} className="flex items-center gap-x-4 w-full">
                <div className="flex-1">
                    <MediaItem data={song}></MediaItem>
                </div>
            </div>)}
        </div>
    )
}