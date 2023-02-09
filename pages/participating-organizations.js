import Head from 'next/head';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import styles from '../styles/PartOrgs.module.css';
import { useState, useEffect } from 'react';

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
        <div className="grayBackground centered">
          <h1 className="title">Participating Organizations <span className="red"></span><br></br></h1>
          <p className="cornersPages description_dark">Providing outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies.</p>
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

        <Footer />
      </main>
    </>
  );
};

export default ParticipatingOrganizations;
