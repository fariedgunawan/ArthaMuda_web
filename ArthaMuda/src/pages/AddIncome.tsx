import { FaUserCircle } from "react-icons/fa";
import background from "../assets/bg-img.png";
import income from "../assets/income.png";
const AddIncome = () => {
  return (
    <div className="bg-cover bg-no-repeat min-h-screen" style={{ backgroundImage: `url(${background})` }}>
      <div className="body flex flex-col">
        <div className="head bg-[#3339B4] flex flex-col rounded-b-[30px] pb-[20px] px-[16px] pt-[30px]">
          <div className="hello flex flex-row items-center justify-between text-white">
            <h2 className="text-[25px] font-semibold">Add Income</h2>
            <FaUserCircle className="text-[30px]" />
          </div>
          <div className="input flex flex-col gap-[30px] text-white mt-[40px]">
            <div className="input-caption flex flex-row items-center gap-[10px]">
              <h2 className="text-[20px]">Title</h2>
              <input type="text" placeholder="Input Title Here.." className=" text-[16px] bg-transparent outline-none border-b-2 w-full" />
            </div>
            <div className="input-caption flex flex-row items-center gap-[10px]">
              <h2 className="text-[20px]">Rp.</h2>
              <input type="number" placeholder="Input Balance Here.." className=" text-[16px] bg-transparent outline-none border-b-2 w-full" />
            </div>
            <div className="input-caption flex flex-row items-center gap-[10px]">
              <h2 className="text-[20px]">Date</h2>
              <input type="date" placeholder="Input Balance Here.." className=" text-[16px] bg-transparent outline-none border-b-2 w-full" />
            </div>
          </div>
          <button className="flex justify-end text-white font-semibold text-[20px] mt-[20px]">Add +</button>
        </div>

        <div className="list-data mt-[30px] flex flex-col px-[16px]">
          <div className="head-data flex flex-row items-center justify-between">
            <h2 className="font-bold text-[20px] text-[#3339B4]">Last Income</h2>
            <h2 className="font-medium text-[16px] text-[#3339B4]">See More</h2>
          </div>
          <div className="container-card-list flex flex-col gap-[10px] mt-[20px]">
            <div className="card-1 bg-[#3339B4] flex flex-row justify-between items-center px-[16px] py-[15px] rounded-2xl">
              <div className="right-side flex flex-row items-center gap-[20px]">
                <img src={income} className="w-[50px]" alt="" />
                <div className="caption-data flex flex-col gap-[5px] items-start">
                  <h2 className="text-white font-semibold text-[18px]">Uang Jajan</h2>
                  <h2 className="text-[#11FFC6]">+ Rp. 300.000,00</h2>
                </div>
              </div>
              <div className="left-side flex flex-col items-end text-white text-[12px]">
                <h2>12/02/2024</h2>
                <h2>13.00</h2>
              </div>
            </div>
            <div className="card-1 bg-[#3339B4] flex flex-row justify-between items-center px-[16px] py-[15px] rounded-2xl">
              <div className="right-side flex flex-row items-center gap-[20px]">
                <img src={income} className="w-[50px]" alt="" />
                <div className="caption-data flex flex-col gap-[5px] items-start">
                  <h2 className="text-white font-semibold text-[18px]">Gaji</h2>
                  <h2 className="text-[#11FFC6]">+ Rp. 2.000.000,00</h2>
                </div>
              </div>
              <div className="left-side flex flex-col items-end text-white text-[12px]">
                <h2>12/02/2024</h2>
                <h2>13.00</h2>
              </div>
            </div>
            <div className="card-1 bg-[#3339B4] flex flex-row justify-between items-center px-[16px] py-[15px] rounded-2xl">
              <div className="right-side flex flex-row items-center gap-[20px]">
                <img src={income} className="w-[50px]" alt="" />
                <div className="caption-data flex flex-col gap-[5px] items-start">
                  <h2 className="text-white font-semibold text-[18px]">Lunasin</h2>
                  <h2 className="text-[#11FFC6]">+ Rp. 100.000,00</h2>
                </div>
              </div>
              <div className="left-side flex flex-col items-end text-white text-[12px]">
                <h2>12/02/2024</h2>
                <h2>13.00</h2>
              </div>
            </div>
            <div className="card-1 bg-[#3339B4] flex flex-row justify-between items-center px-[16px] py-[15px] rounded-2xl">
              <div className="right-side flex flex-row items-center gap-[20px]">
                <img src={income} className="w-[50px]" alt="" />
                <div className="caption-data flex flex-col gap-[5px] items-start">
                  <h2 className="text-white font-semibold text-[18px]">Uang Jajan</h2>
                  <h2 className="text-[#11FFC6]">+ Rp. 500.000,00</h2>
                </div>
              </div>
              <div className="left-side flex flex-col items-end text-white text-[12px]">
                <h2>12/02/2024</h2>
                <h2>13.00</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;
