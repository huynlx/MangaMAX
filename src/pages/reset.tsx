import { NextPage } from "next";
import Head from '@/components/Shared/Head';
import ResetComponent from "@/components/Dashboard/Reset";

const Reset: NextPage = () => (
    <>
        <Head title='Reset Password' />
        <ResetComponent />
    </>
)
export default Reset;