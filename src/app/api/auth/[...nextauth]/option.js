import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"

export const options = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GithubProvider({
            profile(profile) {
                // console.log(profile);

                let userRole = "Github User";
                if (profile?.email == 'zainzabid4338@gmail.com') {
                    userRole = "admin";
                }

                // console.log("profile Github", profile);
                return {
                    role: userRole,
                    ...profile,
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
        ,
        GoogleProvider({
            profile(profile) {
                // console.log("profile Google", profile);

                let userRole = "Google User";
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,

        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role; // Add the role to the JWT token
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role; // Add the role to the user session
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}