import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../assets/bg-img.png";
import incomeIcon from "../assets/income.png";

const AddIncome = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to get token from cookies
  const getTokenFromCookies = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getTokenFromCookies();

    if (!token) {
      alert("You need to be logged in to add income.");
      navigate("/login");
      return;
    }

    if (!title || !amount || !date) {
      setError("Please fill in all fields.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid positive amount.");
      return;
    }

    setLoading(true);
    setError(null);

    const incomeData = {
      type: "income",
      name: title,
      amount: parsedAmount,
      date: date,
    };

    try {
      await axios.post("http://localhost:3000/api/transactions", incomeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Income added successfully!");
      setTitle("");
      setAmount("");
      setDate("");
      await fetchRecentIncomes();
    } catch (err) {
      console.error("Error adding income:", err);
      setError("Failed to add income. Please try again. Check your connection or server status.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentIncomes = async () => {
    const token = getTokenFromCookies();
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/transactions/income", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setRecentTransactions(response.data.data.slice(0, 4));
      } else {
        console.error("Error fetching recent incomes:", response.data.message);
        setError("Failed to load recent incomes.");
      }
    } catch (err) {
      console.error("Error fetching recent incomes:", err);
      setError("Failed to load recent incomes. Please check your network.");
    }
  };

  useEffect(() => {
    setPageLoading(true);
    fetchRecentIncomes().finally(() => {
      setPageLoading(false);
    });
  }, [navigate]);

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500"></div>
        <p className="text-lg text-gray-700 ml-4">Loading incomes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center font-sans relative flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${background})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      {/* Main Container - wider for desktop */}
      <div className="relative z-10 w-full max-w-5xl mx-auto transform transition-all duration-300 ease-in-out animate-scale-in">
        {/* Header Section - Remains full width */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 md:p-8 text-white flex justify-between items-center rounded-t-3xl shadow-xl mb-8">
          <IoArrowBackOutline className="text-3xl lg:text-4xl cursor-pointer hover:text-green-100 transition-colors duration-200" onClick={() => navigate("/Dashboard")} title="Go back to Dashboard" />
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Add Income</h2>
          <FaUserCircle className="text-3xl lg:text-4xl text-green-100" />
        </div>

        {/* Content Area - Form and Recent Transactions side-by-side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 order-2 lg:order-1 animate-slide-up-initial">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Enter Income Details</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="input-group">
                <label htmlFor="title" className="block text-gray-700 text-lg font-semibold mb-2">
                  Income Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="e.g., Monthly Salary, Freelance Payment"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 text-gray-800"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="amount" className="block text-gray-700 text-lg font-semibold mb-2">
                  Amount (Rp.)
                </label>
                <input
                  type="number"
                  id="amount"
                  placeholder="e.g., 5000000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 text-gray-800"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="any"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="date" className="block text-gray-700 text-lg font-semibold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200 text-gray-800"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-red-600 text-center text-sm bg-red-100 p-2 rounded-md animate-fade-in">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-bold text-xl rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                    Adding Income...
                  </>
                ) : (
                  "Add Income"
                )}
              </button>
            </form>
          </div>

          {/* Recent Incomes Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 order-1 lg:order-2 animate-slide-up-initial">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-green-700">Recent Incomes</h3>
              <button className="text-sm text-green-600 font-semibold hover:text-green-800 transition-colors duration-200" onClick={() => navigate("/ListIncome")}>
                See More &rarr;
              </button>
            </div>

            <div className="space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-4 rounded-xl shadow-sm bg-green-50 text-green-800 border border-green-100 transform hover:scale-[1.01] transition-transform duration-200 animate-slide-up"
                  >
                    <div className="flex items-center space-x-4">
                      <img src={incomeIcon} className="w-10 h-10 p-1 bg-green-200 rounded-full flex-shrink-0" alt="Income icon" />
                      <div>
                        <h4 className="font-semibold text-lg">{transaction.name}</h4>
                        <p className="text-md">+ Rp. {parseFloat(transaction.amount).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-sm text-right text-green-700 flex-shrink-0">
                      <p>{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No recent incomes to display.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;
