import '../styles/globals.css'
import NavBar from '../components/navbar'
import Footer from '../components/footer'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <NavBar />
            <Component {...pageProps} />
        </>

    )
}