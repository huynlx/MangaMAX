import { NextPage } from "next";
import dynamic from 'next/dynamic';
import Loader from 'components/Loader';
const RegisterComponent = dynamic(() => import('components/Register'), {
    loading: () => <Loader />,
});

const Register: NextPage = () => (
    <RegisterComponent />
)
export default Register;