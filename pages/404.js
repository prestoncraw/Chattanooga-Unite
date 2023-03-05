import Head from "next/head"
import NavBar from "../components/navbar"

export default function Custom404() {
    return (
        <>
            <Head>
                <title>Page Not Found &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Chattanooga Unite provides outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies for those in the Chattanooga area."
                    key="desc"
                />
                <meta property="og:title" content="Page Not Found / Chattanooga Unite - Veterans Resource Center" />
                <meta
                    property="og:description"
                    content="Chattanooga Unite provides outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies for those in the Chattanooga area."
                />
                <meta
                    property="og:image"
                    content="/images/chattanooga-unite-logo.jpg"
                />
            </Head>
            <div>
                <NavBar/>
                <h1>Page Not Found!</h1>
            </div>
            
        </>
    )
}