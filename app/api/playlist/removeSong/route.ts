import getCurrentUser from "@/app/server-actions/get-current-user"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const { playlistId, songId } = await req.json()

        const currentUser = await getCurrentUser()

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const response = await prisma.playlist.update({
            where: {
                id: playlistId,
                userId: currentUser.id
            },
            data: {
                songs: {
                    disconnect: {
                        id: songId
                    }
                }
            }
        })

        return NextResponse.json(response)
    } catch (e) {
        console.log(e)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}