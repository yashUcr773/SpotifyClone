import getCurrentUser from "@/app/server-actions/get-current-user"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
    try {

        const { image_path, name, description, id } = await req.json()
        const currentUser = await getCurrentUser()

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const newPlaylist = await prisma.playlist.update({
            where: {
                id: id
            },
            data: {
                image_path, name, description
            }
        })

        return NextResponse.json(newPlaylist)
    } catch (e) {
        console.log(e)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const songs = await prisma.song.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(songs)
    } catch (e) {
        console.log(e)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
