import React, { FC, useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithFacebook, signInWithGoogle } from "shared/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { NextPage } from "next";

const Login: NextPage<FC> = () => {
    const [email, setEmail] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useRouter();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate.push("/dashboard");
    }, [user, loading]);
    return (
        <div className="login">
            <div className="login__container">
                <input
                    type="email"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                </button>
                <button className="login__btn login__google" onClick={signInWithFacebook}>
                    Login with Facebook
                </button>
                <div>
                    <Link href="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link href="/register"><a className="text-link">Register</a></Link>
                </div>
            </div>
        </div>
    );
}
export default Login;