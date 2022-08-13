import { FC, useEffect, useState } from "react";
import { logInWithEmailAndPassword, signInWithFacebook, signInWithGoogle } from "@/utils/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Form from "../Shared/Form";
import { ImSpinner8 } from "react-icons/im";

export const validateEmail = (email: string): boolean => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());

const LoginComponent: FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { reducer4: { user, isLoading } } = useAppSelector(state => state);
    const navigate = useRouter();
    const dispatch = useAppDispatch();

    const login = () => {
        if (validateEmail(email)) {
            dispatch({ type: 'LOADING', isLoading: true });
            logInWithEmailAndPassword(email, password)
                .catch((err) => {
                    dispatch({ type: 'LOADING', isLoading: false });
                    alert(err.message.replace('Firebase: ', ''));
                })
        } else {
            alert('Error (auth/invalid-email).');
        }
    }

    useEffect(() => {
        if (user) navigate.back();
    }, [user]);

    return (
        <Form className="login">
            <div className="login__container">
                <input
                    type="email"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                    required
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button
                    className="login__btn"
                    onClick={login}
                    type='submit'
                >
                    {
                        isLoading ? <ImSpinner8 size={25.5} className="animate-spin mx-auto" /> : "Login"
                    }
                </button>
                <button type="button" className="login__btn login__google relative" onClick={signInWithGoogle}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" className="w-6 h-6 absolute left-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                        c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                        c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                        c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    Login with Google
                </button>
                <button type="button" className="login__btn login__facebook relative" onClick={signInWithFacebook}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" className="w-6 h-6 absolute left-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
                    Login with Facebook
                </button>
                <div>
                    <Link href="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don&apos;t have an account? <Link href="/register"><a className="text-link font-semibold">Register</a></Link>
                </div>
            </div>
        </Form>
    );
}
export default LoginComponent;