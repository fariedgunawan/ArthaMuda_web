import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import background from "../assets/bg-img.png";
import income from "../assets/income.png";
import outcome from "../assets/outcome.png";
import stats from "../assets/stats.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch user data
        const userResponse = await axios.get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(userResponse.data.username.split("@")[0]);

        // Fetch balance
        const balanceResponse = await axios.get("http://localhost:3000/api/transactions/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (balanceResponse.data.success) {
          setBalance(balanceResponse.data.data.balance);
          setLastUpdate(new Date().toLocaleString());
        } else {
          console.error("Error fetching balance:", balanceResponse.data.message);
          setError("Failed to load balance.");
        }

        // Fetch transactions
        const transactionsResponse = await axios.get("http://localhost:3000/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (transactionsResponse.data.success) {
          setTransactions(transactionsResponse.data.data.slice(0, 3));
        } else {
          console.error("Error fetching transactions:", transactionsResponse.data.message);
          setError("Failed to load transactions.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      navigate("/");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        <p className="text-lg text-gray-700 ml-4">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700">
        <p className="text-xl">{error}</p>
        <button onClick={() => window.location.reload()} className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center font-sans" style={{ backgroundImage: `url(${background})` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-3xl p-6 md:p-8 text-white flex justify-between items-center shadow-xl animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Welcome, {username || "User"}!</h1>
          <div className="flex items-center space-x-5">
            <IoLogOutOutline className="text-3xl md:text-4xl cursor-pointer text-red-300 hover:text-red-100 transition-colors duration-300" onClick={handleLogout} title="Logout" />
            <FaUserCircle className="text-4xl md:text-5xl text-purple-200" />
          </div>
        </header>

        {/* Balance Section */}
        <section className="mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-200">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Your Current Balance</h2>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <p className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-3 sm:mb-0">Rp. {balance !== null ? balance.toLocaleString() : "..."}</p>
            <button onClick={() => navigate("/ListTransaction")} className="px-5 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium hover:bg-indigo-200 transition-colors duration-300 shadow-md">
              See All Transactions
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4 italic">Last updated: {lastUpdate || "..."}</p>
        </section>

        {/* Action Buttons Section */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/AddIncome")}
            className="bg-white cursor-pointer p-6 rounded-2xl flex flex-col items-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-green-100"
          >
            <img src={income} className="w-16 h-16 mb-3 opacity-90" alt="Income" />
            <span className="text-lg font-bold text-green-700">Add Income</span>
          </div>
          <div
            onClick={() => navigate("/AddOutcome")}
            className="bg-white cursor-pointer p-6 rounded-2xl flex flex-col items-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-red-100"
          >
            <img src={outcome} className="w-16 h-16 mb-3 opacity-90" alt="Outcome" />
            <span className="text-lg font-bold text-red-700">Add Outcome</span>
          </div>
          <div
            onClick={() => navigate("/stats")}
            className="bg-white cursor-pointer p-6 rounded-2xl flex flex-col items-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-blue-100"
          >
            <img src={stats} className="w-16 h-16 mb-3 opacity-90" alt="Stats" />
            <span className="text-lg font-bold text-blue-700">View Statistics</span>
          </div>
        </section>

        {/* Recent Transactions Section */}
        <section className="mt-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-indigo-800">Recent Transactions</h2>
            <button className="text-md text-indigo-700 font-semibold hover:text-indigo-900 transition-colors duration-300" onClick={() => navigate("/ListTransaction")}>
              See More &rarr;
            </button>
          </div>

          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`flex justify-between items-center p-5 rounded-xl shadow-md transition-all duration-300 ease-in-out
                    ${
                      transaction.type === "income" ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    } text-white transform hover:scale-[1.02]`}
                >
                  <div className="flex items-center space-x-4">
                    <img src={transaction.type === "income" ? income : outcome} className="w-12 h-12 rounded-full p-2 bg-white bg-opacity-20" alt={transaction.name} />
                    <div>
                      <h3 className="font-semibold text-xl">{transaction.name}</h3>
                      <p className="text-lg opacity-90">
                        {transaction.type === "income" ? "+" : "-"} Rp. {parseFloat(transaction.amount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-right opacity-90">
                    <p>{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500 text-lg">No recent transactions. Start adding some!</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
