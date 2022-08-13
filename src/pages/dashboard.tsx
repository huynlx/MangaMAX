import { NextPage } from "next";
import DashboardComponent from '@/components/Dashboard/Dashboard';
import Head from '@/components/Shared/Head';

const Dashboard: NextPage = () => (
    <>
        <Head title='Dashboard' />
        <DashboardComponent />
    </>
);

export default Dashboard;