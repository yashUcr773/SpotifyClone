"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Hash, Mic, Video } from "lucide-react"
import queryString from "query-string"
import { useModal } from "@/hooks/use-modal"
import toast from "react-hot-toast"

export default function DeleteChannelModal() {

    const [isLoading, setIsLoading] = useState(false);

    const { openModal, isOpen, closeModal, type, data } = useModal();
    const isModalOpen = isOpen && type === 'deletePlaylist';
    const { playlist } = data;
    const router = useRouter()

    const handleClose = () => {
        closeModal();
    }

    const handleDelete = async () => {
        try {
            setIsLoading(true)

            await axios.post('/api/playlist/delete', { playlistId: playlist?.id })

            // TODO: Deleted playlist is not updated in sidebar.
            handleClose()
            toast.success('Playlist deleted!')
            router.push(`/`)

        } catch (e) {
            console.log(e)
            toast.error('Some error occured!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="rounded-lg shadow bg-gray-800 border-none overflow-hidden text-white w-4/5 max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Playlist
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Are you sure you want to do this?
                        <br></br>
                        <span className="font-semibold text-red-500 align-middle text-base">{playlist?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="px-6 py-4 ">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={() => handleClose()} variant={'ghost'}>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={() => handleDelete()} variant={'primary'}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}