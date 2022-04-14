import { NextPage } from "next";
import LoginComponent from '@/components/Login';
import Head from '@/components/Head';

const Login: NextPage = () => (
    <>
        <Head title='Login' />
        <LoginComponent />
    </>
)
export default Login;