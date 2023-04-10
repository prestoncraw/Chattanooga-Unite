import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import AccessibilityMenu from '../components/accessibility-menu';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {

  return (
    <div>
      <Head>
        <title>Home &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Chattanooga Unite provides outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies for those in the Chattanooga area."
          key="desc"
        />
        <meta property="og:title" content="Home / Chattanooga Unite - Veterans Resource Center" />
        <meta
          property="og:description"
          content="Chattanooga Unite provides outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies for those in the Chattanooga area."
        />
        <meta
          property="og:image"
          content="/images/chattanooga-unite-logo.jpg"
        />
      </Head>
      
      <main>
        <NavBar />
        <div className="container">
          <div className="grayBackgroundHead centered">
            <div className="titleBackground">
              { <Image
              src="/images/handshake.png"
              alt="Picture of Veteran and civilian shaking hands."
              width={300}
              height={300}
              priority
            /> }
            </div>
            <h1 className="title">Veterans Resource Center<br></br>Chattanooga Unite <span className={styles.red}><i className="fa-solid fa-star"></i></span></h1>
            <p className="corners description_dark">
              Providing outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies.
            </p>
            <Link href='/find-help'><button className="btn_outline_dark">Find Help <i className="fa-solid fa-arrow-right"></i></button></Link>
            <p className="description_dark">Questions? Call 2-1-1 United Way of Greater Chattanooga</p>
          </div>

          <div className="blueBackground">
            <div className="left">
              <div className="white_decoration"></div>
              <h1 className="title_light">Helping Veterans and Their Families</h1><br></br>
              <p className="description_light">This effort grew out of the Iraq and Afghanistan wars with a desire to partner with the Veterans Administration in providing services for the increasing challenges of these returning veterans, while satisfying current needs of existing veterans and their families.</p><br></br>
              <p className="description_light">Epilepsy Foundation of Southeast Tennessee (EFSETN) along with over 100+ other agencies and businesses are a part of this community grassroots effort. This grassroots coalition of agencies is called the Chattanooga Unite Veterans Resource Center.</p>
            </div>
            <div className="right">
              <Image className="vetImg"
                src="/images/landing page photo1.png"
                alt="Picture of a smiling veteran with tiny house in the palm of his hand."
                width={300}
                height={300}
              />
            </div>
          </div>

          <div className="grayBackground">
            <div className="right">
              <div className="blue_decoration"></div>
              <h1 className="title_dark">Proudly Serving All Military</h1>
              <p className="description_dark">
                We are proud to have partnerships with over 150 organizations in Southeast Tennessee and its surrounding areas.
                We connect veterans with the resources they need in over 15 counties accross Tennessee, Georgia, and Alabama.
                We are able to help provide veterans with access to 13 different types of assistance. <br></br><br></br>
                <Link className="link_dark" href='/get-involved'>Get involved with Chattanooga Unite.</Link><br></br><br></br>
                Questions? Call 2-1-1 United Way of Greater Chattanooga.
              </p>
            </div>
            <div className="left">
              <Image className="vetImg"
                src="/images/landing page photo2.png"
                alt="Picture of a smiling Marine veteran with his arms crossed."
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </main>
      <AccessibilityMenu />
      <Footer />
    </div>
  )
}