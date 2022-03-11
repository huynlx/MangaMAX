import dynamic from "next/dynamic";

const Page500 = dynamic(() => import("../components/500"));

export default Page500;