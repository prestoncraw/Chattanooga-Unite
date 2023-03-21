import { useRouter } from 'next/router'
import Head from 'next/head';

function Org({ data }) {
    const router = useRouter();

    const org_data = JSON.parse(data.data);

    return (
        <>
            <Head>
                <title>Edit Organization &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
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