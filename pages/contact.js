import Head from 'next/head';
import styles from '../styles/Contact.module.css';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';

function Contact() {
    return (
        <>
            <Head>
                <title>Contact us &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="Contact Us / Chattanooga Unite - Veterans Resource Center" />
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
                        { <Image
                        src="/images/handshake.png"
                        alt="Picture of Veteran and civilian shaking hands."
                        width={300}
                        height={300}
                        priority
                        /> }
                    </div>
                        <h1 className="title">Contact Us</h1>
                        <p className="corners description_dark">Get in touch with us for any questions or support related to our resources for veterans. We're here to help and appreciate your service.</p>
                    </div>
                    <div className="blueBackground">
                        <div className="left">
                            <div className="white_decoration"> </div>
                            <div className="title_light"><h2>Visit us at:</h2></div>
                            <p className="description_light contact"><a href="maps:q=1 Sisken Plaza, Chattanooga, TN 30403">426 Market Street, Chattanooga, TN 37402</a></p>
                            <div className="title_light"><h2>Give us a call:</h2></div>
                            <p className="description_light contact"><a href="tel:4236341771">(423)756-2211</a></p>
                            <div className="title_light"><h2>For more information:</h2></div>
                            <p className="description_light">
                                Please call or e-mail for information about Chattanooga Unite or to request electronic copies of the Chattanooga Unite Veterans Resource Center brochure.<br></br><br></br>
                                All other inquiries, please dial 211
                            </p>
                        </div>
                        <div className="right">
                            <Image className="vetImg"
                                src="/images/contact page photo.png"
                                alt="Picture of a smiling veteran with hands behind his back."
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>

        </>

    )
}

export default Contact
