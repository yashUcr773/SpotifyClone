"use client"

import BoxWrapper from "@/components/box-wrapper"

export default function Error() {
    return (
        <BoxWrapper className="h-full flex items-center justify-center  text-white">
            <div>
                The page you are looking for does not exist.
            </div>
        </BoxWrapper>
    )
}