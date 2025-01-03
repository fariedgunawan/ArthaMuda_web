import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import background from "../assets/bg-img.png";
import income from "../assets/income.png";
import outcome from "../assets/outcome.png";
const EditIncome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]); 

  const handleUpdate = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      alert("Please log in first");
      return;
    }

    axios
      .put(
        `http://localhost:3000/api/transactions/${id}`,
        { name: title, amount: parseFloat(amount), date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Transaction updated successfully");
        navigate("/ListTransaction");
      })
      .catch((error) => {
        console.error("Error updating transaction:", error);
        alert("Failed to update transaction");
      });
  };

  const handleDelete = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      alert("Please log in first");
      return;
    }

    axios
      .delete(`http://localhost:3000/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Transaction deleted successfully");
        navigate("/ListTransaction");
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
        alert("Failed to delete transaction");
      });
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token && id) {
      axios
        .get("http://localhost:3000/api/transactions/income", {
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

      axios
        .get(`http://localhost:3000/api/transactions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            const { name, amount, date } = response.data.data;
            setTitle(name);
            setAmount(amount);
            setDate(new Date(date).toISOString().split("T")[0]);
          } else {
            console.error("Error fetching transaction:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching transaction:", error);
        });
    }
  }, []);
  return (
    <div className="bg-cover bg-no-repeat min-h-screen" style={{ backgroundImage: `url(${background})` }}>
      <div className="body flex flex-col">
        <div className="head bg-[#3339B4] flex flex-col rounded-b-[30px] pb-[20px] px-[16px] pt-[30px]">
          <div className="hello flex flex-row items-center justify-between text-white">
            <h2 className="text-[25px] font-semibold">Edit Income</h2>
            <FaUserCircle className="text-[30px]" />
          </div>
          <div className="input flex flex-col gap-[30px] text-white mt-[40px]">
            <div className="input-caption flex flex-row items-center gap-[10px]">
              <h2 className="text-[20px]">Title</h2>
              <input type="text" placeholder="Input Title Here.." className=" text-[16px] bg-transparent outline-none border-b-2 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-caption flex flex-row items-center gap-[10px]">
              <h2 className="text-[20px]">Rp.</h2>
              <input type="number" placeholder="Input Balance Here.." className=" text-[16px] bg-transparent outline-none border-b-2 w-full" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="input-caption flex flex-row items-center gap-[10px]">
              <h2 className="text-[20px]">Date</h2>
              <input type="date" placeholder="Input Balance Here.." className=" text-[16px] bg-transparent outline-none border-b-2 w-full" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
          <div className="container-button-add flex flex-row items-center justify-between mt-[20px]">
            <button className="flex text-red-500 font-semibold text-[20px]" onClick={handleDelete}>
              Delete
            </button>
            <button className="flex text-white font-semibold text-[20px]" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>

        <div className="list-data mt-[30px] flex flex-col px-[16px]">
          <div className="head-data flex flex-row items-center justify-between">
            <h2 className="font-bold text-[20px] text-[#3339B4]">Last Income</h2>
            <h2 className="font-medium text-[16px] text-[#3339B4]">See More</h2>
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

export default EditIncome;
