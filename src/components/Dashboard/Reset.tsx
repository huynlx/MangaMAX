import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { sendPasswordReset } from "@/utils/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Form from "@/components/Shared/Form";
import { ImSpinner8 } from "react-icons/im";
import { validateEmail } from "@/components/Dashboard/Login";

const ResetComponent = () => {
    const [email, setEmail] = useState("");
    const { reducer4: { user, isLoading } } = useAppSelector(state => state);
    const navigate = useRouter();
    const dispatch = useAppDispatch();

    const reset = () => {
        if (validateEmail(email)) {
            dispatch({ type: 'LOADING', isLoading: true });
            sendPasswordReset(email)
                .then(() => dispatch({ type: 'LOADING', isLoading: false }))
                .catch((err) => {
                    dispatch({ type: 'LOADING', isLoading: false });
                    alert(err.message.replace('Firebase: ', ''));
                });
        } else {
            alert('Error (auth/invalid-email).');
        }
    }

    useEffect(() => {
        if (user) navigate.push("/dashboard");
    }, [user]);

    return (
        <Form className="reset">
            <div className="reset__container">
                <input
                    type="email"
                    className="reset__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                    required
                />
                <button
                    className="reset__btn"
                    onClick={reset}
                    type='submit'
                >
                    {
                        isLoading ? <ImSpinner8 size={25.5} className="animate-spin mx-auto" /> : "Send password reset email"
                    }
                </button>
                <div>
                    Don&apos;t have an account? <Link href="/register"><a className="text-link font-semibold">Register</a></Link>
                </div>
            </div>
        </Form>
    );
}
export default ResetComponent;