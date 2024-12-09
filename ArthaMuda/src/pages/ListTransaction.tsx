import income from "../assets/income.png";
import { FaUserCircle } from "react-icons/fa";
import background from "../assets/bg-img.png";

const ListTransaction = () => {
  return (
    <div className="bg-cover bg-no-repeat min-h-screen flex flex-col" style={{ backgroundImage: `url(${background})` }}>
      <div className="container px-[16px] flex flex-col gap-[13px]">
        <div className="head mt-[30px] flex flex-row justify-between items-center">
          <h2 className="font-semibold text-[25px] text-[#3339B4]">Details</h2>
          <FaUserCircle className="text-[30px] text-[#3339B4]" />
        </div>

        <div className="card-scroll h-[90vh] overflow-y-auto">
          <div className="card-container flex flex-col gap-[10px]">
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

export default ListTransaction;
