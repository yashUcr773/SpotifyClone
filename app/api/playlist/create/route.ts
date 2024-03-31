import getCurrentUser from "@/app/server-actions/get-current-user"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const currentUser = await getCurrentUser()

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const user = await prisma.user.findFirst({
            where: {
                id: currentUser.id
            },
            include: {
                playlists: true
            }
        })

        const newPlaylist = await prisma.playlist.create({
            data: {
                name: 'My Playlist #' + (user?.playlists.length! + +1),
                user: {
                    connect: {
                        id: currentUser.id
                    }
                }
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
