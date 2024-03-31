"use client"
import { Song } from "@prisma/client"
import MediaItem from "../media-item"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react"

interface SearchContentProps {
    songs: Song[]
    className?: string,
}
export default function SearchContent({ songs, className }: SearchContentProps) {

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs Found!
            </div>
        )
    }

    const addToPlaylist = () => {

    }

    // TODO: Add scroll area here maybe?
    return (

        <div className="flex flex-col gap-y-2 w-full px-6 py-4 bg-neutral-800/50 rounded-lg">
            {songs.map((song: Song) => <div key={song.id} className="flex items-center gap-x-4 w-full">
                <div className="flex flex-1 flex-row justify-between hover:bg-neutral-700/90 rounded-lg">
                    <MediaItem data={song}></MediaItem>
                    <button onClick={() => { addToPlaylist() }} className="p-4 text-white"><PlusCircle></PlusCircle></button>
                </div>
            </div>)}
        </div>
    )
}
