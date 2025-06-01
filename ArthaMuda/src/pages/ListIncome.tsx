import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import background from "../assets/bg-img.png";
import incomeIcon from "../assets/income.png";
import axios from "axios";

const ListIncome = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getTokenFromCookies = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  };

  const fetchIncomeTransactions = async () => {
    const token = getTokenFromCookies();
    if (!token) {
      navigate("/");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/api/transactions/income", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        const sortedTransactions = response.data.data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setTransactions(sortedTransactions);
      } else {
        console.error("Error fetching income transactions:", response.data.message);
        setError("Failed to load income transactions.");
      }
    } catch (err) {
      console.error("Error fetching income transactions:", err);
      setError("Failed to load income transactions. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeTransactions();
  }, [navigate]);

  // Currency formatting function
  const formatCurrency = (amount: number) => {
    return `Rp. ${amount.toLocaleString("id-ID")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-500"></div>
        <p className="text-xl text-gray-700 mt-4">Loading your income transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-700 font-sans p-6">
        <p className="text-xl text-center mb-4">{error}</p>
        <button onClick={fetchIncomeTransactions} className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center font-sans relative flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${background})` }}>
      {/* Overlay for background blur/darken effect */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      {/* Main Container - wider for desktop */}
      <div className="relative z-10 w-full max-w-4xl mx-auto transform transition-all duration-300 ease-in-out animate-scale-in">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 md:p-8 text-white flex justify-between items-center rounded-t-3xl shadow-xl mb-8">
          <IoArrowBackOutline className="text-3xl lg:text-4xl cursor-pointer hover:text-green-200 transition-colors duration-200" onClick={() => navigate("/Dashboard")} title="Go back to Dashboard" />
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Income List</h2>
          <FaUserCircle className="text-3xl lg:text-4xl text-green-200" />
        </div>

        {/* Transaction List */}
        <div className="card-scroll bg-white rounded-3xl shadow-2xl p-6 md:p-8 h-[calc(100vh-220px)] overflow-y-auto custom-scrollbar animate-slide-up-initial">
          {transactions.length > 0 ? (
            transactions.map((transaction: any) => (
              <div
                key={transaction.id}
                // You might want to navigate to a specific income detail page if implemented
                onClick={() => navigate(`/${transaction.id}`)}
                className={`flex justify-between items-center p-4 mb-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 ease-in-out
                  bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700
                  text-white transform hover:scale-[1.01]`}
              >
                <div className="flex items-center space-x-4">
                  <img src={incomeIcon} className="w-12 h-12 p-2 rounded-full bg-white bg-opacity-20 flex-shrink-0" alt="Income" />
                  <div>
                    <h3 className="font-semibold text-xl">{transaction.name}</h3>
                    <p className="text-lg opacity-90">+ {formatCurrency(transaction.amount)}</p>
                  </div>
                </div>
                <div className="text-sm text-right opacity-90 flex-shrink-0">
                  <p>{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-lg py-10">No income transactions recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListIncome;
