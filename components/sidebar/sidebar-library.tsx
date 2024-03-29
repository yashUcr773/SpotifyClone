"use client"

import SpotifyPlaylistIcon from "@/Icons/SpotifyPlaylistIcon"
import { Plus } from "lucide-react"
import TooltipWrapper from "../tooltip-wrapper"


export default function SidebarLibrary() {
    const onClick = () => {
        // TODO: Add create playlist modal
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-6 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <SpotifyPlaylistIcon size={24} className="text-neutral-400 stroke-neutral-400 fill-neutral-400"></SpotifyPlaylistIcon>
                    <p className="text-neutral-400 font-medium text-md">Your Library</p>
                </div>
                <TooltipWrapper align="center" side="top" label="Create Playlist">
                    <Plus onClick={onClick} size={20} className="text-neutral-400 cursor-pointer hover:text-white transition"></Plus>
                </TooltipWrapper>
            </div>
        </div>
    )
}