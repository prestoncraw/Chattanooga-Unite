import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home &raquo; Chattanooga Unite - Veterans Resource Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Veterans Resource Center - Chattanooga Unite
        </h1>
        <p>
          Providing outreach to all military service persons including veterans and their familes by creating partnerships between VA providers and local agencies.
        </p>

      </main>
    </div>
  )
}
