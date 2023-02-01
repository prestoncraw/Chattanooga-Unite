import Head from 'next/head';
import NavBar from '../components/navbar'
import Footer from '../components/footer';

function Contact() {
    return (
        <>
            <Head>
                <title>Contact us &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
            <NavBar/>
                <div>Welcome to the Contact page</div>
                <Footer/>
            </main>

        </>

    )
}

export default Contact


