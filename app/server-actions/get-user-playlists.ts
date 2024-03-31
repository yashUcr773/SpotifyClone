
import prisma from '@/lib/prisma'
import getSession from './get-session'

export default async function getUserPlaylists() {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!session?.user?.email || !user?.id) {
            return null
        }

        const playlists = await prisma.playlist.findMany({
            where: {
                userId: user.id
            },
            include: {
                songs: true,
                user:true
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        return playlists
    } catch (e) {
        return null
    }
}