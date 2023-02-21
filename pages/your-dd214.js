import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/dd214.module.css';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

function YourDD214() {
  return (
    <>
      <Head>
        <title>Your DD214 &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Your DD214 / Chattanooga Unite - Veterans Resource Center" />
        <meta
          property="og:description"
          content="Chattanooga Unite provides outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies for those in the Chattanooga area."
        />
        <meta
          property="og:image"
          content="https://pub-62dc534c19094cf6b30ce047dde383e3.r2.dev/unite.jpg"
        />
      </Head>
      <main>
        <NavBar />
        <div className="container">
          <div className="grayBackgroundHead">
            <h1 className="title">Your DD214</h1>
            <div className="imageContainerHead">
              <Image src="/images/unitedwayblack.png" alt="United Way Left Image" className="rightImageHead" width={150} height={300} />
              <p className="cornersPages description_dark centered">Your DD214 number is important! Learn more about how to access it here.</p>
              <Image src="/images/chattanoogaway.png" alt="Chattanooga Unite Veteran's Resource Center Right Image" className="leftImageHead" width={150} height={300} />
            </div>
          </div>
          <div className="blueBackground">
            <div className="white_decoration left"></div>
            <div className={styles.left}>
              <p>For information and services, your DD214 is vital.</p>
              <br />
              <p>For help in getting a copy of your DD214, call the Veteran Service Officer for your county, or you may contact the Department of Veteran Affairs:</p>
              <br />
              <p>VA Regional Office: (423) 634-7125</p>
              <a href="url"><u>www.archives.gov/veterans/military-service-records/</u></a>
            </div>
            <div className="right"></div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default YourDD214;
