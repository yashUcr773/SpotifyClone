import { Song } from "@prisma/client";
import PlayButton from "./play-button";

interface AnimateSoundWavesProps {
    animate: boolean
    onClick: (song: Song) => void
    song: Song
}
export default function AnimateSoundWaves({ song, animate, onClick }: AnimateSoundWavesProps) {

    if (!animate) {
        return (
            <div className="w-12 h-12 shrink-0 flex flex-row items-center justify-center ">
                <div className='flex flex-row'>
                    <PlayButton onClick={() => { onClick(song) }} className="p-3"></PlayButton>
                </div>
            </div>
        )
    }

    const bars = Array.from({ length: 5 }, (_, index) => index);

    return (
        <div className="w-12 h-12 shrink-0 flex flex-row items-center justify-center ">
            <div className='flex flex-row gap-[2px] rotate-180 h-full'>
                {bars.map((bar, i) => (
                    <div key={i} className={'bar w-[4px] h-1 bottom-0 bg-green-700'}></div>
                ))}
            </div>
        </div>
    )

}