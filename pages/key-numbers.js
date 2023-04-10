import Head from 'next/head';
import { useState } from "react";
import NavBar from '../components/navbar'
import Footer from '../components/footer';
import styles from '../styles/KeyNum.module.css';
import Image from 'next/image';
import AccessibilityMenu from '../components/accessibility-menu';

    const Content1 = () => {
        return <div className={styles.dropdown_content}>
            <p className={styles.description_light}><a className="link_light" href="https://www.va.gov">www.va.gov</a></p>
        </div>
      };
      const Content2 = () => {
        return <div className={styles.dropdown_content}>
            <p className={styles.description_light}>
                (877) 4AID VET<br></br><br></br>
                (877) 424-3838
            </p>
        </div>
      };
      const Content3 = () => {
        return <div className={styles.dropdown_content}>
            <p className={styles.description_light}>
                (800) 273-8255 PRESS 1<br></br><br></br>
                Text: 838255<br></br><br></br>
                Confidential chat at Veterans <a className="link_light" href="https://www.veteranscrisisline.net/">CrisisLine.net</a>
            </p>
        </div>
      };

      const Content4 = () => {
        return <div className={styles.dropdown_content}>
            <p className={styles.description_light}>
                Area Service Officers (706) 638-5544<br></br><br></br>
                Regional Service Officers (706) 272-2355
            </p>
        </div>
      };

      const Content5 = () => {
        return <div className={styles.dropdown_content}>
            <p className={styles.description_light}>
                VA Benefits Regional Office<br></br><br></br>
                (800) 827-1000
            </p>
        </div>
      };

      const Content6 = () => {
        return <div className={styles.dropdown_content}>
            <p className={styles.description_light}>
                <div className={styles.row}>
                    <div className={styles.column}>Bledsoe County</div>
                    <div className={styles.column}>(423) 447-6731</div>
                </div>
                <hr></hr>

                <div className={styles.row}>
                    <div className={styles.column}>Bradley County</div>
                    <div className={styles.column}>(423) 447-6731</div>
                </div>
                <hr></hr>

                <div className={styles.row}>
                    <div className={styles.column}>Bradley County</div>
                    <div className={styles.column}>(423) 728-7100</div>
                </div>
                <hr></hr>

                <div className={styles.row}>
                    <div className={styles.column}>Grundy County</div>
                    <div className={styles.column}>(423) 728-7149</div>
                </div>
                <hr></hr>

                <div className={styles.row}>
                    <div className={styles.column}>Hamilton County</div>
                    <div className={styles.column}>(931) 592-2178</div>
                </div>
                <hr></hr>

                <div className={styles.row}>
                    <div className={styles.column}>Meigs County</div>
                    <div className={styles.column}>(423) 634-6488</div>
                </div>
                <hr></hr>

                <div className={styles.row}>
                    <div className={styles.column}>McMinn County</div>
                    <div className={styles.column}>(423) 334-1631</div>
                </div>
                <hr></hr>

                <div className={styles.row}>
                    <div className={styles.column}>Polk County</div>
                    <div className={styles.column}>(423) 338-4546</div>
                </div>
                <hr></hr>

                <div className={styles.row}>
                    <div className={styles.column}>Rhea County</div>
                    <div className={styles.column}>(423) 775-7849</div>
                </div>
                <hr></hr>

                <div className={styles.row}>
                    <div className={styles.column}>Sequatchie County</div>
                    <div className={styles.column}>(423) 949-4094</div>
                </div>
            </p>
        </div>
      };
      
      function KeyNumbers() {
        const [active, setActive] = useState(-1);
      
        const toggleHandler = (id) => () => {
          setActive((active) => (active === id ? -1 : id));
        };
      
        return (
            <>
            <Head>
                <title>Key Numbers &raquo; Chattanooga Unite - Veterans Resource Center</title>
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="Key Numbers / Chattanooga Unite - Veterans Resource Center" />
                <meta
                    property="og:description"
                    content="Chattanooga Unite provides outreach to all military service persons including veterans and their families by creating partnerships between VA providers and local agencies for those in the Chattanooga area."
                />
                <meta
                    property="og:image"
                    content="/images/chattanooga-unite-logo.jpg"
                />
            </Head>

            <main>
                <NavBar />
                <div className='container'>
                    <div className="grayBackgroundHead centered">
                        <div className="titleBackground">
                            { <Image
                            src="/images/handshake.png"
                            alt="Picture of Veteran with tiny house in the palm of his hand"
                            width={300}
                            height={300}
                            priority
                            /> }
                        </div>
                        <h1 className="title">Key Number For Veterans</h1>
                        <p className="corners description_dark">Providing veterans with vital information to point them in the right direction in receiving the help they deserve.</p>
                    </div>

                    <div className="blueBackground">
                        <div className="left" id="contrast_toggle">
                            <div className={styles.white_decoration}></div>

                            <div onClick={toggleHandler(1)}>
                                <div className={styles.title_light}><h2>US Department of Veterans Affairs <i className="fa-solid fa-sort-down"></i></h2></div>{active === 1 && <Content1 />}
                                <div className={styles.line}></div>
                            </div>
                            <div onClick={toggleHandler(2)}>
                                <div className={styles.title_light}><h2>National Homeless Veteran Call Center <i className="fa-solid fa-sort-down"></i></h2></div>{active === 2 && <Content2 />}
                                <div className={styles.line}></div>
                            </div>
                            <div onClick={toggleHandler(3)}>
                                <div className={styles.title_light}><h2>Veterans Crisis Line <i className="fa-solid fa-sort-down"></i></h2></div>{active === 3 && <Content3 />}
                                <div className={styles.line}></div>
                            </div>
                            <div onClick={toggleHandler(4)}>
                                <div className={styles.title_light}><h2>Georgia Department of Veterans Affairs <i className="fa-solid fa-sort-down"></i></h2></div>{active === 4 && <Content4 />}
                                <div className={styles.line}></div>
                            </div>
                            <div onClick={toggleHandler(5)}>
                                <div className={styles.title_light}><h2>Tennessee Department of Veterans Affairs <i className="fa-solid fa-sort-down"></i></h2></div>{active === 5 && <Content5 />}
                                <div className={styles.line}></div>
                            </div>
                            <div onClick={toggleHandler(6)}>
                                <div className={styles.title_light}><h2>Veterans Service Officers <i className="fa-solid fa-sort-down"></i></h2></div>{active === 6 && <Content6 />}
                                <div className={styles.line}></div>
                            </div>
                        </div>
                        <div className="right">
                            <Image className={styles.vetImg}
                                src="/images/key numbers page photo.png"
                                alt="Picture of a smiling veteran with arms crossed over his chest."
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>
                </div>
                <AccessibilityMenu />
                <Footer />
            </main>
        </>
        );
      }

export default KeyNumbers