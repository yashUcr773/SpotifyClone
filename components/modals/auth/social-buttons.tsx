import { cn } from "@/lib/utils"

interface SocialButtonsProps {
    icon: React.ReactNode,
    isLoading: boolean,
    onClick: () => void
}

export default function SocialButtons({ isLoading, icon, onClick }: SocialButtonsProps) {
    return (
        <button
            disabled={isLoading}
            type="button"
            onClick={() => {!isLoading && onClick}}
            className={cn("inline-flex w-full justify-center rounded-md  px-4 py-2 text-gray-300 shadow-sm border border-gray-300 hover:bg-gray-700", isLoading && 'cursor-not-allowed')}>
            {icon}
        </button>
    )
}