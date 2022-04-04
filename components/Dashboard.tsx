import React, { useEffect } from "react";
import { logout } from "shared/firebase";
import { useRouter } from "next/router";
import { useAppSelector } from "hooks/useRedux";
import { HiOutlineLogout } from "react-icons/hi";
import { RiArrowGoBackFill } from "react-icons/ri";

const DashboardComponent: React.FC = () => {
    const { reducer4: { user } } = useAppSelector(state => state);
    const navigate = useRouter();

    useEffect(() => {
        if (!user) navigate.push("/");
    }, [user]);

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as
                <img src={user?.photoURL!} alt="Photo" className="rounded-full mt-3 object-cover" width={135} height={135} />
                <div className="font-bold text-lg">{user?.displayName}</div>
                <div>{user?.email}</div>
                <button className="bg-gray-600 dashboard__btn rounded-full flex gap-1 items-center justify-center" onClick={logout}>
                    <HiOutlineLogout size={26} /> Logout
                </button>
                <button className="bg-link dashboard__btn rounded-full flex gap-1 items-center justify-center" onClick={() => navigate.back()}>
                    <RiArrowGoBackFill size={23} /> Return
                </button>
            </div>
        </div>
    );
}
export default DashboardComponent;