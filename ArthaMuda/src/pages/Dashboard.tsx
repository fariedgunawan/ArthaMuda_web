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

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      axios
        .get("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const username = response.data.username;
          setUsername(username.split("@")[0]);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      axios
        .get("http://localhost:3000/api/transactions/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setBalance(response.data.data.balance);
            const updatedAt = new Date().toLocaleString(); 
            setLastUpdate(updatedAt);
          } else {
            console.error("Error fetching balance:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching balance:", error);
        });

      axios
        .get("http://localhost:3000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setTransactions(response.data.data.slice(0, 4));
          } else {
            console.error("Error fetching transactions:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      navigate("/");
      return;
    }

    axios
      .post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        alert("Failed to log out");
      });
  };

  return (
    <div className="bg-cover bg-no-repeat min-h-screen" style={{ backgroundImage: `url(${background})` }}>
      <div className="body flex flex-col">
        <div className="head bg-[#3339B4] rounded-b-[30px] pb-[80px] px-[16px] pt-[30px]">
          <div className="hello flex flex-row items-center justify-between text-white">
            <h2 className="text-[25px] font-semibold">Hello {username || "User"}..</h2>
            <div className="profile gap-[20px] flex flex-row items-center">
              <IoLogOutOutline className="text-[35px] text-red-600" onClick={handleLogout} />
              <FaUserCircle className="text-[30px]" />
            </div>
          </div>
          <div className="balance flex flex-col text-white mt-[40px]">
            <h2 className="font-medium text-[22px]">You have</h2>
            <div className="balance mt-[10px] flex flex-row items-center justify-between">
              <h2 className="text-[25px] font-extrabold">Rp. {balance ? balance.toLocaleString() : "Loading..."}</h2>
              <h2 onClick={() => navigate("/ListTransaction")}>See Details</h2>
            </div>
            <h2 className="text-[16px] mt-[10px]">{lastUpdate || "Loading..."}</h2>
          </div>
        </div>
        <div className="card-navigator flex flex-row items-center -mt-[60px] justify-center gap-[50px] mx-[30px] rounded-2xl py-[8px] bg-white">
          <div className="card-1 flex flex-col items-center" onClick={() => navigate("/AddIncome")}>
            <img src={income} className="w-[40px]" alt="" />
            <h2 className="mt-[10px] font-medium text-[#3339B4]">Income</h2>
          </div>
          <div className="card-1 flex flex-col items-center" onClick={() => navigate("/AddOutcome")}>
            <img src={outcome} className="w-[40px]" alt="" />
            <h2 className="mt-[12px] font-medium text-[#3339B4]">Outcome</h2>
          </div>
          <div className="card-1 flex flex-col items-center">
            <img src={stats} className="w-[40px]" alt="" />
            <h2 className="mt-[12px] font-medium text-[#3339B4]">Stats</h2>
          </div>
        </div>

        <div className="list-data mt-[30px] flex flex-col px-[16px]">
          <div className="head-data flex flex-row items-center justify-between">
            <h2 className="font-bold text-[20px] text-[#3339B4]">Recent</h2>
            <h2 className="font-medium text-[16px] text-[#3339B4]" onClick={() => navigate("/ListTransaction")}>
              See More
            </h2>
          </div>
          <div className="container-card-list flex flex-col gap-[10px] mt-[20px]">
            {transactions.map((transaction) => (
              <div key={transaction.id} className={`card-1 flex flex-row justify-between items-center px-[16px] py-[15px] rounded-2xl ${transaction.type === "income" ? "bg-[#3339B4]" : "bg-[#3339B4]"}`}>
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
    </div>
  );
};

export default Dashboard;
