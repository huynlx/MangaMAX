import { NextPage } from "next";
import RegisterComponent from '@/components/Register';
import Head from '@/components/Head';

const Register: NextPage = () => (
    <>
        <Head title='Register' />
        <RegisterComponent />
    </>
)
export default Register;