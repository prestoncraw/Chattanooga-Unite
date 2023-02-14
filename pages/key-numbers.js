import Head from 'next/head';
import NavBar from '../components/navbar'
import Footer from '../components/footer';
import styles from '../styles/KeyNum.module.css';
import Image from 'next/image';

function KeyNumbers() {
    return (
        <>
            <Head>
                <title>Key Numbers &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main>
                <NavBar />
                <div className='container'>
                <div className="grayBackgroundHead centered">
                    <h1 className="title">Key Number For Veterans <span className="red"></span><br></br></h1>
                    <div className="imageContainerHead">
                    <Image src="/images/unitedwayblack.png" alt="United Way Left Image" className="rightImageHead" width={100} height={200} />
                        <p className="cornersPages description_dark">Providing veterans with vital information that helps point them in the right direction to start receiving help they deserve.</p>
                        <Image src="/images/chattanoogaway.png" alt="Chattanooga Unite Veteran's Resource Center Right Image" className="leftImageHead" width={150} height={300} />
                    </div>
                </div>
                
                <div className="blueBackground">  
                  <div className="left">
                    <div className="white_decoration"></div>
                    <p className={styles.sub_title_text_centered}> US Department of Veterans Affairs </p>
                    <p className={styles.text_centered}><a href="https://www.va.gov/"><u>www.va.gov</u></a></p><br></br><br></br>
                    <p className={styles.sub_title_text_centered}> National Homeless Veteran Call Center </p>
                    <p className={styles.text_centered}>(877) 4AID VET</p>
                    <p className={styles.text_centered}>(877) 424-3838</p><br></br><br></br>
                    <p className={styles.sub_title_text_centered}>Veterans Crisis Line </p>
                    <p className={styles.text_centered}>(800) 273-8255 PRESS 1</p>
                    <p className={styles.text_centered}>Text: 838255</p>
                    <p className={styles.text_centered}>Confidential chat at Veterans <a href="https://www.veteranscrisisline.net/"><u>CrisisLine.net</u></a></p><br></br><br></br>
                    <p className={styles.sub_title_text_centered}>Georgia Department of Veterans Affairs </p>
                    <p className={styles.text_centered}>Area Service Officers (706) 638-5544</p>
                    <p className={styles.text_centered}>Regional Service Officers (706) 272-2355</p><br></br><br></br>
                    <p className={styles.sub_title_text_centered}>Tennessee Department of Veterans Affairs </p>
                    <p className={styles.text_centered}>VA Benefits Regional Office</p>
                    <p className={styles.text_centered}>(800) 827-1000</p><br></br><br></br>
                    <p className={styles.sub_title_text_centered}>Veterans Service Officers</p>
                    <p className={styles.text_centered}>Bledsoe County (423) 447-6731</p>
                    <p className={styles.text_centered}>Bradley County (423) 728-7100</p>
                    <p className={styles.text_centered}>Bradley County (423) 728-7149</p>
                    <p className={styles.text_centered}>Grundy County (931) 592-2178</p>
                    <p className={styles.text_centered}>Hamilton County (423) 634-6488</p>
                    <p className={styles.text_centered}>Meigs County (423) 334-1631</p>
                    <p className={styles.text_centered}>McMinn County (423) 744-1644</p>
                    <p className={styles.text_centered}>Polk County (423) 338-4546</p>
                    <p className={styles.text_centered}>Rhea County (423) 775-7849</p>
                    <p className={styles.text_centered}>Sequatchie County (423) 949-4094</p><br></br><br></br>
                  </div>
                </div>
                </div>
                <Footer />
            </main>

        </>

    )
}

export default KeyNumbers