import React, { use, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import AdminDashBoard from "./AdminDashBoard";
import BuyerDashboard from "./BuyerDashboard";
import WorkerDashboard from "./WorkerDashboard";
import axios from "axios";
import Loading from "../../Shared/Components/Loader/Loading";


const DashboardRouter = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");
    const [coin, setCoin] = useState(0);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const adminRes = await axios.get(`https://micronomy.vercel.app/alladmins/${user.email}`);
                if (adminRes.data.length > 0) {
                    setRole("admin");
                    setCoin(adminRes.data[0].coins)
                    setLoading(false);
                    return;
                }
                const buyerRes = await axios.get(`https://micronomy.vercel.app/allbuyers/${user.email}`);
                if (buyerRes.data.length > 0) {
                    setRole("buyer");
                    setCoin(buyerRes.data[0].coins)
                    setLoading(false);
                    return;
                }
                const workerRes = await axios.get(`https://micronomy.vercel.app/allworkers/${user.email}`);
                if (workerRes.data.length > 0) {
                    setRole("worker");
                    setCoin(workerRes.data[0].coins)
                    setLoading(false);
                    return;
                }
                
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        if (user?.email) {
            fetchRole();
        }
    }, [user.email]);

  if (loading) return <Loading/>;

  if (role === "admin") return <AdminDashBoard coin = {coin} />;
  if (role === "buyer") return <BuyerDashboard coin = {coin} />;
  if (role === "worker") return <WorkerDashboard coin = {coin} />;

  return <p className="text-red-500 text-center mt-10">Unknown Role</p>;
};

export default DashboardRouter;
