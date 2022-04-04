import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { sendPasswordReset } from "shared/firebase";
import { useAppSelector } from "hooks/useRedux";

const ResetComponent = () => {
    const [email, setEmail] = useState("");
    const { reducer4: { user } } = useAppSelector(state => state);
    const navigate = useRouter();
    useEffect(() => {
        if (user) navigate.push("/dashboard");
    }, [user]);
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
                    Don&apos;t have an account? <Link href="/register"><a className="text-link font-semibold">Register</a></Link>
                </div>
            </div>
        </div>
    );
}
export default ResetComponent;