"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from "@/components/ui/form"
import FormInput from "@/components/form/form-input"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import FormFileUploader from "../form/form-file-uploader"
import axios from "axios"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    image_path: z.string().optional(),
    name: z.string().min(1, { message: 'Playlist name is required' }),
    description: z.string().optional(),
})

export default function EditPlaylistModal() {
    const { closeModal, isOpen, type, data } = useModal()
    const { playlist } = data
    const isModalOpen = isOpen && type === 'editPlaylist'
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image_path: playlist?.image_path,
            name: playlist?.name || "",
            description: playlist?.description,
        }
    })

    useEffect(() => {
        form.reset({
            image_path: playlist?.image_path,
            name: playlist?.name,
            description: playlist?.description,
        })
    }, [playlist])

    const isLoading = loading || form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)

            await axios.patch(`/api/playlist`, { ...values, id: playlist?.id })

            toast.success('Log in Successful!')
            router.refresh()
            form.reset()
            closeModal()
        } catch (e) {
            toast.error('Something went wrong!')
        }
        finally {
            setLoading(false)
        }
    }

    const handleModalClose = () => {
        closeModal();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
            <DialogContent className="rounded-lg shadow bg-gray-800 border-none overflow-hidden text-white w-4/5 max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl text-start">
                        Edit details
                    </DialogTitle>
                </DialogHeader>

                <div className="">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
                            <div className="flex flex-col md:flex-row gap-4">
                                <FormFileUploader endpoint="playlistImages" form={form} label="Cover Image" name="image_path"></FormFileUploader>
                                <div className="flex flex-col justify-between flex-1 gap-4">
                                    <FormInput type={'text'} form={form} isLoading={isLoading} label="Name" name="name" placehoder="Add a name"></FormInput>
                                    <FormInput type={'text'} form={form} isLoading={isLoading} label="Description" name="description" placehoder="Add an optional description"></FormInput>
                                </div>
                            </div>
                            <div className="flex items-end justify-end">
                                <Button disabled={isLoading} variant={'primary'} size={'lg'} className="rounded-full">
                                    Update
                                </Button>
                            </div>
                        </form>
                    </Form>

                </div>

            </DialogContent>
        </Dialog>
    )
}