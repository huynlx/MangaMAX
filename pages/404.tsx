import { NextPage } from "next";
import dynamic from "next/dynamic";

const Page404:NextPage = dynamic(() => import("../components/404"));

export default Page404;