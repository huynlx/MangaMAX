import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { registerWithEmailAndPassword } from "@/utils/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Form from "@/components/Shared/Form";
import { ImSpinner8 } from "react-icons/im";
import { validateEmail } from "@/components/Dashboard/Login";

const RegisterComponent: FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { reducer4: { user, isLoading } } = useAppSelector(state => state);
    const history = useRouter();
    const dispatch = useAppDispatch();

    const register = () => {
        if (validateEmail(email)) {
            dispatch({ type: 'LOADING', isLoading: true });
            registerWithEmailAndPassword(name, email, password)
                .catch((err) => {
                    dispatch({ type: 'LOADING', isLoading: false });
                    alert(err.message.replace('Firebase: ', ''));
                });
        } else {
            alert('Error (auth/invalid-email).');
        }
    };

    useEffect(() => {
        if (user) history.push("/dashboard");
    }, [user]);

    return (
        <Form className='register'>
            <div className="register__container">
                <input
                    type="text"
                    className="register__textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                />
                <input
                    type="email"
                    className="register__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                    required
                />
                <input
                    type="password"
                    className="register__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button
                    type="submit"
                    className="register__btn"
                    onClick={register}
                >
                    {
                        isLoading ? <ImSpinner8 size={25.5} className="animate-spin mx-auto" /> : "Register"
                    }
                </button>
                <div>
                    Already have an account? <Link href="/login"><a className="text-link font-semibold">Login</a></Link>
                </div>
            </div>
        </Form>
    );
}
export default RegisterComponent;