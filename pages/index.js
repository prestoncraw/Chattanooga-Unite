import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavBar />
        <div className={styles["grayBackground"] + " " + styles["centered"]}>
          <h1 className={styles.title}>Veterans Resource Center<br></br>Chattanooga Unite <span className={styles.red}><i className="fa-solid fa-star"></i></span></h1>
          <p className={styles["corners"] + " " + styles["contact_description"]}>
            Providing outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies.
          </p>
          <button className={styles.btn_outline_dark}>Find Help <i className="fa-solid fa-arrow-right"></i></button>
        </div>

        <div className={styles["blueBackground"] + " " + styles["left"]}>
          <div className={styles.white_decoration}></div>
          <div className={styles.title_light}>Helping Veterans and Their Families</div><br></br>
          <p className={styles.description_light}>This effort grew out of the Iraq and Afghanistan wars with a desire to partner with the Veterans Administration in providing services for the increasing challenges of these returning veterans, while satisfying current needs of existing veterans and their families.</p><br></br>
          <p className={styles.description_light}>Epilepsy Foundation of Southeast Tennessee (EFSETN) along with over 100+ other agencies and businesses are a part of this community grassroots effort. This grassroots coalition of agencies is called the Southeast Tennessee Veterans Coalition. Presently, EFSETN chairs the Coalition.</p>
          <button className={styles.btn_outline_dark}>Learn More <i className="fa-solid fa-arrow-right"></i></button>
        </div>

        <div className={styles["grayBackground"] + " " + styles["right"]}>
          <div className={styles.red_decoration}></div>
          <h1 className={styles.title_dark}>Proudly Serving All Military</h1>
          <p className={styles["description_dark"]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et aliquet tellus. Vestibulum laoreet est at dui porttitor pulvinar. Curabitur sit amet massa vehicula neque sagittis placerat. Vestibulum purus libero, aliquam quis interdum non, malesuada lacinia nunc. Proin lorem justo, mollis sit amet nunc at, lacinia semper lorem. Duis tellus erat, gravida et aliquam vitae, rhoncus sed justo. Nulla in ultrices sem. Curabitur imperdiet, libero blandit pulvinar congue, dui ipsum dictum purus, sed pulvinar arcu sapien ut risus. Vivamus sed lorem elit. Maecenas eu nibh ut lectus blandit maximus ut eleifend massa. Duis in bibendum metus. Nullam pulvinar vulputate dui, id maximus enim viverra nec. Fusce ac metus eros. Curabitur nec lacus consequat, cursus eros id, commodo quam. Sed sed quam tortor. Nulla non mauris et tellus dictum sagittis.
          </p>
          <button className={styles.btn_outline_light}>Learn More <i className="fa-solid fa-arrow-right"></i></button>
        </div>
        <a href='/dashboard'><div className={styles.card}>Service Provders Login Here</div></a>

      </main>
      <Footer />
    </div>
  )
}