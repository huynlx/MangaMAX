import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "shared/firebase";
import { useRouter } from "next/router";
import { query, collection, where, getDocs } from "firebase/firestore";

const DashboardComponent: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useRouter();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc && doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        if (loading) return;
        if (!user) navigate.push("/");
        fetchUserName();
    }, [user, loading]);
    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as
                <img src={user?.photoURL!} alt="Photo" className="rounded-full mt-3 object-cover" width={135} height={135} />
                <div className="font-bold text-lg">{name}</div>
                <div>{user?.email}</div>
                <button className="dashboard__btn rounded-full" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
export default DashboardComponent;