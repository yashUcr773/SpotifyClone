"use client"

import { PlaylistWithSongsAndUsers } from "@/types"
import PlaylistCover from "../playlist-cover"
import TooltipWrapper from "../tooltip-wrapper"
import { Edit, Trash } from "lucide-react"
import { useModal } from "@/hooks/use-modal"
import PlayButton from "../play-button"
import useAudioPlayer from "@/hooks/use-audio-player"

interface PlaylistPageHeaderProps {
    playlist: PlaylistWithSongsAndUsers
}

// TODO: Make bg color same as max color of cover
export default function PlaylistPageHeader({ playlist }: PlaylistPageHeaderProps) {

    const { openModal } = useModal()
    const player = useAudioPlayer()

    const playSongs = () => {
        player.setAllSongs(playlist.songs)
        player.setActiveSong(playlist.songs[0])
        player.setActivePlaylist(playlist!)
    }


    return (
        <div className="min-h-[144px] relative  px-4 py-2 mb-2 flex flex-row gap-x-4 mt-16 group  cursor-pointer" >
            <PlaylistCover playlist={playlist} iconSize={64} coverSize={36}></PlaylistCover>
            <div onClick={() => { openModal('editPlaylist', { playlist }) }} className="flex flex-col gap-y-4 justify-end">
                <span className="text-white text-sm">Playlist</span>
                <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-semibold">{playlist?.name}</h1>
                <span className="text-white text-xs">{playlist.description}</span>
                <span className="text-white text-xs">{playlist.user.name}  {playlist.songs.length > 0 ?? " . " + playlist.songs.length + " Songs"}</span>
            </div>
            <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 top-0 right-0">
                <TooltipWrapper label="Edit">
                    <Edit size={24} onClick={() => { openModal('editPlaylist', { playlist }) }} className="cursor-pointer ml-auto  text-white transition"></Edit>
                </TooltipWrapper>
                <TooltipWrapper label="Delete">
                    <Trash size={24} onClick={() => { openModal('deletePlaylist', { playlist }) }} className="cursor-pointer ml-auto  text-white transition"></Trash>
                </TooltipWrapper>
            </div>
            <PlayButton className="opacity-75 absolute bottom-0 right-0" onClick={playSongs}></PlayButton>
        </div>
    )
}