import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "shared/firebase";
import { useRouter } from "next/router";
import { query, collection, where, getDocs } from "firebase/firestore";
function Dashboard() {
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
        if (!user) navigate.push("/login");
        fetchUserName();
    }, [user, loading]);
    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as
                <div>{name}</div>
                <div>{user?.email}</div>
                <button className="dashboard__btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
export default Dashboard;