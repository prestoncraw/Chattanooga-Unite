import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import NavBar from '../components/navbar'
import Footer from '../components/footer'

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}