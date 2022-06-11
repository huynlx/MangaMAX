import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { HiOutlineLogout } from "react-icons/hi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { handleLogout } from '@/store/action';

const DashboardComponent: React.FC = () => {
    const { reducer4: { user } } = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    const navigate = useRouter();

    useEffect(() => {
        if (!user) navigate.push("/");
    }, [user]);

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as
                {
                    user?.photoURL ?
                        <img src={user?.photoURL!} alt="Photo" className="rounded-full mt-3 object-cover" width={135} height={135} />
                        :
                        <div className='text-black w-[135px] h-[135px] rounded-full bg-white flex justify-center items-center font-bold text-4xl !mt-3 self-center'>
                            {user?.displayName?.slice(0, 1).toUpperCase()}
                        </div>
                }
                <div className="font-bold text-lg">{user?.displayName}</div>
                <div>{user?.email}</div>
                <button className="bg-gray-600 hover:bg-gray-700 dashboard__btn duration-150 rounded-full flex gap-1 items-center justify-center" onClick={() => dispatch(handleLogout())}>
                    <HiOutlineLogout size={26} /> Logout
                </button>
                {/* <button className="bg-red-500 hover:bg-red-700 duration-150 dashboard__btn rounded-full flex gap-1 items-center justify-center" onClick={() => navigate.back()}>
                    <RiArrowGoBackFill size={23} /> Return
                </button> */}
            </div>
        </div>
    );
}
export default DashboardComponent;