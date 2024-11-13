// import { Button } from "@mui/material";
import css from "./BeforeStart.module.css";
import { useState } from "react";
import NewBoardModal from "../Sidebar/NewBoardModal/NewBoardModal";
import { createBoard } from "../../redux/boards/operations";
import { useDispatch } from 'react-redux';

export default function BeforeStart() {
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpenNewBoardModal = () => setIsNewBoardModalOpen(true);
  const handleCloseNewBoardModal = () => setIsNewBoardModalOpen(false);
  const handleCreateBoard = async (newBoard) => {
    dispatch(createBoard(newBoard));
    setIsNewBoardModalOpen(false);
  };
  return (
    <>
      <p className={css.info}>
        Before starting your project, it is essential{" "}
        <span className={css.active}>
          <button className={css.active} onClick={handleOpenNewBoardModal}>to create a board</button></span> to visualize and
        track all the necessary tasks and milestones. This board serves as a
        powerful tool to organize the workflow and ensure effective collaboration
        among team members.
      </p>
      <NewBoardModal
        isOpen={isNewBoardModalOpen}
        onClose={handleCloseNewBoardModal}
        onCreateBoard={handleCreateBoard} />
    </>
  );
}
