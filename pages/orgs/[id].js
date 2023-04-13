import { useRouter } from 'next/router'
import NavBar from '../../components/navbar';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/footer';
import styles from '../../styles/FindHelp.module.css';
import { services, counties } from "../../lib/services-provided";


function Org({ data }) {
    const router = useRouter();

    const org_data = JSON.parse(data.data)[0];
    // console.log(org_data);


    if (org_data === undefined) {
        return (
            <>
                <Head>
                    <title>Organization Not Found &raquo; Chattanooga Unite - Veterans Resource Center</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta property="og:title" content="Org Not Found / Chattanooga Unite - Veterans Resource Center" />
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
                                    priority
                                />}
                            </div>
                            <h1 className="title red-text">Organization Not Found</h1>
                            <Link href='/find-help'><button className="btn_outline_dark">View Orgs <i className="fa-solid fa-arrow-right"></i></button></Link>
                        </div>

                    </div>
                </main>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{org_data.name + " » Chattanooga Unite - Veterans Resource Center"}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content={org_data.name + " / Chattanooga Unite - Veterans Resource Center"} />
                <meta
                    property="og:description"
                    content={org_data.description + " Chattanooga Unite provides outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies for those in the Chattanooga area."}
                />
                <meta
                    property="og:image"
                    content="/images/chattanooga-unite-logo.jpg"
                />
            </Head>

            {/* <main>
                <NavBar />
                <h1>{org_data.name}</h1>
                <ul>
                    <li>
                        {org_data.address}
                    </li>
                    <li>
                        {org_data.contact_email}
                    </li>
                    <li>
                        {org_data.phone_number}
                    </li>
                    <li>
                        {org_data.website_url}
                    </li>

                </ul>
            </main> */}
            <main>
                <NavBar />
                <div className="container">
                    <div className="grayBackgroundHead centered">
                        <div className="titleBackground">
                            {<Image
                                src="/images/handshake.png"
                                alt="Picture of Veteran and civilian shaking hands."
                                width={900}
                                height={300}
                                priority
                            />}
                        </div>
                        <h1 className="title">{org_data.name}</h1>

                    </div>
                    <div className="blueBackground">
                        <div className="left">
                            <div className="white_decoration"></div>
                            <h1 className="title_light">About Us</h1><br></br>
                            <p className="description_light">{org_data.description}</p><br></br>

                        </div>
                        <div className="right">
                            <Image className="logoImg"
                                src="/images/placeholder-logo.png"
                                alt={"Logo of " + org_data.name}
                                width={300}
                                height={300}
                            />
                        </div>
                        <div className='left'>
                            <h2 className='title_light'>
                                Contact Us
                            </h2><br />
                            {/* {(org_data.website_url != null && org_data.contact_email != null && org_data.contact_phone_number != null && org_data.address != null) && (
                                <h2 className='title_light'>
                                Contact Us
                            </h2><br />
                            )} */}

                            {org_data.website_url != null && (
                                <p className='description_light'>
                                    🖥️ {org_data.website_url}
                                </p>

                            )}

                            {org_data.contact_email != null && (
                                <p className='description_light'>
                                    📧 {org_data.contact_email}
                                </p>

                            )}
                            {org_data.contact_phone_number != null && (
                                <p className='description_light'>
                                    ☎️ {org_data.contact_phone_number}
                                </p>

                            )}
                            {org_data.address != null && (
                                <p className='description_light'>
                                    🗺️ {org_data.address}
                                </p>

                            )}



                        </div>

                    </div>
                    <div className="grayBackground">
                        <div className="right">
                            <div className="blue_decoration"></div>
                            <h1 className="title_dark">Services & Area Served</h1>
                            <div className="title_dark"><h2>Counties We Serve</h2></div>
                            <div className={styles.itemList}>
                                {counties.map(county => <div className={styles.select_box} key={county.id} ><div className={styles.select_box_img}><svg viewBox={"0 0 " + county.svg_w + " " + county.svg_h}><path d={county.svg_path}></path><title>{county.alt}</title></svg></div><div className={styles.select_box_text}>{county.name}</div></div>)}

                            </div>
                            <div className="title_dark"><h2>Service Areas</h2></div>
                            <div className={styles.itemList}>
                                {services.map(s => <div className={styles.select_box} key={s.id} ><div className={styles.select_box_img}><div className={s.icon}></div></div><div className={styles.select_box_text}>{s.title}</div></div>)}
                            </div>

                        </div>
                    </div>
                    <Link href='/find-help'><button className="btn_outline_dark">All Providers <i className="fa-solid fa-arrow-right"></i></button></Link>

                </div>
            </main>

            <Footer />


        </>
    )

    // Render post...
}

export async function getServerSideProps(context) {
    const { service_id, county_id } = context.query;

    const res = await fetch(`http://localhost:3000/api/get-org?sp_id=${context.params.id}`);
    // const res2 = await fetch(`http://localhost:3000/api/metric-insert?service_id=${service_id}&county_id=${county_id}&service_provider_id=${context.params.id}`);

    const data = await res.json();
    // console.log(data);

    return {
        props: { data }, // will be passed to the page component as props
    }
}



export default Org