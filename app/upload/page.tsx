"use client"
import FormInput from "@/components/form-input";
import HeaderWrapper from "@/components/header-wrapper";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from 'zod';
import FileUploader from "@/components/file-uploader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    image_path: z.string().min(1, { message: 'Cover is required.' }),
    song_path: z.string().min(1, { message: 'Song is required.' }),
    author: z.string().min(1, { message: 'Author is required.' }),
    title: z.string().min(1, { message: 'Title is required.' }),
})

export default function UploadPage() {

    const [loading, setLoading] = useState(false)

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
        <ScrollArea className="bg-neutral-900 rounded-lg h-full w-full overflow-y-auto flex flex-col">
            <HeaderWrapper className="bg-gradient-to-b from-orange-800 pb-40">
                <div className="mb-2">
                    <h1 className="text-white text-3xl font-semibold">Upload some of your favourites</h1>
                </div>
            </HeaderWrapper>

            <div className="flex flex-1 flex-col items-center justify-center w-full h-full -mt-24">
                <h3 className="text-white text-2xl font-semibold mb-8">Upload your favourite songs</h3>
                <div className="flex justify-between items-center w-full max-w-md p-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                            <div className="space-y-4 px-5 flex flex-col items-center justify-center w-full">
                                <FormInput form={form} isLoading={isLoading} label='Song Name' name="title" placehoder="Song name"></FormInput>
                                <FormInput form={form} isLoading={isLoading} label='Author' name="author" placehoder="Song Author"></FormInput>
                                <div className="flex flex-col gap-2 xl:flex-row mt-32">
                                    <FormField control={form.control} name="image_path" render={({ field }) => (
                                        <FormItem className="flex flex-col items-center justify-center flex-1 bg-gray-700 rounded-lg cursor-pointer p-2">
                                            <FormLabel className={cn("capitalize test-xs font-medium text-zinc-50 mb-2", !field.value && '-mb-10')}>cover image</FormLabel>
                                            <FormControl>
                                                <FileUploader endpoint="coverImages" value={field.value} onChange={field.onChange}></FileUploader>
                                            </FormControl>
                                            <FormMessage></FormMessage>

                                        </FormItem>
                                    )}></FormField>

                                    <FormField control={form.control} name="song_path" render={({ field }) => (
                                        <FormItem className="flex flex-col items-center justify-center flex-1 bg-gray-700 rounded-lg cursor-pointer p-2">
                                            <FormLabel className={cn("capitalize test-xs font-medium text-zinc-50  mb-2", !field.value && '-mb-10')}>song file</FormLabel>
                                            <FormControl>
                                                <FileUploader endpoint="audioFiles" value={field.value} onChange={field.onChange}></FileUploader>
                                            </FormControl>
                                            <FormMessage></FormMessage>

                                        </FormItem>
                                    )}></FormField>
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

        </ScrollArea>
    );
}