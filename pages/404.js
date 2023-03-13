import Head from "next/head";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import Image from "next/image";
import Link from "next/link";

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
            <main>
                <NavBar />
                <div className="container">
                    <div className="grayBackgroundHead centered">
                        <div className="titleBackground">
                            {<Image
                                src="/images/handshake.png"
                                alt="Picture of Veteran and civilian shaking hands."
                                width={300}
                                height={300}
                            />}
                        </div>
                        <h1 className="title red-text">Page Not Found!</h1>
                        <p className="corners description_dark">The requested URL did not match a page on our site. Please check your URL and try again or navigate using the above links.</p>
                        <Link href='/find-help'><button className="btn_outline_dark">Find Help <i className="fa-solid fa-arrow-right"></i></button></Link>
                    </div>

                </div>
            </main>
            <Footer />

        </>
    )
}