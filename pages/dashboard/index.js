import { useSession, getSession, signOut } from "next-auth/react"

export default function Dashboard() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }
    return (
        <>
            <div>You are logged in as {session.user.email}</div>
            <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
        </>
    )
}
