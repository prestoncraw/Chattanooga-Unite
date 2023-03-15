import Head from 'next/head';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import styles from '../styles/PartOrgs.module.css';
import Image from 'next/image';

function ParticipatingOrganizations({data}) {
  const organizations = JSON.parse(data);
  return (
    <>
      <Head>
        <title>Participating Organizations &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Participating Organizations / Chattanooga Unite - Veterans Resource Center" />
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
            <h1 className="title">Participating Organizations<span className="red"></span><br></br></h1>
            <div className="imageContainerHead">
              <Image src="/images/unitedwayblack.png" alt="United Way Left Image" className="rightImageHead" width={150} height={300} />
              <p className="cornersPages description_dark">Partnering with top organizations to provide extensive resources.</p>
              <Image src="/images/chattanoogaway.png" alt="Chattanooga Unite Veteran's Resource Center Right Image" className="leftImageHead" width={150} height={300} />
            </div>
          </div>
          <div>
        </div>
        <div className="blueBackground">
          <div className="left">
            <div className="white_decoration"></div>
            <ul className={styles.part_bullet}>
              {organizations.map((org) => (
                <li className={styles.links} key={org.id}>
                  <a className={styles.link} href={`http://${org.website_url}`}>{org.name}</a>
                </li>))}
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


export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/part-orgs');
  const data = await res.json();
  console.log(data); 
  return {
    props: {
      data
    }
  };
}
