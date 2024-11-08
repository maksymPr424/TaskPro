import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard.jsx";

export default function ScreensPage() {
  const { boardId } = useParams();
  const boardName = useSelector(
    (state) => state.board.boards?.find((board) => board.id === boardId)?.name
  );

  return (
    <div>
      <HeaderDashboard boardName={boardName || "Board not found"} />
    </div>
  );
}
