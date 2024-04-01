"use client"
import useAudioPlayer from "@/hooks/use-audio-player";
import MediaItem from "../media-item";
import { useState } from "react";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { PlaylistWithSongsAndUsers } from "@/types";
import AddToPlaylistDropdown from "../add-to-playlist-dropdown";
import PlayerControl from "./player-control";
import PlayerVolumeControl from "./player-volume-control";

interface PlayerContentProps {
    playlists: PlaylistWithSongsAndUsers[]
}

export default function PlayerContent({ playlists }: PlayerContentProps) {

    const player = useAudioPlayer()
    const [volume, setVolume] = useState(100)


    if (!player.activeSong) {
        return null
    }

    return (
        <div className="flex flex-row items-center justify-between text-white px-4 h-full w-full gap-2 md:gap-4">

            <div className="flex w-fit items-center">
                <div className="flex items-center">
                    <div className="max-w-[120px] md:max-w-full">

                    <MediaItem data={player.activeSong!}></MediaItem>
                    </div>
                    <AddToPlaylistDropdown playlists={playlists} song={player.activeSong}></AddToPlaylistDropdown>
                </div>
            </div>

            <PlayerControl volume={volume}></PlayerControl>

            <PlayerVolumeControl volume={volume} setVolume={setVolume}></PlayerVolumeControl>

        </div>
    )
}