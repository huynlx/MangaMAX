import { NextPage } from "next";
import dynamic from 'next/dynamic';
import Loader from 'components/Loader';
const ResetComponent = dynamic(() => import('components/Reset'), {
    loading: () => <Loader />,
});

const Reset: NextPage = () => (
    <ResetComponent />
)
export default Reset;