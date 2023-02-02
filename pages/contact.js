import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NavBar from '../components/navbar';
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
                <div className={styles.grayBackgroundContact}>
                    <div className={styles.blue_decoration}></div>
                    <div className={styles.title_dark}>Contact Us</div><br></br>
                    <div className={styles.description_dark}>
                    <div className={styles.bold}><p>1 Siskin Plaza, Chattanooga, TN 37403</p></div>    
                    <div className={styles.bold}><p>(423) 634-1771</p></div>    
                    <div className={styles.bold}><p>infosetnvets@gmail.com</p></div>
                    <div className={styles.bold}><p>Please call or e-mail for information about the Coalition and Coalition Partnership, or to request electronic copies of the Southeast Tennessee Veterans Coalition brochure.</p></div>
                    <div className={styles.bold}><p>All other inquiries, please dial 211.</p></div>
                    </div>
                </div>
            </main>
            <Footer></Footer>

        </>

    )
}

export default Contact

