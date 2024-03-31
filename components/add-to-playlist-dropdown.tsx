"use client"
import { CheckCircle, CircleCheck, Plus, PlusCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { ScrollArea } from "./ui/scroll-area"
import SearchPlaylistItem from "./search/search-playlist-item"
import { Button } from "./ui/button"
import { PlaylistWithSongsAndUsers } from "@/types"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Song } from "@prisma/client"
import TooltipWrapper from "./tooltip-wrapper"

interface AddToPlaylistDropdownProps {
    playlists: PlaylistWithSongsAndUsers[]
    song: Song
}

export default function AddToPlaylistDropdown({ song, playlists }: AddToPlaylistDropdownProps) {

    const router = useRouter()

    const playlistsToUpdate: Record<string, boolean> = {}

    const onChange = (id: string, value: boolean) => {
        playlistsToUpdate[id] = value
    }

    const addToPlaylist = async (songId: string) => {
        const responses = await axios.post('/api/playlists/addSongs', { playlistsToUpdate, songId })
        router.refresh()
        forceCloseModal()
    }

    function forceCloseModal() {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }

    return (
        <DropdownMenu modal={false}>
            <TooltipWrapper label="Add to other Playlists">
                <DropdownMenuTrigger asChild>
                    {
                        playlists.some(playlist => playlist.songs.some(s => s.id === song.id)) ?
                            (
                                <button className="p-4 text-green-500 fill-green-500"><CircleCheck></CircleCheck></button>
                            ) :
                            (
                                <button className="p-4 text-white"><PlusCircle></PlusCircle></button>
                            )
                    }

                </DropdownMenuTrigger>
            </TooltipWrapper>
            <DropdownMenuContent side={'left'} className="flex flex-col bg-neutral-800 text-white shadow-lg border-neutral-400/50 rounded-lg px-4 py-2 overflow-hidden max-h-[360px]">
                <DropdownMenuLabel className="text-xs tracking-wide">Add to playlist</DropdownMenuLabel>
                <DropdownMenuItem className="flex gap-x-2 hover:bg-neutral-700/80 rounded-md cursor-pointer"><Plus></Plus> New playlist</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-neutral-400/50" />
                <div className="flex overflow-hidden">
                    <ScrollArea className="overflow-auto w-[280px] flex flex-col gap-y-2 pr-4">
                        {
                            playlists.map(playlist => (
                                <SearchPlaylistItem key={playlist.id} onChange={onChange} playlist={playlist} song={song}></SearchPlaylistItem>
                            ))
                        }
                    </ScrollArea>
                </div>
                <DropdownMenuSeparator className="bg-neutral-400/50" />
                <div className="flex items-center justify-between m-1">
                    <Button variant={"ghost"} onClick={forceCloseModal}>Cancel</Button>
                    <Button variant={'primary'} onClick={() => { addToPlaylist(song.id) }}>Done</Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}