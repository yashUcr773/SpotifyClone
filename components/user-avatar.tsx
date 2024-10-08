'use client'
import Image from "next/image";

interface AvatarProps {
    imageUrl: string
}

export default function UserAvatar({ imageUrl }: AvatarProps) {

    return (
        <div className="relative inline-block rounded-full overflow-hidden size-10 border-2 border-black cursor-pointer outline-none">
            <Image src={imageUrl || "/images/placeholder.jpg"} alt="avatar" fill></Image>
        </div>
    )
}