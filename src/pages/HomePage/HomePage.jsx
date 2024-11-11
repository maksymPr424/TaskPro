import Header from "../../components/Header/Header";
import Backdrop from "../../components/Sidebar/Backdrop/Backdrop";
import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage.jsx";
import styles from "./HomePage.module.css";
import { useState } from "react";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Header />
      <Sidebar className={styles.sidebar} />
      <ScreensPage />
    </>

  );
}
