import Head from 'next/head';
import NavBar from '../components/navbar'
import Footer from '../components/footer';

function KeyNumbers() {
    return (
        <>
            <Head>
                <title>Key Numbers &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <NavBar/>
                <div>Welcome to the Key Numbers page</div>
                <Footer/>
            </main>

        </>

    )
}

export default KeyNumbers