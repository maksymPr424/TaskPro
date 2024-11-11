import Header from "../../components/Header/Header";
import Backdrop from "../../components/Sidebar/Backdrop/Backdrop";
import Sidebar from "../../components/Sidebar/Sidebar";
// import ScreensPage from "../ScreensPage/ScreensPage.jsx";
import { useState } from "react";
import css from "./HomePage.module.css";
import MainDashboard from "../../components/MainDashboard/MainDashboard.jsx";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={css.container}>
      <Header onSidebarToggle={toggleSidebar} />
      {isSidebarOpen && window.innerWidth < 1440 && (
        <Backdrop onClick={closeSidebar} />
      )}
      <Sidebar isOpen={isSidebarOpen || window.innerWidth >= 1440} />
      <MainDashboard />
      {/* <ScreensPage /> */}
    </div>
  );
}
