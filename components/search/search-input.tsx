"use client"

import { useRouter } from "next/navigation"
import queryString from "query-string"
import { useEffect, useRef, useState } from "react"
import useDebounce from "@/hooks/use-debounce"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchInputProps {
    apiUrl: string,
    placeholder: string,
    className?: string
}

export default function SearchInput({ apiUrl, placeholder, className }: SearchInputProps) {

    const router = useRouter()
    const [value, setValue] = useState<string>("")
    const debouncedValue = useDebounce<string>(value, 500)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const query = {
            title: debouncedValue
        }
        const url = queryString.stringifyUrl({
            url: apiUrl,
            query
        })
        router.push(url)
    }, [debouncedValue, router])

    return (
        <div onClick={() => { inputRef?.current?.focus() }} className={cn("flex-row gap-x-1 items-center justify-center bg-neutral-700 text-white flex w-full rounded-md border border-transparent", className)}>
            <Search className="bg-transparent m-2 cursor-pointer" size={24}></Search>
            <input
                ref={inputRef}
                className="w-full h-full px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}></input>
            <X onClick={() => { setValue("") }} className="bg-transparent m-2 cursor-pointer" size={24}></X>
        </div>
    )
}

