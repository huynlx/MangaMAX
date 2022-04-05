import { NextPage } from "next";
import DashboardComponent from 'components/Dashboard';
import Head from "next/head";

const Dashboard: NextPage = () => (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <DashboardComponent />
    </>
);

export default Dashboard;