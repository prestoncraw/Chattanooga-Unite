import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
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
                <NavBar/>
                <div className={styles.grayBackground}>
                        <div className={styles.blue_decoration}></div>
                        <div className={styles.title_dark}>Your DD214</div>
                        <br></br>
                        <div className={styles.call_text}>
                            <div className={styles.bold}>To access information and services, your DD214 is vital.</div>
                            <div className={styles.bold}>For help in getting a copy of your DD214, call the Veteran Service Officer
                                for your county, or you may contact the Department of Veteran Affairs:</div>
                            <br></br>
                            <div className={styles.bold}>VA Regional Office (423) 634-7125</div>
                            <a href="url">
                            <div className={styles.bold}>www.archives.gov/veterans/military-service-records/</div>
                            </a>
                        </div>
                        <Image
                            src="/images/call211.png"
                            alt="Call United Way 211"
                            height={256}
                            width={240}
                        />                  
                </div>
                <Footer/>
            </main>

        </>

    )
}

export default YourDD214
