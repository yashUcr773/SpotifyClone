"use client"

import SigninModal from "@/components/modals/auth/signin-modal"
import SignupModal from "@/components/modals/auth/signup-modal"
import { useEffect, useState } from "react"

export default function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <SigninModal />
            <SignupModal />
        </>
    )
}