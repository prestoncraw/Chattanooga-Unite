import Head from 'next/head';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import styles from '../styles/PartOrgs.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';


function ParticipatingOrganizations() {
  // State to store the list of organizations
  const [data, setData] = useState({ organizations: [] });

  // Use effect hook to fetch data from a JSON file
  useEffect(() => {
    fetch('/data/organizations.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Head>
        <title>Participating Organizations &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <div className="container">
        <div className="grayBackgroundHead centered">
        <h1 className="title">Participating Organizations <span className="red"></span><br></br></h1>
        <div className="imageContainerHead">
        <Image src="/images/unitedwayblack.png" alt="United Way Left Image" className="rightImageHead" width={150} height={200} />
        <p className="cornersPages description_dark">Partnering with top organizations to provide extensive resources.</p>
        <Image src="/images/chattanoogaway.png" alt="Chattanooga Unite Veteran's Resource Center Right Image" className="leftImageHead" width={150} height={300} />
        </div>
        </div>

        <div className="blueBackground">  
          <div className="left">
            <div className="white_decoration"></div>                                                                     
            <ul className={styles.part_bullet}>
              {data.organizations.map((item, index) => (
                <li className={styles.links} key={index}>
                  <a href={item.link} className={styles.links}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default ParticipatingOrganizations;
