interface AnimateSoundWavesProps {
    animate: boolean
}
export default function AnimateSoundWaves({ animate }: AnimateSoundWavesProps) {

    if (!animate) {
        return <div className="h-16 w-16 mx-2"></div>
    }

    const bars = Array.from({ length: 5 }, (_, index) => index);

    return (
        <div className='flex flex-row gap-[2px] h-8 w-16 rotate-180 mx-2'>
            {bars.map(bar => (
                <div className={'bar w-[4px] h-1 bottom-0 bg-green-700'}></div>
            ))}
        </div>
    )

}