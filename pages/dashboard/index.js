import { useSession, getSession, signOut } from "next-auth/react"
import { useState, useEffect } from "react";
// import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import SPPreview from "../../components/sp-preview";

export default function Dashboard({data}) {
    const { data: session, status } = useSession();

    const [userData, setUserData] = useState(JSON.parse(data.data)[0])

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }
    return (
        <>
            <div>You are logged in as {session.user.email}</div>
            <a href={"/dashboard/org/"+ userData.id}>Edit your Organization</a>
            {/* <SPPreview key={userData.id} provider={userData} /> */}
            <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res);
    console.log(session.user.email);
    const res = await fetch(`http://localhost:3000/api/get-sp?sp_email=${session.user.email}`);
    const data = await res.json();

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            session,
            data
        },
    }
}