import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    try {

        const body = await req.json()
        const { email, firstname, password, lastname } = body

        if (!email || !firstname || !password || !lastname) {
            return new NextResponse('Missing info', { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({
            data: {
                email,
                name: `${firstname} ${lastname}`,
                hashedPassword
            }
        });

        return NextResponse.json(user)
    } catch (e) {
        console.log(e)
        return new NextResponse('Internal Server Error', { status: 500 })

    }
}