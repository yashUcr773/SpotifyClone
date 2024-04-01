"use client"

import { cn } from "@/lib/utils"
import { Slider } from "../ui/slider"
import TooltipWrapper from "../tooltip-wrapper"


interface PlayerSeekbarControlProps {
    className?: string
    seekbarChangeHandler?: (value: number[]) => void
    value: number
}


export default function PlayerSeekbarControl({ value, seekbarChangeHandler, className }: PlayerSeekbarControlProps) {
    return (
        <>
            <TooltipWrapper label={Math.round(value) + "%"}>
                <Slider
                    defaultValue={[value]}
                    value={[value]}
                    max={100}
                    step={1}
                    className={cn(className)}
                    onValueChange={seekbarChangeHandler}
                />
            </TooltipWrapper>
        </>
    )
}