import Head from 'next/head';
import NavBar from '../components/navbar'
import Footer from '../components/footer';

function ParticipatingOrganizations() {
    return (
        <>
            <Head>
                <title>Participating Organizations &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <NavBar/>
                <div>Welcome to the participating organizations page</div>
                <Footer/>
            </main>

        </>

    )
}

export default ParticipatingOrganizations