import { Song } from "@/types";
import getSongs from "./get-songs";
import prisma from "@/lib/prisma";

export default async function getSongsByTitle(title: string): Promise<Song[]> {

    if (!title) {
        return getSongs();
    }

    try {
        const songs = await prisma.song.findMany({
            where: {
                title: { contains: title, mode: 'insensitive' }
            },
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