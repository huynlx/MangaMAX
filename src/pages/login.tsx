import { NextPage } from "next";
import LoginComponent from '@/components/Dashboard/Login';
import Head from '@/components/Shared/Head';

const Login: NextPage = () => (
    <>
        <Head title='Login' />
        <LoginComponent />
    </>
)
export default Login;