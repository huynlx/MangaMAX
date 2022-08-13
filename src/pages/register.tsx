import { NextPage } from "next";
import RegisterComponent from '@/components/Dashboard/Register';
import Head from '@/components/Shared/Head';

const Register: NextPage = () => (
    <>
        <Head title='Register' />
        <RegisterComponent />
    </>
)
export default Register;