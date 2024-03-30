"use client"

import { useRouter } from "next/navigation"
import queryString from "query-string"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/use-debounce"

export default function SearchInput() {

    const router = useRouter()
    const [value, setValue] = useState<string>("")
    const debouncedValue = useDebounce<string>(value, 500)

    useEffect(() => {
        const query = {
            title: debouncedValue
        }
        const url = queryString.stringifyUrl({
            url: '/search',
            query
        })
        router.push(url)
    }, [debouncedValue, router])

    return (
        <input
            className="text-white flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
            placeholder="What do you want to listen to?"
            value={value}
            onChange={(e) => setValue(e.target.value)}></input>
    )
}

