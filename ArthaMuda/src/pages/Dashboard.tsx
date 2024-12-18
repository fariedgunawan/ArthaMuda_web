import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import background from "../assets/bg-img.png";
import income from "../assets/income.png";
import outcome from "../assets/outcome.png";
import stats from "../assets/stats.png";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-cover bg-no-repeat min-h-screen" style={{ backgroundImage: `url(${background})` }}>
      <div className="body flex flex-col">
        <div className="head bg-[#3339B4] rounded-b-[30px] pb-[80px] px-[16px] pt-[30px]">
          <div className="hello flex flex-row items-center justify-between text-white">
            <h2 className="text-[25px] font-semibold">Hello User..</h2>
            <FaUserCircle className="text-[30px]" />
          </div>
          <div className="balance flex flex-col text-white mt-[40px]">
            <h2 className="font-medium text-[22px]">You have</h2>
            <div className="balance mt-[10px] flex flex-row items-center justify-between">
              <h2 className="text-[25px] font-extrabold">Rp. 16.000.000</h2>
              <h2>See Details</h2>
            </div>
            <h2 className="text-[16px] mt-[10px]">Last Update 10.00 12/05/24</h2>
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
            <h2 className="font-medium text-[16px] text-[#3339B4]">See More</h2>
          </div>
          <div className="container-card-list flex flex-col gap-[10px] mt-[20px]">
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
                <img src={outcome} className="w-[50px]" alt="" />
                <div className="caption-data flex flex-col gap-[5px] items-start">
                  <h2 className="text-white font-semibold text-[18px]">Martabak</h2>
                  <h2 className="text-[#FF4343]">- Rp. 20.000,00</h2>
                </div>
              </div>
              <div className="left-side flex flex-col items-end text-white text-[12px]">
                <h2>12/02/2024</h2>
                <h2>13.00</h2>
              </div>
            </div>
            <div className="card-1 bg-[#3339B4] flex flex-row justify-between items-center px-[16px] py-[15px] rounded-2xl">
              <div className="right-side flex flex-row items-center gap-[20px]">
                <img src={outcome} className="w-[50px]" alt="" />
                <div className="caption-data flex flex-col gap-[5px] items-start">
                  <h2 className="text-white font-semibold text-[18px]">PDAM</h2>
                  <h2 className="text-[#FF4343]">- Rp. 100.000,00</h2>
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

export default Dashboard;
