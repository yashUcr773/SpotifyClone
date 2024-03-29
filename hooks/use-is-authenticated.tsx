import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useIsAuthenticated() {
    const session = useSession()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (session.status === 'authenticated') {
            setIsAuthenticated(true)
        }
    }, [session])

    return { isAuthenticated, session }
}
