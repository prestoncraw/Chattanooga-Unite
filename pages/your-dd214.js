import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/dd214.module.css';
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
                <div className="container">
                <div className="grayBackground centered">
                    <h1 className="title">Your DD214</h1><br></br>
                    <div className="imageContainerHead">
                        <Image src="/images/unitedwayblack.png" alt="United Way Left Image" className="rightImageHead" width={200} height={200} />
                        <p className="cornersPages description_dark">Providing outreach to all military service persons including veterans and their families by creating partnerships between VA providers and local agencies.</p>
                        <Image src="/images/chattanoogaway.png" alt="Chattanooga Unite Veteran's Resource Center Right Image" className="leftImageHead" width={285} height={200} />
                    </div>
                </div>
                <div className="blueBackground">
                    <div className="white_decoration left"></div>
                    <div className={styles.left}>
                        <p>For information and services, your DD214 is vital.</p>
                        <br></br>
                        <p>For help in getting a copy of your DD214, call the Veteran Sevice Officer for your county,
                            or you may contact the Department of Veteran Affairs:
                        </p>
                        <br></br>
                        <p>VA Regional Office: (423) 634-7125</p>
                        <a href="url">
                            <u>www.archives.gov/veterans/military-service-records/</u>
                        </a> 
                    </div>
                    <div className="right">

                    </div>
                </div> 
                </div>
                <Footer/>
            </main>

        </>

    )
}

export default YourDD214