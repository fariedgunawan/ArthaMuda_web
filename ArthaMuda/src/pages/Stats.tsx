import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import background from "../assets/bg-img.png";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

const Stats = () => {
  const [transactions, setTransactions] = useState<any>({ totalIncome: 0, totalOutcome: 0 });
  const [spendingPercentage, setSpendingPercentage] = useState<number>(0);
  const [status, setStatus] = useState<string>("boros");

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      // Fetch balance (total income and outcome)
      axios
        .get("http://localhost:3000/api/transactions/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setTransactions(response.data.data);
          } else {
            console.error("Error fetching transactions:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });

      // Fetch analysis (spending percentage and status)
      axios
        .get("http://localhost:3000/api/transactions/analysis", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setSpendingPercentage(response.data.data.spendingPercentage);
            setStatus(response.data.data.status);
          } else {
            console.error("Error fetching analysis:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching analysis:", error);
        });
    }
  }, []);

  // Currency formatting function
  const formatCurrency = (amount: number) => {
    return `Rp.${amount.toLocaleString("id-ID")}`; // Format with 'Rp.' prefix
  };

  return (
    <div className="bg-cover bg-no-repeat min-h-screen flex flex-col" style={{ backgroundImage: `url(${background})` }}>
      <div className="container px-4 py-5 flex flex-col gap-6">
        <div className="head mt-6 flex flex-row justify-between items-center">
          <h2 className="font-semibold text-3xl text-[#3339B4]">Stats</h2>
          <FaUserCircle className="text-4xl text-[#3339B4]" />
        </div>

        <div className="view-stats flex justify-center mt-6">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: spendingPercentage, label: "Outcome" },
                  { id: 1, value: 100 - spendingPercentage, label: "Income" },
                ],
              },
            ]}
            width={450}
            height={250}
            colors={["#df0e1d", "#0e93df"]} // Custom colors for better visibility
          />
        </div>

        <div className="view-caption text-center mt-[40px]">
          <h2 className="text-xl font-semibold text-[#3339B4]">Total Pemasukan Income</h2>
          <h3 className="text-2xl text-[#0e93df]">{formatCurrency(transactions.totalIncome)}</h3>

          <h2 className="text-xl font-semibold text-[#3339B4] mt-4">Total Pengeluaran Outcome</h2>
          <h3 className="text-2xl text-[#df0e1d]">{formatCurrency(transactions.totalOutcome)}</h3>

          <h2 className="text-xl font-semibold text-[#3339B4] mt-[40px]">Anda dinyatakan:</h2>
          <h3 className={`text-2xl font-bold ${status === "boros" ? "text-[#df0e1d]" : "text-[#0e93df]"}`}>{status === "boros" ? "Boros!" : "Hemat!"}</h3>
        </div>
      </div>
    </div>
  );
};

export default Stats;
