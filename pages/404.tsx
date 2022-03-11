import dynamic from "next/dynamic";

const Page404 = dynamic(() => import("../components/404"));

export default Page404;