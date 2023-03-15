import { useRouter } from 'next/router'
import Head from 'next/head';

function Org({ data }) {
    const router = useRouter();

    const org_data = JSON.parse(data.data);

  

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
                <h1>{org_data[0].name}</h1>
                <a href="/dashboard">Back to dashboard</a>
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
    const res = await fetch(`http://localhost:3000/api/get-org?sp_id=${context.params.id}`);
    const data = await res.json();

    return {
        props: { data }, // will be passed to the page component as props
    }
}



export default Org