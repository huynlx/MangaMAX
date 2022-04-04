import { NextPage } from "next";
import LoginComponent from 'components/Login';
import Head from "next/head";

const Login: NextPage = () => (
    <>
        <Head>
            <title>Login</title>
        </Head>
        <LoginComponent />
    </>
)
export default Login;