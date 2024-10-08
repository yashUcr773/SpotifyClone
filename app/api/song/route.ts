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

export async function DELETE(req: Request) {
    try {

        const currentUser = await getCurrentUser()
        const { searchParams } = new URL(req.url)
        const songId = searchParams.get('songId')

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const deletedSong = await prisma.song.delete({
            where: {
                id: songId!,
                uploaderId: currentUser.id
            }
        })

        return NextResponse.json(deletedSong)
    } catch (e) {
        console.log(e)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try {

        const currentUser = await getCurrentUser()
        const body = await req.json()
        const { image_path, song_path, author, title, songId } = body

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const updatedSong = await prisma.song.update({
            where: {
                id: songId,
                uploaderId: currentUser.id
            },
            data: {
                image_path, song_path, title, author,
            }
        })

        return NextResponse.json(updatedSong)
    } catch (e) {
        console.log(e)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
