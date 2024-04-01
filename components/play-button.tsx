import { cn } from "@/lib/utils";
import { FaPlay } from "react-icons/fa";

interface PlayButtonProps {
    className?: string
    onClick: () => void
}

export default function PlayButton({ className, onClick }: PlayButtonProps) {

    return (
        <button onClick={onClick} className={cn("transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110", className)}>
            <FaPlay className="text-black"></FaPlay>
        </button>
    )

}