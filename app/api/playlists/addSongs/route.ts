import getCurrentUser from "@/app/server-actions/get-current-user"
import prisma from "@/lib/prisma"
import { Playlist } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const { playlistsToUpdate, songId } = await req.json()

        const currentUser = await getCurrentUser()

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const promises: Promise<Playlist>[] = []

        Object.keys(playlistsToUpdate).forEach(playlistId => {
            if (playlistsToUpdate[playlistId] === true) {
                promises.push(
                    prisma.playlist.update({
                        where: {
                            id: playlistId,
                            userId: currentUser.id
                        },
                        data: {
                            songs: {
                                connect: {
                                    id: songId
                                }
                            }
                        }
                    })
                )
            } else {
                promises.push(
                    prisma.playlist.update({
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
                )
            }
        })

        const responses = await Promise.allSettled(promises)

        return NextResponse.json(responses)
    } catch (e) {
        console.log(e)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}