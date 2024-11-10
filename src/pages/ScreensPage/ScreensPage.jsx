import MainDashboard from "../../components/MainDashboard/MainDashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import css from "./ScreensPage.module.css";

export default function ScreensPage() {
  return (
    <>
      <div className={css.sidebar}>
        <Sidebar />
      </div>
      <MainDashboard />
    </>
  );
}
