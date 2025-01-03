import income from "../assets/income.png";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/bg-img.png";
import outcome from "../assets/outcome.png";
import axios from "axios";

const ListOutcome = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      axios
        .get("http://localhost:3000/api/transactions/outcome", {
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
    }
  }, []);

  return (
    <div className="bg-cover bg-no-repeat min-h-screen flex flex-col" style={{ backgroundImage: `url(${background})` }}>
      <div className="container px-[16px] flex flex-col gap-[13px]">
        <div className="head mt-[30px] flex flex-row justify-between items-center">
          <h2 className="font-semibold text-[25px] text-[#3339B4]">Outcome List</h2>
          <FaUserCircle className="text-[30px] text-[#3339B4]" />
        </div>

        <div className="card-scroll h-[90vh] flex flex-col gap-[10px] overflow-y-auto">
          {transactions.map((transaction: any) => (
            <div
              key={transaction.id}
              onClick={() => navigate(`/${transaction.id}`)} // Navigate to the transaction page
              className={`card-1 flex flex-row justify-between items-center px-[16px] py-[15px] rounded-2xl cursor-pointer ${
                transaction.type === "income" ? "bg-[#3339B4]" : "bg-[#3339B4]"
              }`}
            >
              <div className="right-side flex flex-row items-center gap-[20px]">
                <img src={transaction.type === "income" ? income : outcome} className="w-[50px]" alt="" />
                <div className="caption-data flex flex-col gap-[5px] items-start">
                  <h2 className="text-white font-semibold text-[18px]">{transaction.name}</h2>
                  <h2 className="text-white">
                    {transaction.type === "income" ? "+" : "-"} Rp. {parseFloat(transaction.amount).toLocaleString()}
                  </h2>
                </div>
              </div>
              <div className="left-side flex flex-col items-end text-white text-[12px]">
                <h2>{new Date(transaction.date).toLocaleDateString()}</h2>
                <h2>{new Date(transaction.date).toLocaleTimeString()}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOutcome;
