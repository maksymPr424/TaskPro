import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useSelector, useDispatch } from 'react-redux';
import "react-tabs/style/react-tabs.css";
import css from "./Sidebar.module.css";
import NewBoardModal from "./NewBoardModal/NewBoardModal";
import NeedHelpModal from "./NeedHelpModal/NeedHelpModal";
import EditBoardModal from "./EditBoardModal/EditBoardModal";
import { createBoard, editBoard, fetchBoards, removeBoard } from "../../redux/boards/operations.js";
import { selectBoards } from "../../redux/boards/selectors.js";
import { clearBoards } from "../../redux/boards/slice.js";

export default function Sidebar() {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isNeedHelpModalOpen, setIsNeedHelpModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleOpenNewBoardModal = () => setIsNewBoardModalOpen(true);
  const handleCloseNewBoardModal = () => setIsNewBoardModalOpen(false);

  const handleOpenNeedHelpModal = () => setIsNeedHelpModalOpen(true);
  const handleCloseNeedHelpModal = () => setIsNeedHelpModalOpen(false);

  const handleSendHelpRequest = (helpData) => {
    console.log("Help request sent:", helpData);
    setIsNeedHelpModalOpen(false);
  };

  const handleCreateBoard = async (newBoard) => {
    dispatch(createBoard(newBoard));
    setIsNewBoardModalOpen(false);
  };

  const handleOpenEditBoardModal = (board) => {
    if (board) {
      setSelectedBoard(board);
      setIsEditBoardModalOpen(true);
    }
  };

  const handleCloseEditBoardModal = () => {
    setIsEditBoardModalOpen(false);
    setSelectedBoard(null);
  };

  const handleSaveBoardChanges = (updatedBoard) => {
    dispatch(editBoard(updatedBoard));
    setIsEditBoardModalOpen(false);
  };

  const handleDeleteBoard = (boardId) => {
    dispatch(removeBoard(boardId));
  };

  const handleLogout = () => {
    dispatch(clearBoards());
    localStorage.removeItem('token');
    navigate("/auth");
  };

  const handleNavigateToBoard = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  return (
    <aside className={css.sidebar}>
      <div className={css.sidebarLogo}>
        <svg className={css.sidebarLogoIcon}>
          <use href="/src/assets/bogdan.svg#icon"></use>
        </svg>
        <h1 className={css.sidebarLogoName}>Task Pro</h1>
      </div>
      <h4 className={css.sidebarBoards}>My boards</h4>

      <div className={css.sidebarCreate}>
        <p className={css.sidebarCreateText}>Create a new board</p>
        <button className={css.sidebarCreateButton} onClick={handleOpenNewBoardModal}>
          <svg className={css.sidebarCreateSvg}>
            <use href="/src/assets/plus.svg#plus"></use>
          </svg>
        </button>
      </div>

      <Tabs className={css.tabsContainer}>
        <TabList className={css.tabList}>
          {boards.map((board) => (
            <Tab key={board.id} className={css.tab} onClick={() => handleNavigateToBoard(board.id)}>
             
              <div className={css.tabFlex} >
              <div className={css.boardItemMain}>
                <span>
                  {board.icon && (
                    <svg className={css.boardIconMain}>
                      <use href="/src/assets/project.svg#project"></use>
                    </svg>
                  )}
                </span>
                <span className={css.boardTitle}>{board.title}</span>
              </div>
              <div className={css.boardButtons}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditBoardModal(board);
                    }}
                    className={css.editButton}
                  >
                    {/* <svg className={css.boardIcon}>
                      <use href="/src/assets/bogdan.svg#pencil"></use>
                    </svg> */}Ed
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBoard(board.id);
                    }}
                    className={css.deleteButton}>
                    {/* <svg className={css.boardIcon}>
                      <use href="/src/assets/bogdan.svg#trash"></use>
                    </svg> */}Del
                  </button>
                </div>
              </div>

              {/* <div className={css.boardTabSpan}></div> */}
            </Tab>
          ))}
        </TabList>

        {boards.map((board) => (
          <TabPanel key={board.id} className={css.tabPanel}>
            {/* Панель для каждой доски */}
          </TabPanel>
        ))}
      </Tabs>

      <div className={css.sidebarHelp}>
        <img className={css.sidebarHelpImg} src="/src/img/flower-pot.png" alt="Help" />
        <p className={css.sidebarHelpText}>
          If you need help with <span className={css.sidebarHelpTextSpan}>TaskPro</span>, check out our support resources or reach out to our customer support team.
        </p>
        <div className={css.sidebarHelpNeed}>
          <svg className={css.sidebarHelpIcon}>
            <use href="/src/assets/help-circle.svg#help-circle"></use>
          </svg>
          <button className={css.sidebarHelpButton} onClick={handleOpenNeedHelpModal}>
            Need help?
          </button>
        </div>
      </div>

      <div className={css.sidebarLogout}>
        <svg className={css.sidebarLogoutSvg}>
          <use href="/src/assets/logout.svg#logout"></use>
        </svg>
        <button className={css.sidebarLogoutButton} onClick={handleLogout}>Log out</button>
      </div>

      <NewBoardModal
        isOpen={isNewBoardModalOpen}
        onClose={handleCloseNewBoardModal}
        onCreateBoard={handleCreateBoard}
      />

      {isEditBoardModalOpen && selectedBoard && (
        <EditBoardModal
          isOpen={isEditBoardModalOpen}
          boardData={selectedBoard}
          onClose={handleCloseEditBoardModal}
          onSaveChanges={handleSaveBoardChanges}
        />
      )}

      <NeedHelpModal
        isOpen={isNeedHelpModalOpen}
        onClose={handleCloseNeedHelpModal}
        onSend={handleSendHelpRequest}
      />
    </aside>
  );
}
