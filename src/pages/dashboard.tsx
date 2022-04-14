import { NextPage } from "next";
import DashboardComponent from '@/components/Dashboard';
import Head from '@/components/Head';

const Dashboard: NextPage = () => (
    <>
        <Head title='Dashboard' />
        <DashboardComponent />
    </>
);

export default Dashboard;