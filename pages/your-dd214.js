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
            /> }
            </div>
            <h1 className="title">DD214 Information</h1>
              <p className="corners description_dark">Your DD214 number is important. Learn more about how to access it here.</p>
          </div>
          <div className="blueBackground">
            <div className="left">
              <div className="white_decoration"></div>
              <h1 className="title_light">Requesting Your DD214</h1>
              <div className="description_light">
                <p>
                  For information and services, your DD214 is vital. For help in getting a copy of your DD214, call the Veteran Service Officer for your county, or you may contact the Department of Veteran Affairs:
                  <br></br><br></br>
                  <span className="indent">
                    (423) 634-7125<br></br>
                    <a className="link_light" href='www.archives.gov/veterans/military-service-records/'>Military Service Records</a>
                  </span>
                </p>
              </div>
            </div>
            <div className="right">
              <Image className="vetImg"
                src="/images/DD214 page img.png"
                alt="Picture of a veteran sitting and reading a book."
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default YourDD214;
