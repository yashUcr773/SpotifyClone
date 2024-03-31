"use client"

import { AudioLines, X } from 'lucide-react'
import Image from 'next/image'

import { UploadDropzone } from "@/lib/uploadthing"
// import "@uploadthing/react/styles.css"

interface FileUploaderProps {
    endpoint: "coverImages" | "audioFiles" | "playlistImages"
    value: string
    onChange: (url?: string) => void
}

export default function FileUploader({ endpoint, onChange, value }: FileUploaderProps) {

    const fileType = value?.split('.').pop()

    if (value && fileType !== 'mp3') {
        return (
            <div className='relative h-48 w-48 m-4'>
                <Image fill src={value} alt="Upload" className='rounded-full'></Image>
                <button onClick={() => onChange("")} className='bg-rose-500 text-white p-1 rounded-full absolute top-4 right-4 shadow-sm' type='button'>
                    <X className='h-4 w-4'></X>
                </button>
            </div>
        )
    }

    if (value && fileType === 'mp3') {
        return (
            <div className='relative flex flex-col items-center p-2 rounded-md bg-background/10 m-4'>
                <AudioLines className='h-16 w-16 text-white fill-white stroke-white'></AudioLines>
                <a href={value} target='_blank' rel="noopener noreferrer" className='text-sm hover:underline text-white truncate  max-w-24'>
                    {value}
                </a>
                <button onClick={() => onChange("")} className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm' type='button'>
                    <X className='h-4 w-4'></X>
                </button>
            </div>
        )
    }


    return (
        <UploadDropzone config={{ mode: 'auto' }} endpoint={endpoint} onClientUploadComplete={(res) => {
            onChange(res?.[0].url)
        }} onUploadError={(error: Error) => {
            console.log(error)
        }} appearance={{
            container: { padding: '4px', paddingTop: '36px', outline:'none' }, label: { color: 'white', fontWeight: '400' }, allowedContent: { color: 'white' }
        }}>

        </UploadDropzone>
    )
}