import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";

export default function ScreensPage() {
  const { boardName } = useParams();
  // const board = useSelector(
  //   (state) => state.board.boards?.find((board) => board.id === boardName)?.name
  // );

  return (
    <div>
      <HeaderDashboard boardName={boardName || "Board not found"} />
    </div>
  );
}
