import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/dd214.module.css';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

function GetInvolved() {
  return (
    <>
      <Head>
        <title>Get Involved &raquo; Chattanooga Unite - Veterans Resource Center</title>
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
          <div className="grayBackgroundHead centered">
          <div className="titleBackground">
              { <Image
              src="/images/handshake.png"
              alt="Picture of Veteran and civilian shaking hands."
              width={300}
              height={300}
            /> }
            </div>
            <h1 className="title">Get Involved</h1>
              <p className="corners description_dark">Providing information on how you can get involved with Chattanooga Unite and help serve our veterans.</p>
          </div>
          
          <div className="blueBackground">
            <div className="left">
                <div className="white_decoration"></div>
                <h1 className="title_light">Helping Veterans and Their Families</h1>
                <div className="description_light">
                    <p>
                        Chattanooga Unite Veterans Resource Center is proud to serve our community by connecting veterans and their families with the resources they need. 
                        We help veterans receive support that the VA is otherwise unable to provide. 
                        Our goal is to provide support for the whole body of the veteran. 
                        Our partners offer 13 different types of resources each covering different types of needs ranging from dental care, to home repair, to job and housing assistance, and even funeral and memorial services.
                    </p>
                </div>
            </div>
            <div className="right">
              <Image className="vetImg"
                src="/images/get involved photo1.png"
                alt="Picture of a smiling veteran in a wheelchair."
                width={300}
                height={300}
              />
            </div>
          </div>

          <div className="grayBackground">
            <div className="right">
                <h1 className="title_dark">Our Impact</h1>
                <div className="title_dark"><h2>Ramp Accessibility</h2></div>
                <div className="description_dark">
                    <p>
                        Chattanooga Unite has previously partnered with the engineering college at The University of Tennessee at Chattanooga. 
                        Through this partnership, we were able to provide a veteran with wheelchair accessibility in their home.  
                    </p>
                </div>
                <div className="title_dark"><h2>Funeral and Memorial Services</h2></div>
                <div className="description_dark">
                    <p>
                        Chattanooga Unite also provides support for veteran families. 
                        Many veteran families are unaware of how to receive the proper funeral and memorial servies for their loved one.
                        Chattanooga Unite provides these families with important information as well as financial assistance to ensure their loved one receives the honors they deserve
                    </p>
                </div>
                <div className="title_dark"><h2>Dental Care</h2></div>
                <div className="description_dark">
                    <p>
                        In 2022, Chattanooga Unite, in conjunction with our partners, provided eight veterans with the dental care they needed. 
                        We were able to reduce the cost of this treatment to half the original price. 
                    </p>
                </div>
            </div>
            <div className="left">
                <Image className="vetImg"
                    src="/images/get involved photo2.png"
                    alt="Picture of a smiling veteran picking up a small, smiling child."
                    width={300}
                    height={300}
                />
            </div>
          </div>
          
          <div className="blueBackground">
            <div className="left">
              <div className="white_decoration"></div>
              <h1 className="title_light">Donating</h1>
              <div className="description_light">
                <p>
                If you would like to provide a cash donation to Chattanooga Unite, please mail your donation to us: <br></br><br></br>
                <span className="indent">426 Market Street, Chattanooga, TN 37402</span><br></br><br></br>
                If you would like to donate your time or services, please call us:<br></br><br></br>
                <span className="indent">(423)756-2211</span><br></br><br></br>
                Chattanooga Unite is a 501(c)(3) organization and donations are tax-deductible.
                </p>
              </div>
            </div>
            <div className="right">
              <Image className="vetImg"
                src="/images/get involved photo3.png"
                alt="Picture of a smiling veteran sitting with arms crossed."
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

export default GetInvolved;
