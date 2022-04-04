import { NextPage } from "next";
import RegisterComponent from 'components/Register';
import Head from "next/head";

const Register: NextPage = () => (
    <>
        <Head>
            <title>Register</title>
        </Head>
        <RegisterComponent />
    </>
)
export default Register;