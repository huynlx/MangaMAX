import { NextPage } from "next";
import DashboardComponent from 'components/Dashboard';
import Head from "next/head";
import ToolNav from "components/ToolNav";

const Dashboard: NextPage = () => (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <DashboardComponent />
        <ToolNav />
    </>
);

export default Dashboard;