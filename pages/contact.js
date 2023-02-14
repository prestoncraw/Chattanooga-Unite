import Head from 'next/head';
import styles from '../styles/Contact.module.css';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';

function Contact() {
    return (
        <>
            <Head>
                <title>Contact us &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <NavBar />
                <div className="container">
                <div className="grayBackgroundHead centered">
                <h1 className="title">Contact Us <span className="red"></span><br></br></h1>
                <div className="imageContainerHead">
                <Image src="/images/unitedwayblack.png" alt="United Way Left Image" className="rightImageHead" width={100} height={200} />
                <p className="cornersPages description_dark">Replace thsd fsdfs dfsdfsdf  sfdfdsfsdfds s....</p>
                <Image src="/images/chattanoogaway.png" alt="Chattanooga Unite Veteran's Resource Center Right Image" className="leftImageHead" width={150} height={300} />                </div>
                </div>
                <div className="blueBackground left"> 
                <div className="white_decoration"> </div>
                <div className={styles.text_title}>Visit us at:</div><br></br>
                <div className={styles.text_light}>1 Sisken Plaza, Chattanooga, TN 30403</div><br></br>
                <div className={styles.padding_between}></div><br></br>
                <div className={styles.text_title}>Give us a call:</div><br></br>
                <div className={styles.text_light}>(423) 634-1771</div><br></br>
                <div className={styles.padding_between}></div><br></br>
                <div className={styles.text_title}>For more information:</div><br></br>
                <div className={styles.text_light}>Please call or e-mail for information about the Coalition and Coalition Partnership, or to request electronic copies of the Southeast Tennessee Veterans Coalition brochure.</div><br></br>
                <div className={styles.text_light}>All other inquiries, please dial 211</div><br></br>
                   
                </div>
            </div>
            </main>
            <Footer></Footer>

        </>

    )
}

export default Contact
