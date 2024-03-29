import prisma from "@/lib/prisma";
import { Song } from "@/types";

export default async function getSongs(): Promise<Song[]> {
    try {
        const songs = await prisma.song.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return (songs as any) || []
    } catch (error) {
        console.log(error)
        return []
    }
}