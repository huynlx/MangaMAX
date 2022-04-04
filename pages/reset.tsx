import { NextPage } from "next";
import ResetComponent from 'components/Reset';
import Head from "next/head";

const Reset: NextPage = () => (
    <>
        <Head>
            <title>Reset Password</title>
        </Head>
        <ResetComponent />
    </>
)
export default Reset;