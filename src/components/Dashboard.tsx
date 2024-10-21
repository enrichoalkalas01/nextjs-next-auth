"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import React, { useEffect } from "react"
import axios from 'axios'

export default function Dashboard() {
    const { data: session } = useSession()
    useEffect(() => {
        getAccessToken("")
        .then(response => response)
        .catch(err => err)
    }, [])
    return(
        <>
            {
                session ? (
                    <>
                        <img
                            src={session.user?.image as string}
                            className="rounded-full h-20 w-20"
                        />
                        <h1 className="text-3xl text-green-500 font-bold">
                            Welcome back, {session.user?.name}
                        </h1>
                        <p className="text-2xl font-semibold">{session.user?.email}</p>
                        <button
                            onClick={() => signOut()}
                            className="border border-black rounded-lg bg-red-400 px-5 py-1"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl text-red-500 font-bold">
                            You're not logged in
                        </h1>
                        <div className="flex space-x-5">
                            <button
                                onClick={() => signIn("google")}
                                className="border border-black rounded-lg px-5 py-1"
                            >
                                Sign in with Google
                            </button>
                            <button
                                onClick={() => signIn("github")}
                                className="border border-black rounded-lg bg-green-500 px-5 py-1"
                            >
                                Sign in with GitHub
                            </button>
                        </div>
                    </>
                )
            }
        </>
    )
}

async function getAccessToken(idToken: string) {
    try {
        
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            clientId: "",
            clientSecret: "",
            grant_type: 'authorization_code',
            code: `${ idToken }`,
            redirect_uri: 'http://localhost:3000/api/auth/callback/google',
        });

        const accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
        console.error('Error exchanging token:', error);
        throw error;
    }
}
