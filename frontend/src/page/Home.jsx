import SideBar from "../components/SideBar";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <>
      <SideBar />
      <div className="p-4 sm:ml-64 mt-[64px]">
        <Dashboard />
      </div>
    </>
  );
};

export default Home;
