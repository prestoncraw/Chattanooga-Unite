import '../styles/globals.css'
import NavBar from '../components/navbar'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <NavBar></NavBar>
            <Component {...pageProps} />
        </>

    )
}