import Head from 'next/head';
import NavBar from '../components/navbar'
import Footer from '../components/footer';

function YourDD214() {
    return (
        <>
            <Head>
                <title>Your DD214 &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <NavBar />
                <div>Welcome to the Your DD214 page</div>
                <Footer />
            </main>

        </>

    )
}

export default YourDD214
