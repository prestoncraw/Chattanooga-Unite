import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import Script from "next/script";
import AccessibilityMenu from "../components/accessibility-menu";
import { useRouter } from 'next/router';

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    const router = useRouter();
    const isDashboard = router.pathname.startsWith('/dashboard');

    return (
        <SessionProvider session={session}>
            <Script src="https://kit.fontawesome.com/8e69a0977a.js" crossOrigin="anonymous" />
            {!isDashboard && <AccessibilityMenu />}
            <Component {...pageProps} />
        </SessionProvider>
    )
}
