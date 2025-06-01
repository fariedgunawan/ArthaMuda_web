import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import background from "../assets/bg-img.png";
import incomeIcon from "../assets/income.png";
import outcomeIcon from "../assets/outcome.png";
import axios from "axios";

const ListTransaction = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "income" | "outcome">("all");
  const [sortBy, setSortBy] = useState<"date_desc" | "date_asc" | "amount_desc" | "amount_asc">("date_desc");

  const getTokenFromCookies = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  };

  const fetchTransactions = async () => {
    const token = getTokenFromCookies();
    if (!token) {
      navigate("/");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setTransactions(response.data.data);
        setFilteredTransactions(response.data.data);
      } else {
        console.error("Error fetching transactions:", response.data.message);
        setError("Failed to load transactions.");
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [navigate]);

  useEffect(() => {
    let currentTransactions = [...transactions];

    if (filterType !== "all") {
      currentTransactions = currentTransactions.filter((t) => t.type === filterType);
    }

    // Apply sorting
    currentTransactions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      const amountA = parseFloat(a.amount);
      const amountB = parseFloat(b.amount);

      switch (sortBy) {
        case "date_desc":
          return dateB - dateA;
        case "date_asc":
          return dateA - dateB;
        case "amount_desc":
          return amountB - amountA;
        case "amount_asc":
          return amountA - amountB;
        default:
          return 0;
      }
    });

    setFilteredTransactions(currentTransactions);
  }, [transactions, filterType, sortBy]);

  // Currency formatting function
  const formatCurrency = (amount: number) => {
    return `Rp. ${amount.toLocaleString("id-ID")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="text-xl text-gray-700 mt-4">Loading your transaction history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-700 font-sans p-6">
        <p className="text-xl text-center mb-4">{error}</p>
        <button
          onClick={fetchTransactions} // Retry fetching data
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center font-sans relative flex items-center justify-center py-3 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${background})` }}>
      {/* Overlay for background blur/darken effect */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      {/* Main Container - wider for desktop */}
      <div className="relative z-10 w-full max-w-4xl mx-auto transform transition-all duration-300 ease-in-out animate-scale-in">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white flex justify-between items-center rounded-t-3xl shadow-xl mb-5">
          <IoArrowBackOutline className="text-3xl lg:text-4xl cursor-pointer hover:text-blue-200 transition-colors duration-200" onClick={() => navigate("/Dashboard")} title="Go back to Dashboard" />
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">All Transactions</h2>
          <FaUserCircle className="text-3xl lg:text-4xl text-blue-200" />
        </div>

        {/* Filters and Sort Options */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="filterType" className="block text-gray-700 font-medium mb-1">
              Filter by Type:
            </label>
            <select id="filterType" className="w-full sm:w-40 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={filterType} onChange={(e) => setFilterType(e.target.value as typeof filterType)}>
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="outcome">Outcome</option>
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <label htmlFor="sortBy" className="block text-gray-700 font-medium mb-1">
              Sort by:
            </label>
            <select id="sortBy" className="w-full sm:w-48 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
              <option value="date_desc">Date (Newest First)</option>
              <option value="date_asc">Date (Oldest First)</option>
              <option value="amount_desc">Amount (Highest First)</option>
              <option value="amount_asc">Amount (Lowest First)</option>
            </select>
          </div>
        </div>

        {/* Transaction List */}
        <div className="card-scroll bg-white rounded-3xl shadow-2xl p-6 md:p-8 h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar animate-slide-up-initial">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction: any) => (
              <div
                key={transaction.id}
                // Placeholder for navigating to detail page. Adjust route as needed.
                onClick={() => navigate(`/${transaction.id}`)}
                className={`flex justify-between items-center p-4 mb-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 ease-in-out
                  ${
                    transaction.type === "income" ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  } text-white transform hover:scale-[1.01]`}
              >
                <div className="flex items-center space-x-4">
                  <img src={transaction.type === "income" ? incomeIcon : outcomeIcon} className="w-12 h-12 p-2 rounded-full bg-white bg-opacity-20 flex-shrink-0" alt={transaction.type} />
                  <div>
                    <h3 className="font-semibold text-xl">{transaction.name}</h3>
                    <p className="text-lg opacity-90">
                      {transaction.type === "income" ? "+" : "-"} {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-right opacity-90 flex-shrink-0">
                  <p>{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-lg py-10">No transactions found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListTransaction;
