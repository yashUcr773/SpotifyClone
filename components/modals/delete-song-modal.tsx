"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import queryString from "query-string"
import { useModal } from "@/hooks/use-modal"
import toast from "react-hot-toast"
import MediaItem from "../media-item"

export default function DeleteSongModal() {

    const [isLoading, setIsLoading] = useState(false);

    const { openModal, isOpen, closeModal, type, data } = useModal();
    const isModalOpen = isOpen && type === 'deleteSong';
    const { song } = data;
    const router = useRouter()

    const handleClose = () => {
        closeModal();
    }

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const url = queryString.stringifyUrl({
                url: '/api/song',
                query: {
                    songId: song?.id
                }
            })
            await axios.delete(url)

            // TODO: Deleted playlist is not updated in sidebar.
            handleClose()
            router.refresh()
            toast.success('Song deleted!')

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
                        Delete Song
                    </DialogTitle>
                    <DialogDescription className="text-center flex flex-col items-center justify-center">
                        Are you sure you want to do this?
                        <br></br>
                        The following song will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <MediaItem data={song!}></MediaItem>
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