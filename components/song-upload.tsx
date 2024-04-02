"use client"
import FormInput from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import FormFileUploader from "@/components/form/form-file-uploader";
import * as z from 'zod';
import useIsAuthenticated from "@/hooks/use-is-authenticated";
import { useModal } from "@/hooks/use-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const formSchema = z.object({
    image_path: z.string().min(1, { message: 'Cover is required.' }),
    song_path: z.string().min(1, { message: 'Song is required.' }),
    author: z.string().min(1, { message: 'Author is required.' }),
    title: z.string().min(1, { message: 'Title is required.' }),
})

export default function SongUpload() {

    const [loading, setLoading] = useState(false)
    const { isAuthenticated, session } = useIsAuthenticated()
    const { openModal } = useModal()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image_path: "",
            song_path: "",
            author: "",
            title: "",
        }
    });

    const isLoading = loading || form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        if (!isAuthenticated) {
            return openModal('signup')
        }
        try {

            setLoading(true);
            await axios.post('/api/song', values);
            toast.success('Song Uploaded!');
            form.reset()
        } catch (e) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {!isAuthenticated && (
                <div className="flex flex-1 flex-col items-center justify-center w-full h-full -mt-24">
                    <h3 className="text-white text-2xl font-semibold mb-8">
                        <span className="underline cursor-pointer" onClick={() => { openModal('signup') }}>Signup</span>
                        &nbsp; or &nbsp;
                        <span className="underline cursor-pointer" onClick={() => { openModal('signup') }}>Signin</span>
                        &nbsp;to start Uploading
                    </h3>
                </div>
            )}

            {isAuthenticated && (
                <div className="flex flex-1 flex-col items-center justify-center w-full h-full -mt-24">
                    <h3 className="text-white text-2xl font-semibold mb-8">Upload your favourite songs</h3>
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
                                <div className="w-full flex items-center justify-center">
                                    <Button disabled={isLoading} variant={'primary'} size={'lg'} className="rounded-full">
                                        Upload
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            )}
        </>

    )
}