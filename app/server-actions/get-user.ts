
import prisma from '@/lib/prisma'
import getSession from './get-session'

export default async function getUser() {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                playlists: {
                    include: {
                        songs: true,
                        user: true
                    }
                },
                uploadedSongs: true
            }
        })

        return user
    } catch (e) {
        return null
    }
}