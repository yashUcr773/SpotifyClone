import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/config";

export default async function getSession() {
    const session = await getServerSession(authOptions);
    return session
}