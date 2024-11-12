import { useParams } from "react-router";
import MainDashboard from "../../components/MainDashboard/MainDashboard";
import css from "./ScreensPage.module.css";
import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";

export default function ScreensPage() {
  const { boardName } = useParams();
  // const board = useSelector(
  //   (state) => state.board.boards?.find((board) => board.id === boardName)?.name
  // );

  return (
    <>
      <HeaderDashboard boardName={boardName} />
      <MainDashboard />
    </>
  );
}
