import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import Script from "next/script";
import AccessibilityMenu from "../components/accessibility-menu";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
            <Script src="https://kit.fontawesome.com/8e69a0977a.js" crossOrigin="anonymous" />
            <AccessibilityMenu />
            <Component {...pageProps} />
        </SessionProvider>
    )
}
