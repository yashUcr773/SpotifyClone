"use client"

import SpotifyPlaylistIcon from "@/Icons/SpotifyPlaylistIcon"
import { Loader, Plus } from "lucide-react"
import TooltipWrapper from "../tooltip-wrapper"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-modal"
import { useState } from "react"
import toast from "react-hot-toast"
import SidebarLibraryPlaylistItem from "./sidebar-library-playlist-item"
import { ScrollArea } from "../ui/scroll-area"
import { PlaylistWithSongsAndUsers } from "@/types"
import useIsAuthenticated from "@/hooks/use-is-authenticated"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
interface SidebarLibraryProps {
    playlists: PlaylistWithSongsAndUsers[]
}
// TODO: Add toggle to minimize and maximize the library on click. Show playlist covers in case of minimize
export default function SidebarLibrary({ playlists }: SidebarLibraryProps) {

    const router = useRouter()
    const { openModal } = useModal()
    const { isAuthenticated, session } = useIsAuthenticated()
    const [creatingPlaylist, setCreatingPlaylist] = useState(false)

    const createPlaylist = async () => {

        if (creatingPlaylist) {
            return
        }

        if (!isAuthenticated) {
            return openModal('signin')
        }

        try {
            setCreatingPlaylist(true)
            const res = await axios.post('/api/playlist/create',{})
            router.push(`/playlist/${res.data.id}`)
            toast.success('Playlist created!')
            forceCloseModal()
        } catch (e) {
            console.log(e)
            toast.error('Some error occured!')
        } finally {
            setCreatingPlaylist(false)
        }
    }

    function forceCloseModal() {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
    return (
        <div className="flex flex-col overflow-hidden h-full w-full">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div onClick={createPlaylist} className="flex items-center justify-between px-6 pt-4 cursor-pointer">
                        <div className="inline-flex items-center gap-x-2">
                            <SpotifyPlaylistIcon size={24} className="text-neutral-400 stroke-neutral-400 fill-neutral-400"></SpotifyPlaylistIcon>
                            <p className="text-neutral-400 font-medium text-md hidden md:block">Your Library</p>
                        </div>
                        <TooltipWrapper align="center" side="top" label="Create Playlist">
                            {creatingPlaylist ? (
                                <Loader size={20} className="text-neutral-400 cursor-pointer hover:text-white transition animate-spin"></Loader>
                            ) : (
                                <Plus size={20} className="text-neutral-400 cursor-pointer hover:text-white transition"></Plus>
                            )}
                        </TooltipWrapper>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side={'left'} className="flex flex-col bg-neutral-800 text-white shadow-lg border-neutral-400/50 rounded-lg px-4 py-2 overflow-hidden max-h-[360px]">
                    <DropdownMenuLabel className="text-lg tracking-wide">Create new Playlist</DropdownMenuLabel>
                    <div className="flex items-center justify-between m-1">
                        <Button disabled={creatingPlaylist} variant={"ghost"} onClick={forceCloseModal} >Cancel</Button>
                        <Button disabled={creatingPlaylist} variant={'ghost'} onClick={() => { createPlaylist() }}>Create</Button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            <ScrollArea className="mt-8 h-fit overflow-y-auto">
                {playlists.map(playlist => (
                    <SidebarLibraryPlaylistItem key={playlist.id} playlist={playlist}></SidebarLibraryPlaylistItem>
                ))}
            </ScrollArea>
        </div>
    )
}