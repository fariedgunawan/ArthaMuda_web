import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5"; 
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import background from "../assets/bg-img.png";

const EditIncome = () => {
  const { id } = useParams(); // Get transaction ID from URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [transactionType, setTransactionType] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getTokenFromCookies = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  };

  // Function to fetch the specific transaction by ID
  const fetchTransactionById = async (token: string, transactionId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/transactions/${transactionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        const { name, amount, date, type } = response.data.data;
        setTitle(name);
        setAmount(amount.toString()); 
        setDate(new Date(date).toISOString().split("T")[0]); 
        setTransactionType(type);
      } else {
        console.error("Error fetching transaction details:", response.data.message);
        setError("Failed to load transaction details.");
      }
    } catch (err) {
      console.error("Error fetching transaction details:", err);
      setError("Failed to load transaction details. Please check your network.");
    }
  };

  useEffect(() => {
    const token = getTokenFromCookies();
    if (!token) {
      navigate("/");
      return;
    }

    if (!id) {
      setError("No transaction ID provided.");
      setPageLoading(false);
      return;
    }

    const loadPageData = async () => {
      setPageLoading(true);
      setError(null);
      await fetchTransactionById(token, id); 
      setPageLoading(false);
    };

    loadPageData();
  }, [id, navigate]); 

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getTokenFromCookies();
    if (!token) {
      alert("Please log in first.");
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
    try {
      await axios.put(
        `http://localhost:3000/api/transactions/${id}`,
        { name: title, amount: parsedAmount, date, type: transactionType }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Transaction updated successfully!");
      navigate("/ListTransaction"); 
    } catch (err) {
      console.error("Error updating transaction:", err);
      setError("Failed to update transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this transaction? This action cannot be undone.")) {
      return; // User cancelled
    }

    const token = getTokenFromCookies();
    if (!token) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    setLoading(true); 
    setError(null);
    try {
      await axios.delete(`http://localhost:3000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Transaction deleted successfully!");
      navigate("/ListTransaction");
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError("Failed to delete transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-purple-500"></div>
        <p className="text-xl text-gray-700 mt-4">Loading transaction details...</p>
      </div>
    );
  }

  if (error && !id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-700 font-sans p-6">
        <p className="text-xl text-center mb-4">{error}</p>
        <button onClick={() => navigate("/ListTransaction")} className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200">
          Go to Transaction List
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center font-sans relative flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${background})` }}>
      {/* Overlay for background blur/darken effect */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      {/* Main Container - wider for desktop */}
      <div className="relative z-10 w-full max-w-lg mx-auto transform transition-all duration-300 ease-in-out animate-scale-in">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 md:p-8 text-white flex justify-between items-center rounded-t-3xl shadow-xl mb-8">
          <IoArrowBackOutline className="text-3xl lg:text-4xl cursor-pointer hover:text-purple-200 transition-colors duration-200" onClick={() => navigate("/ListTransaction")} title="Go back to All Transactions" />
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Edit {transactionType === "income" ? "Income" : "Outcome"}</h2>
          <FaUserCircle className="text-3xl lg:text-4xl text-purple-200" />
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-b-3xl shadow-2xl p-6 md:p-8 animate-slide-up-initial">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Modify Transaction</h3>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="input-group">
              <label htmlFor="title" className="block text-gray-700 text-lg font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Transaction Title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-800"
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
                placeholder="Transaction Amount"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-800"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-800"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-600 text-center text-sm bg-red-100 p-2 rounded-md animate-fade-in">{error}</p>}

            <div className="flex justify-between gap-4 mt-8">
              <button
                type="button" // Important: type="button" to prevent form submission
                className="w-1/2 py-3 bg-red-600 text-white font-bold text-xl rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span> : "Delete"}
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 bg-green-600 text-white font-bold text-xl rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditIncome;
