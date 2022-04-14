import { NextPage } from "next";
import ResetComponent from '@/components/Reset';
import Head from '@/components/Head';

const Reset: NextPage = () => (
    <>
        <Head title='Reset Password' />
        <ResetComponent />
    </>
)
export default Reset;