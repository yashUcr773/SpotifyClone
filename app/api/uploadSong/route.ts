import getCurrentUser from "@/app/server-actions/get-current-user"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const currentUser = await getCurrentUser()
        const body = await req.json()
        const { image_path, song_path, author, title } = body

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const uploadedSong = await prisma.song.create({
            data: {
                image_path, song_path, title, author,
                uploader: {
                    connect: {
                        id: currentUser.id
                    }
                },
            }
        })

        return NextResponse.json(uploadedSong)
    } catch (e) {
        console.log(e)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
