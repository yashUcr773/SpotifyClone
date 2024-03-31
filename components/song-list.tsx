"use client"
import { Song } from "@prisma/client"
import MediaItem from "./media-item"
import { PlaylistWithSongsAndUsers } from "@/types"
import AddToPlaylistDropdown from "./add-to-playlist-dropdown"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { cn } from "@/lib/utils"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import TooltipWrapper from "./tooltip-wrapper"

interface SongListProps {
    songs: Song[]
    playlists: PlaylistWithSongsAndUsers[]
    playlist?: PlaylistWithSongsAndUsers
    className?: string
    showAddButton?: boolean
    showRemoveButton?: boolean
    forceShow?: boolean
}

export default function SongList({ songs, playlists, className, playlist, forceShow = false, showAddButton = false, showRemoveButton = false }: SongListProps) {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs Found!
            </div>
        )
    }

    const AddSongToPlaylist = async (playlistId: string, songId: string) => {
        try {
            setIsLoading(true)
            const responses = await axios.post('/api/playlist/addSong', { playlistId, songId })
            router.refresh()
            toast.success('Added Successfully!')
        } catch (e) {
            toast.error('Some Error Occured!')
        } finally {
            setIsLoading(false)
        }
    }

    const removeSongFromPlaylist = async (playlistId: string, songId: string) => {
        try {
            setIsLoading(true)
            const responses = await axios.post('/api/playlist/removeSong', { playlistId, songId })
            router.refresh()
            toast.success('Removed Successfully!')
        } catch (e) {
            toast.error('Some Error Occured!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ScrollArea
            className={cn("flex flex-col gap-y-2 w-full bg-neutral-800/50 rounded-lg overflow-auto", className)}>
            {songs.map((song: Song) => (
                (!playlist?.songs.some((playSong: Song) => song.id === playSong.id) || forceShow) &&
                (
                    <div key={song.id} className="flex items-center gap-x-4 w-full">
                        <div className="flex flex-1 flex-row items-center justify-between hover:bg-neutral-700/90 rounded-lg">
                            <MediaItem data={song}></MediaItem>
                            <AddToPlaylistDropdown playlists={playlists} song={song}></AddToPlaylistDropdown>
                            {showAddButton && (
                                <TooltipWrapper label="Add to Playlist">
                                    <Button disabled={isLoading} variant={'outline'} className="text-white rounded-full font-semibold flex gap-x-2" onClick={() => { AddSongToPlaylist(playlist?.id!, song.id) }}>
                                        Add
                                    </Button>
                                </TooltipWrapper>
                            )}
                            {showRemoveButton && (
                                <TooltipWrapper label="Remove from Playlist">
                                    <Button disabled={isLoading} variant={'outline'} className="text-white rounded-full font-semibold flex gap-x-2" onClick={() => { removeSongFromPlaylist(playlist?.id!, song.id) }}>
                                        Remove
                                    </Button>
                                </TooltipWrapper>
                            )}
                        </div>
                    </div>
                )
            ))}
        </ScrollArea>
    )


}
