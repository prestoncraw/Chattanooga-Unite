import { withAuth } from "next-auth/middleware";
export default withAuth({
    pages: {
        signIn: "/signIn",
    },
});

export const config = { matcher: ["/dashboard"] }