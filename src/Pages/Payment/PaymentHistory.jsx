import React, { useContext } from 'react';
import { AuthContext } from '../../Shared/Hooks/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTheme } from '../../Shared/Hooks/useTheme';
import Loading from '../../Shared/Components/Loader/Loading';
import AxiosToken from '../../Shared/Hooks/AxiosToken';

const PaymentHistory = () => {

  const { user } = useContext(AuthContext);
  const axiosInstance = AxiosToken();
    
    const { isPending , data: payments = [] } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/payments/${user?.email}`);
            return res.data;
        },
    });

    const currentTheme = useTheme();

    if (isPending) {
        return <Loading />;
    }

    return (
         <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-gray-500 text-center">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full table-auto  text-sm normal-font">
            <thead>
              <tr className="bg-yellow-400 text-gray-800 text-left">
                <th className="px-6 py-3">Coins</th>
                <th className="px-6 py-3">Price ($)</th>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((entry, index) => (
                <tr
                  key={index}
                  className={`border-b ${currentTheme === 'acid' ? "border-gray-00 hover:bg-gray-50 text-black" : "border-gray-600 hover:bg-gray-800 text-white"} ${(index % 2 == 1)? "bg-yellow-400/30" : "bg-base-200" } transition`}
                >
                  <td className="px-6 py-4 font-medium">{entry.coin}</td>
                  <td className="px-6 py-4">${entry.price}</td>
                  <td className="px-6 py-4 capitalize">{entry.method}</td>
                  <td className="px-6 py-4">{entry.date}</td>
                  <td className="px-6 py-4">{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
    );
};

export default PaymentHistory;