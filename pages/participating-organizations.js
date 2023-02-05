import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NavBar from '../components/navbar'
import Footer from '../components/footer';
import Link from 'next/link';

function ParticipatingOrganizations() {
    return (
        <>
            <Head>
                <title>Participating Organizations &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <NavBar/>
                <div className={styles["grayBackground"] + " " + styles["centered"]}>
                    <h1 className={styles.title}>Participating Organizations <span className={styles.red}><i className="fa-solid fa-star"></i></span><br></br></h1>
                    <p className={styles.sub_text_centered}>
                    Southeast Tennessee Veterans Coalition is a United Way funded program.
                        </p>
                        <Link href="/find-help"><button className={styles.btn_outline_dark}>Find Help<i className="fa-solid fa-arrow-right"></i></button></Link>
                        </div>
                <div className={styles["blueBackground"] + " " + styles["centered"]}>
                    <div className={styles["col1"]}>
                    <p className={styles.text_centered}>Access One</p>
                    <p className={styles.text_centered}>Aid and Assist at home</p>
                    <p className={styles.text_centered}>AIM Center</p>
                    <p className={styles.text_centered}>Alexian Brothers PACE</p>
                    <p className={styles.text_centered}>Alexian Brothers Senior Neighbors</p>
                    <p className={styles.text_centered}>Alexian Brothers Valley</p>
                    <p className={styles.text_centered}>All Care Health Services</p>
                    <p className={styles.text_centered}>Allison Senior Living</p>
                    <p className={styles.text_centered}>Alzheimer's Association</p>
                    <p className={styles.text_centered}>American Legion Post 159 - Hixson</p>
                    <p className={styles.text_centered}>American Red Cross of Southeast Tennessee</p>
                    <p className={styles.text_centered}>Avalon Hospice</p><br></br>
                    <p className={styles.text_centered}>Battlefield of Life Ministries</p>
                    <p className={styles.text_centered}>Brand New Day Outreach Ministries</p>
                    <p className={styles.text_centered}>Buffalo Valley</p>
                    <p className={styles.text_centered}>CARIS Healthcare</p>
                    <p className={styles.text_centered}>Bradley County (423) 728-7100</p>
                    <p className={styles.text_centered}>CARTA Care-A-Van</p>
                    <p className={styles.text_centered}>Catholic Charities</p>
                    <p className={styles.text_centered}>Celebrate Recovery</p>
                    <p className={styles.text_centered}>Center for Non-Profits Chattanooga</p>
                    <p className={styles.text_centered}>Chambliss, Bahner & Stophel</p>
                    <p className={styles.text_centered}>Grundy County (931) 592-2178</p>
                    <p className={styles.text_centered}>Hamilton County (423) 634-6488</p><br></br>
                    </div>
                        </div>
                <Footer/>
            </main>

        </>

    )
}

export default ParticipatingOrganizations