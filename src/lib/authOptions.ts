import { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: "",
            clientSecret: ""
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            console.log(account, profile)
            if (account?.provider === "google") {
                return profile
            }

            return true
        }
    }
}