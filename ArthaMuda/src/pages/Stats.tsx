import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import background from "../assets/bg-img.png"; 
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Stats = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState({ totalIncome: 0, totalOutcome: 0 });
  const [spendingPercentage, setSpendingPercentage] = useState<number>(0);
  const [status, setStatus] = useState<string>("Loading...");
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
        
        const balanceResponse = await axios.get("http://localhost:3000/api/transactions/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (balanceResponse.data.success) {
          setTransactions(balanceResponse.data.data);
        } else {
          console.error("Error fetching balance:", balanceResponse.data.message);
          setError("Failed to load balance data.");
        }

        
        const analysisResponse = await axios.get("http://localhost:3000/api/transactions/analysis", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (analysisResponse.data.success) {
          setSpendingPercentage(analysisResponse.data.data.spendingPercentage);
          setStatus(analysisResponse.data.data.status);
        } else {
          console.error("Error fetching analysis:", analysisResponse.data.message);
          setError("Failed to load spending analysis.");
        }
      } catch (err) {
        console.error("Error fetching stats data:", err);
        setError("Failed to load statistics. Please check your network or try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Currency formatting function
  const formatCurrency = (amount: number) => {
    return `Rp. ${amount.toLocaleString("id-ID")}`; 
  };

  // Prepare data for PieChart
  const pieChartData = [
    { id: 0, value: spendingPercentage, label: "Outcome" },
    { id: 1, value: 100 - spendingPercentage, label: "Income" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="text-xl text-gray-700 mt-4">Loading your financial insights...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-700 font-sans p-6">
        <p className="text-xl text-center mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()} 
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200"
        >
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 md:p-8 text-white flex justify-between items-center rounded-t-3xl shadow-xl mb-8">
          <IoArrowBackOutline className="text-3xl lg:text-4xl cursor-pointer hover:text-purple-200 transition-colors duration-200" onClick={() => navigate("/Dashboard")} title="Go back to Dashboard" />
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Your Financial Stats</h2>
          <FaUserCircle className="text-3xl lg:text-4xl text-purple-200" />
        </div>

        {/* Content Area - Two Columns for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col items-center justify-center animate-slide-up-initial">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Spending vs. Income</h3>
            {transactions.totalIncome > 0 || transactions.totalOutcome > 0 ? (
              <PieChart
                series={[
                  {
                    data: pieChartData,
                    arcLabel: (item) => `${item.label} (${item.value.toFixed(1)}%)`, // Show label and percentage
                    outerRadius: 100, // Adjust size
                    innerRadius: 60, // Make it a donut chart
                    paddingAngle: 3, // Small gap between slices
                    cornerRadius: 5, // Rounded corners for slices
                    startAngle: -90,
                    endAngle: 270,
                  },
                ]}
                width={380} // Increased width for better display
                height={280} // Increased height
                colors={["#ef4444", "#3b82f6"]} // Red for outcome, Blue for income (Tailwind defaults: red-500, blue-500)
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }} // Reduce margins
                slotProps={{
                  legend: {
                    direction: "row",
                    position: { vertical: "bottom", horizontal: "middle" },
                    padding: 10,
                    labelStyle: {
                      fontSize: 14,
                      fontWeight: "bold",
                      fill: "#333",
                    },
                  },
                }}
              />
            ) : (
              <div className="text-center text-gray-500 text-lg py-10">No data to display in chart. Add some transactions!</div>
            )}
          </div>

          {/* Key Metrics and Status Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 animate-slide-up-initial">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Summary</h3>

            <div className="space-y-5">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex justify-between items-center shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">Total Income</h4>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(transactions.totalIncome)}</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex justify-between items-center shadow-sm">
                <h4 className="text-lg font-semibold text-red-800">Total Outcome</h4>
                <p className="text-xl font-bold text-red-600">{formatCurrency(transactions.totalOutcome)}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
                <h4 className="text-lg font-semibold text-gray-800">Spending Percentage</h4>
                <p className="text-xl font-bold text-gray-800">{spendingPercentage.toFixed(1)}%</p>
              </div>
            </div>

            <div className="mt-8 text-center bg-indigo-50 p-6 rounded-lg shadow-inner">
              <h4 className="text-xl font-semibold text-indigo-800 mb-3">Your Spending Status:</h4>
              <p className={`text-4xl font-extrabold tracking-wide ${status === "boros" ? "text-red-600 animate-pulse-once" : "text-green-600"}`}>{status === "boros" ? "Boros!" : "Hemat!"}</p>
              <p className="text-gray-600 mt-2 text-md">{status === "boros" ? "Time to review your spending habits!" : "Excellent! Keep up the great work managing your finances."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
