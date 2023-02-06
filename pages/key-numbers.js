import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NavBar from '../components/navbar'
import Footer from '../components/footer';
import Link from 'next/link';

function KeyNumbers() {
    return (
        <>
            <Head>
                <title>Key Numbers &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <NavBar/>
                <div className={styles["grayBackground"] + " " + styles["centered"]}>
                    <h1 className={styles.title}>Key Number For Veterans <span className={styles.red}><i className="fa-solid fa-star"></i></span><br></br></h1>
                    <p className={styles["corners"] + " " + styles["contact_description"] + styles.sub_text_centered}>
                        Our mission is to provide outreach to all military service persons including Veterans and their families by creating partnerships between VA providers and local agencies.
                        </p>
                        <Link href="/find-help"><button className={styles.btn_outline_dark}>Find Help<i className="fa-solid fa-arrow-right"></i></button></Link>
                        </div>
                <div className={styles["blueBackground"] + " " + styles["centered"]}>
                    <p className={styles.sub_title_text_centered}>NATIONAL HOMELESS VETERAN CALL CENTER</p>
                    <p className={styles.text_centered}>(877) 4AID VET</p>
                    <p className={styles.text_centered}>(877) 424-3838</p><br></br>
                    <p className={styles.sub_title_text_centered}>VETERANS CRISIS LINE </p>
                    <p className={styles.text_centered}>(800) 273-8255 PRESS 1</p>
                    <p className={styles.text_centered}>Text: 838255</p>
                    <p className={styles.text_centered}>Confidential chat at VeteransCrisisLine.net</p><br></br>
                    <p className={styles.sub_title_text_centered}>GEORGIA DEPARTMENT OF VETERANS AFFAIRS </p>
                    <p className={styles.text_centered}>Area Service Officers (706) 638-5544</p>
                    <p className={styles.text_centered}>Regional Service Officers (706) 272-2355</p><br></br>
                    <p className={styles.sub_title_text_centered}>TENNESSEE DEPARTMENT OF VETERANS AFFAIRS </p>
                    <p className={styles.text_centered}>VA Benefits Regional Office</p>
                    <p className={styles.text_centered}>(800) 827-1000</p><br></br>
                    <p className={styles.sub_title_text_centered}>VETERANS SERVICE OFFICERS</p>
                    <div className={styles["col1"]}>
                    <p className={styles.text_centered}>Bledsoe County (423) 447-6731</p>
                    <p className={styles.text_centered}>Bradley County (423) 728-7100</p>
                    <p className={styles.text_centered}>Bradley County (423) 728-7149</p>
                    <p className={styles.text_centered}>Grundy County (931) 592-2178</p>
                    <p className={styles.text_centered}>Hamilton County (423) 634-6488</p><br></br>
                    <p className={styles.text_centered}>Meigs County (423) 334-1631</p>
                    <p className={styles.text_centered}>McMinn County (423) 744-1644</p>
                    <p className={styles.text_centered}>Polk County (423) 338-4546</p>
                    <p className={styles.text_centered}>Rhea County (423) 775-7849</p>
                    <p className={styles.text_centered}>Sequatchie County (423) 949-4094</p><br></br>
                    </div>
                        </div>
                <Footer/>
            </main>

        </>

    )
}

export default KeyNumbers