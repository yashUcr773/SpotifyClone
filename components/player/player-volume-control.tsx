"use client"

import { cn } from "@/lib/utils"
import { Slider } from "../ui/slider"
import TooltipWrapper from "../tooltip-wrapper"
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"


interface PlayerVolumeControlProps {
    className?: string
    volume: number,
    setVolume: (number: number) => void
}


export default function PlayerVolumeControl({ className, setVolume, volume }: PlayerVolumeControlProps) {

    const [valueBeforeMute, setValueBeforeMute] = useState(100)

    const handleChange = (newValue: number[]) => {
        setVolume(newValue[0])
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(valueBeforeMute)
        } else {
            setValueBeforeMute(volume)
            setVolume(0)
        }
    }

    return (

        <div className="flex w-full shrink-0 max-w-[120px]">
            <div className="flex items-center gap-2 w-full flex-col md:flex-row">
                {volume === 0 && (<VolumeX onClick={toggleMute} size={28} className="cursor-pointer"></VolumeX>)}
                {volume >= 1 && volume <= 34 && (<Volume onClick={toggleMute} size={28} className="cursor-pointer"></Volume>)}
                {volume >= 35 && volume <= 76 && (<Volume1 onClick={toggleMute} size={28} className="cursor-pointer"></Volume1>)}
                {volume >= 77 && (<Volume2 onClick={toggleMute} size={28} className="cursor-pointer"></Volume2>)}
                <TooltipWrapper label={volume + "%"}>
                    <Slider
                        defaultValue={[volume]}
                        value={[volume]}
                        max={100}
                        min={0}
                        step={1}
                        className={cn(className)}
                        onValueChange={handleChange}
                    />
                </TooltipWrapper>
            </div>
        </div>

    )
}