import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset } from "shared/firebase";

const Reset: NextPage<FC> = () => {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useRouter();
    useEffect(() => {
        if (loading) return;
        if (user) navigate.push("/dashboard");
    }, [user, loading]);
    return (
        <div className="reset">
            <div className="reset__container">
                <input
                    type="text"
                    className="reset__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <button
                    className="reset__btn"
                    onClick={() => sendPasswordReset(email)}
                >
                    Send password reset email
                </button>
                <div>
                    Don&apos;t have an account? <Link href="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Reset;