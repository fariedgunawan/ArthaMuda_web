import { FaUserCircle } from "react-icons/fa";
import background from "../assets/bg-img.png";
import income from "../assets/income.png";
import outcome from "../assets/outcome.png";
import stats from "../assets/stats.png";
const Dashboard = () => {
  return (
    <div className="bg-cover bg-no-repeat min-h-screen" style={{ backgroundImage: `url(${background})` }}>
      <div className="body flex flex-col">
        <div className="head bg-[#3339B4] rounded-b-[30px] pb-[80px] px-[16px] pt-[30px]">
          <div className="hello flex flex-row items-center justify-between text-white">
            <h2 className="text-[25px] font-semibold">Hello User..</h2>
            <FaUserCircle className="text-[30px]" />
          </div>
          <div className="balance flex flex-col text-white mt-[40px]">
            <h2 className="font-medium text-[25px]">You have</h2>
            <div className="balance mt-[10px] flex flex-row items-center justify-between">
              <h2 className="text-[25px] font-extrabold">Rp. 16.000.000</h2>
              <h2>See Details</h2>
            </div>
            <h2 className="text-[16px] mt-[10px]">Last Update 10.00 12/05/24</h2>
          </div>
        </div>
        <div className="card-navigator flex flex-row items-center -mt-[60px] justify-center gap-[50px] mx-[30px] rounded-2xl py-[8px] bg-white">
          <div className="card-1 flex flex-col items-center">
            <img src={income} className="w-[40px]" alt="" />
            <h2 className="mt-[10px] font-medium text-[#3339B4]">Income</h2>
          </div>
          <div className="card-1 flex flex-col items-center">
            <img src={outcome} className="w-[40px]" alt="" />
            <h2 className="mt-[12px] font-medium text-[#3339B4]">Outcome</h2>
          </div>
          <div className="card-1 flex flex-col items-center">
            <img src={stats} className="w-[40px]" alt="" />
            <h2 className="mt-[12px] font-medium text-[#3339B4]">Stats</h2>
          </div>
        </div>

        <div className="list-data mt-[30px]">
          <div className="head-data flex flex-row items-center justify-between px-[16px]">
            <h2 className="font-bold text-[20px] text-[#3339B4]">Recent</h2>
            <h2 className="font-medium text-[16px] text-[#3339B4]">See More</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
