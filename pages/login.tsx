import { NextPage } from "next";
import dynamic from 'next/dynamic';
import Loader from 'components/Loader';
const LoginComponent = dynamic(() => import('components/Login'), {
    loading: () => <Loader />,
});

const Login: NextPage = () => (
    <LoginComponent />
)
export default Login;