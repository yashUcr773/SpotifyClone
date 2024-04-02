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
import useAudioPlayer from "@/hooks/use-audio-player"
import AnimateSoundWaves from "./animate-sound-waves"
import { Edit, Trash } from "lucide-react"
import { useModal } from "@/hooks/use-modal"

interface SongListProps {
    songs: Song[]
    playlists: PlaylistWithSongsAndUsers[]
    playlist?: PlaylistWithSongsAndUsers
    className?: string
    showAddButton?: boolean
    showRemoveButton?: boolean
    forceShow?: boolean
    showDeleteButton?: boolean
    showEditButton?: boolean
}

export default function SongList({ songs, playlists, className, playlist, forceShow = false, showAddButton = false, showRemoveButton = false, showDeleteButton, showEditButton }: SongListProps) {

    const router = useRouter()
    const player = useAudioPlayer()
    const [isLoading, setIsLoading] = useState(false)
    const { openModal } = useModal()

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

    const playSongs = (song: Song) => {
        player.setAllSongs(songs)
        player.setActiveSong(song!)
        player.setActivePlaylist(playlist!)
    }

    const deleteSong = (song: Song) => {
        return openModal('deleteSong', { song })
    }

    const editSong = (song: Song) => {
        return openModal('editSong', { song })

    }

    return (
        <ScrollArea
            className={cn("flex flex-col gap-y-2 min-w-xl w-full bg-neutral-800/50 rounded-lg overflow-auto ", className)}>
            {songs.map((song: Song) => (
                (!playlist?.songs.some((playSong: Song) => song.id === playSong.id) || forceShow) &&
                (
                    <div key={song.id} className="flex items-center gap-x-4 w-full">
                        <div className="group flex w-full flex-row items-center justify-between hover:bg-neutral-700/90 rounded-lg p-2 pr-4">
                            <AnimateSoundWaves song={song} onClick={playSongs} animate={song.id === player.activeSong?.id}></AnimateSoundWaves>
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
                            <div className="gap-x-1 flex flex-row items-center justify-center h-fit w-fit">

                                {showDeleteButton && (
                                    <TooltipWrapper label="Delete Song">
                                        <Trash className="cursor-pointer" onClick={() => { deleteSong(song) }}></Trash>
                                    </TooltipWrapper>
                                )}
                                {showEditButton && (
                                    <TooltipWrapper label="Edit Song">
                                        <Edit className="cursor-pointer mt-[1px]" onClick={() => { editSong(song) }}></Edit>
                                    </TooltipWrapper>
                                )}
                            </div>
                        </div>
                    </div>
                )
            ))}
        </ScrollArea>
    )


}
