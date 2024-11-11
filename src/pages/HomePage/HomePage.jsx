import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ScreensPage from "../ScreensPage/ScreensPage.jsx";
import styles from "./HomePage.module.css";
export default function HomePage() {
  return (
    <>
      <Header />
      <Sidebar className={styles.sidebar} />
      <ScreensPage />
    </>
  );
}
