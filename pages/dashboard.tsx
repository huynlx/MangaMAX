import { NextPage } from "next";
import dynamic from 'next/dynamic';
import Loader from 'components/Loader';
const DashboardComponent = dynamic(() => import('components/Dashboard'), {
    loading: () => <Loader />,
});

const Dashboard: NextPage = () => (
    <DashboardComponent />
);

export default Dashboard;