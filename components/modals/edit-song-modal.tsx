"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import axios from "axios"
import { useModal } from "@/hooks/use-modal"
import toast from "react-hot-toast"
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";
import FormFileUploader from "@/components/form/form-file-uploader";
import { useRouter } from "next/navigation"


const formSchema = z.object({
    image_path: z.string().min(1, { message: 'Cover is required.' }),
    song_path: z.string().min(1, { message: 'Song is required.' }),
    author: z.string().min(1, { message: 'Author is required.' }),
    title: z.string().min(1, { message: 'Title is required.' }),
})

export default function EditSongModal() {

    const { openModal, isOpen, closeModal, type, data } = useModal();
    const isModalOpen = isOpen && type === 'editSong';
    const { song } = data;
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image_path: song?.image_path || "",
            song_path: song?.song_path || "",
            author: song?.author || "",
            title: song?.title || "",
        }
    });

    useEffect(() => {
        form.reset({
            image_path: song?.image_path || "",
            song_path: song?.song_path || "",
            author: song?.author || "",
            title: song?.title || "",
        })
    }, [song])

    const isLoading = loading || form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            await axios.patch('/api/song', { ...values, songId: song?.id })
            toast.success('Song Updated!');
            form.reset()
            handleClose()
            router.refresh()
        } catch (e) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        closeModal();
    }

    return (

        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="rounded-lg shadow bg-gray-800 overflow-hidden text-white border-none max-w-xl flex flex-col items-center justify-center">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">
                        Update Song
                    </DialogTitle>
                    <DialogDescription>Make changes to the song.</DialogDescription>
                </DialogHeader>

                <div className="flex justify-between items-center w-full max-w-md p-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                            <div className="space-y-4 px-5 flex flex-col items-center justify-center w-full">
                                <FormInput form={form} isLoading={isLoading} label='Song Name' name="title" placehoder="Song name"></FormInput>
                                <FormInput form={form} isLoading={isLoading} label='Author' name="author" placehoder="Song Author"></FormInput>
                                <div className="flex flex-col gap-2 xl:flex-row mt-32">
                                    <FormFileUploader endpoint="coverImages" form={form} label="Cover image" name="image_path" ></FormFileUploader>
                                    <FormFileUploader endpoint="audioFiles" form={form} label="Song file" name="song_path" ></FormFileUploader>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <Button type="button" disabled={isLoading} onClick={() => handleClose()} variant={'ghost'}>
                                    Cancel
                                </Button>
                                <Button disabled={isLoading} variant={'primary'}>
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