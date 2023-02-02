import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

function FindHelp() {
    return (
        <>
            <Head>
                <title>Contact us &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
                <script src="https://kit.fontawesome.com/8e69a0977a.js" crossorigin="anonymous"></script>
            </Head>
            <main>
            <NavBar/>
                <div className={styles.grayBackground}>
                    <h1 className={styles.title}>What Do You Need Help With?</h1>
                    <div className={styles.cards_container}>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-bullhorn"></i></span><span className={styles.square_content}>Advocacy</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-handshake-angle"></i></span><span className={styles.square_content}>Benefits</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-shirt"></i></span><span className={styles.square_content}>Clothing</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-tooth"></i></span><span className={styles.square_content}>Dental</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-graduation-cap"></i></span><span className={styles.square_content}>Education</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-briefcase"></i></span><span className={styles.square_content}>Employment</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-utensils"></i></span><span className={styles.square_content}>Food</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-house-user"></i></span><span className={styles.square_content}>Housing</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-monument"></i></span><span className={styles.square_content}>Memorial and Burial</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-person-swimming"></i></span><span className={styles.square_content}>Theraputic Recreation</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-car-side"></i></span><span className={styles.square_content}>Transportation</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-faucet-drip"></i></span><span className={styles.square_content}>Utility</span></div>
                        <div className={styles.square_box}><span className={styles.square_icon}><i class="fa-solid fa-circle-question"></i></span><span className={styles.square_content}>Other</span></div>
                    </div>
                </div>
            </main>
            <Footer></Footer>

        </>

    )
}

export default FindHelp