"use client"

import { useEffect, useRef, useState } from "react"
import PlayerSeekbarControl from "./player-seekbar-control"
import { Song } from "@prisma/client";
import useAudioPlayer from "@/hooks/use-audio-player";
import { Pause, Play, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerControlProps {
    volume: number
}


export default function PlayerControl({ volume }: PlayerControlProps) {

    const player = useAudioPlayer()
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [shuffle, setShuffle] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume])

    useEffect(() => {
        playSong()
    }, [player.activeSong])

    const seekbarChangeHandler = (newValue: number[]) => {
        const seekTime = newValue[0];
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
        }
        setCurrentTime(seekTime);
    }

    const handlePlayerTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    }

    const playNext = () => {
        if (player.songs.length === 0) {
            return
        }

        const currentIndex = player.songs.findIndex((id) => id === player.activeSong)
        const nextSong = player.songs[currentIndex + 1]
        if (!nextSong) {
            return player.setActiveSong(player.songs[0])
        }
        return player.setActiveSong(nextSong)
    }

    const playPrev = () => {
        if (player.songs.length === 0) {
            return
        }

        const currentIndex = player.songs.findIndex((id) => id === player.activeSong)
        const prevSong = player.songs[currentIndex - 1]
        if (!prevSong) {
            return player.setActiveSong(player.songs[player.songs.length - 1])
        }
        return player.setActiveSong(prevSong)
    }

    const playSong = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true)
        }
    }

    const pauseSong = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false)
        }
    }
    const formatTime = (seconds: number) => {
        let minutes = Math.round(Math.floor(seconds / 60))
        let remainingSeconds = Math.round(seconds % 60);
        // Add leading zero if necessary
        let nminutes = minutes < 10 ? '0' + minutes : minutes;
        let nremainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
        return nminutes + ':' + nremainingSeconds;
      }


    return (
        <div className="h-full flex p-2 flex-col items-center w-full gap-y-1  shrink-0 max-w-[240px] md:max-w-[360px] lg:max-w-[480px]">
            <div className="flex flex-row gap-2 items-center justify-center">
                <Shuffle size={20} onClick={() => { setShuffle(v => !v) }} className={cn('text-white cursor-pointer', shuffle && 'text-green-500')}></Shuffle>
                <SkipBack size={20} onClick={playPrev} className="cursor-pointer"></SkipBack>
                <div className="p-3 rounded-full bg-green-500 cursor-pointer">
                    {!isPlaying && (<Play size={20} className="text-black fill-black cursor-pointer" onClick={playSong}></Play>)}
                    {isPlaying && (<Pause size={20} className="text-black fill-black cursor-pointer" onClick={pauseSong}></Pause>)}
                </div>
                <SkipForward size={20} onClick={playNext} className="cursor-pointer"></SkipForward>
            </div>
            <div className="w-full">
                <audio
                    ref={audioRef}
                    src={player.activeSong?.song_path}
                    onTimeUpdate={handlePlayerTimeUpdate}
                    onEnded={() => playNext()}
                />
                <div className="flex flex-row gap-x-2 items-center justify-center">
                    <span className="w-14">
                        {formatTime(audioRef.current?.currentTime!)}
                    </span>
                    <PlayerSeekbarControl
                        value={currentTime}
                        seekbarChangeHandler={seekbarChangeHandler}
                        className=""
                    ></PlayerSeekbarControl>
                    <span className="w-14">
                        {formatTime(audioRef.current?.duration!)}
                    </span>
                </div>
            </div>

        </div>
    )
}