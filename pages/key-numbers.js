import Head from 'next/head';
import NavBar from '../components/navbar'
import Footer from '../components/footer';
import styles from '../styles/KeyNum.module.css';
import Image from 'next/image';

function KeyNumbers() {
    return (
        <>
            <Head>
                <title>Key Numbers &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="Key Numbers / Chattanooga Unite - Veterans Resource Center" />
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
                <div className='container'>
                    <div className="grayBackgroundHead centered">
                        <div className="titleBackground">
                            { <Image
                            src="/images/handshake.png"
                            alt="Picture of Veteran with tiny house in the palm of his hand"
                            width={300}
                            height={300}
                            /> }
                        </div>
                        <h1 className="title">Key Number For Veterans</h1>
                        <p className="corners description_dark">Providing veterans with vital information to point them in the right direction in receiving the help they deserve.</p>
                    </div>

                    <div className="blueBackground">
                        <div className="left">
                            <div className="white_decoration"></div>
                            <div className="title_light"><h2>US Department of Veterans Affairs</h2></div>
                            <p className="description_light"><a className="link_light" href="https://www.va.gov/">www.va.gov</a></p>
                            <div className="title_light"><h2>National Homeless Veteran Call Center</h2></div>
                            <p className="description_light">
                                (877) 4AID VET<br></br>
                                (877) 424-3838
                            </p>
                            <div className="title_light"><h2>Veterans Crisis Line</h2></div>
                            <p className="description_light">
                                (800) 273-8255 PRESS 1<br></br>
                                Text: 838255<br></br>
                                Confidential chat at Veterans <a className="link_light" href="https://www.veteranscrisisline.net/">CrisisLine.net</a>
                            </p>
                            <div className="title_light"><h2>Georgia Department of Veterans Affairs</h2></div>
                            <p className="description_light">
                                Area Service Officers (706) 638-5544<br></br>
                                Regional Service Officers (706) 272-2355
                            </p>
                            <div className="title_light"><h2>Tennessee Department of Veterans Affairs</h2></div>
                            <p className="description_light">
                                VA Benefits Regional Office<br></br>
                                (800) 827-1000
                            </p>
                            <div className="title_light"><h2>Veterans Service Officers</h2></div>
                            <p className="description_light">
                                Bledsoe County (423) 447-6731<br></br>
                                Bradley County (423) 728-7100<br></br>
                                Bradley County (423) 728-7149<br></br>
                                Grundy County (931) 592-2178<br></br>
                                Hamilton County (423) 634-6488<br></br>
                                Meigs County (423) 334-1631<br></br>
                                McMinn County (423) 744-1644<br></br>
                                Polk County (423) 338-4546<br></br>
                                Rhea County (423) 775-7849<br></br>
                                Sequatchie County (423) 949-4094
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>

        </>

    )
}

export default KeyNumbers