import { NextPage } from "next";
import dynamic from "next/dynamic";

const Page500:NextPage = dynamic(() => import("../components/500"));

export default Page500;