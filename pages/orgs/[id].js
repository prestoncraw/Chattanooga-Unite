import { useRouter } from 'next/router'
import NavBar from '../../components/navbar';
import Head from 'next/head';
import Router from 'next/router';


function Org({ data }) {
    const router = useRouter();

    const org_data = JSON.parse(data.data);


    if (org_data.length == 0) {
        return (
            <>
                <Head>
                    <title>Organization Not Found! &raquo; Chattanooga Unite - Veterans Resource Center</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta property="og:title" content= "Org Not Found / Chattanooga Unite - Veterans Resource Center" />
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
                    <h1>Organization Not Found</h1>
                    <a href='/find-help'>Find Organizations We Work With Here</a>
                </main>
            </>
        )
    }


    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running

    return (
        <>
            <Head>
                <title>{org_data[0].name} &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content={org_data[0].name + " / Chattanooga Unite - Veterans Resource Center"} />
                <meta
                    property="og:description"
                    content="Chattanooga Unite provides outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies for those in the Chattanooga area."
                />
                <meta
                    property="og:image"
                    content="https://pub-62dc534c19094cf6b30ce047dde383e3.r2.dev/unite.jpg"
                />
            </Head>

            <main>
                <NavBar />
                <h1>{org_data[0].name}</h1>
                <ul>
                    <li>
                        {org_data[0].address}
                    </li>
                    <li>
                        {org_data[0].contact_email}
                    </li>
                    <li>
                        {org_data[0].phone_number}
                    </li>
                    <li>
                        {org_data[0].website_url}
                    </li>

                </ul>
            </main>


        </>
    )

    // Render post...
}

export async function getServerSideProps(context) {
    const { service_id, county_id } = context.query;

    const res = await fetch(`http://localhost:3000/api/get-org?sp_id=${context.params.id}`);
    // const res2 = await fetch(`http://localhost:3000/api/metric-insert?service_id=${service_id}&county_id=${county_id}&service_provider_id=${context.params.id}`);
    const data = await res.json();

    return {
        props: { data }, // will be passed to the page component as props
    }
}



export default Org