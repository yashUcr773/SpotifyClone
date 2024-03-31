
import prisma from '@/lib/prisma'
import getSession from './get-session'

export default async function getPlaylist(playlistId: string) {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }

        const playlist = await prisma.playlist.findUnique({
            where: {
                id: playlistId
            },
            include: {
                user: true,
                songs: true
            }
        })

        if (!playlist) {
            return null
        }

        return playlist
    } catch (e) {
        return null
    }
}