import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useSelector, useDispatch } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import css from './Sidebar.module.css';
import NewBoardModal from './NewBoardModal/NewBoardModal';
import NeedHelpModal from './NeedHelpModal/NeedHelpModal';
import EditBoardModal from './EditBoardModal/EditBoardModal';
import {
  createBoard,
  editBoard,
  fetchBoards,
  removeBoard,
} from '../../redux/boards/operations.js';
import {
  selectBoards,
  selectLastActiveBoard,
} from '../../redux/boards/selectors.js';
import {
  clearBackgroundUrls,
  clearBoards,
  setLastActiveBoard,
} from '../../redux/boards/slice.js';
import { logoutUser } from '../../redux/auth/operations.js';
import cactus from '../../img/flower-pot.png';

export default function Sidebar({ className, fetchActiveBoard }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(selectBoards);
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isNeedHelpModalOpen, setIsNeedHelpModalOpen] = useState(false);
  const lastActiveBoard = useSelector(selectLastActiveBoard);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index =
      boards.findIndex(({ _id }) => _id === lastActiveBoard?._id) || 0;
    setActiveIndex(index);
  }, [activeIndex, boards, lastActiveBoard?._id]);

  const handleOpenNewBoardModal = () => setIsNewBoardModalOpen(true);
  const handleCloseNewBoardModal = () => setIsNewBoardModalOpen(false);
  const handleOpenNeedHelpModal = () => setIsNeedHelpModalOpen(true);
  const handleCloseNeedHelpModal = () => setIsNeedHelpModalOpen(false);

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

  const handleCreateBoard = async (newBoard) => {
    dispatch(createBoard(newBoard));
    // await dispatch(fetchBoards());
    setIsNewBoardModalOpen(false);
  };

  const handleSaveBoardChanges = async (updatedBoard) => {
    if (!updatedBoard._id) {
      console.error('Cannot save changes: ID is undefined');
      return;
    }
    dispatch(editBoard(updatedBoard));
    dispatch(fetchBoards());
    setIsEditBoardModalOpen(false);
  };

  const handleDeleteBoard = async (boardId) => {
    if (!boardId) {
      console.error('Cannot delete board: ID is undefined');
      return;
    }
    dispatch(removeBoard(boardId));
    dispatch(fetchBoards());
  };

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      dispatch(clearBoards());
      localStorage.removeItem('token');
      navigate('/welcome');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const handleSendHelpRequest = (helpData) => {
    setIsNeedHelpModalOpen(false);
  };
  const handleNavigateToBoard = (boardId, boardTitle) => {
    dispatch(setLastActiveBoard({ boardId, title: boardTitle }));
  };
  return (
    <aside className={`${className} ${css.sidebar}`}>
      <div className={css.sidebarFlex}>
        <div>
          <div className={css.sidebarLogo}>
            <svg className={css.sidebarLogoIcon}>
              <use href='/sprite.svg#taskpro_logo'></use>
            </svg>
            <h1 className={css.sidebarLogoName}>Task Pro</h1>
          </div>
          <h4 className={css.sidebarBoards}>My boards</h4>
          <div className={css.sidebarCreate}>
            <p className={css.sidebarCreateText}>Create a new board</p>
            <button
              className={css.sidebarCreateButton}
              onClick={handleOpenNewBoardModal}>
               <svg className={css.createPlusSvg} width="20" height="20">
                  <use href="/sprite.svg#icon-plus" />
                </svg>
            </button>
          </div>
          <Tabs className={css.tabsContainer} selected={activeIndex}>
            <div className={css.tabsScrollContainer}>
              <TabList className={css.tabList}>
                {boards.map((board) => (
                  <Tab
                    key={board._id}
                    className={css.tab}
                    onClick={() => {
                      handleNavigateToBoard(board._id, board.title);
                      fetchActiveBoard(board._id);
                    }}>
                    <div className={css.tabFlex}>
                      <div className={css.boardTabSpan}></div>
                      <div className={css.boardItemMain}>
                        <span>
                          {board.icon && (
                            <svg className={css.boardIconMain}>
                              <use href={`/boards.svg#${board.icon}`}></use>
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
                          className={css.editButton}>
                          <svg className={css.boardIcon}>
                            <use href='/sprite.svg#pencil'></use>
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBoard(board._id);
                          }}
                          className={css.deleteButton}>
                          <svg className={css.boardIcon}>
                            <use href='/sprite.svg#trash'></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Tab>
                ))}
              </TabList>
              {boards.map((board) => (
                <TabPanel key={board._id} className={css.tabPanel}></TabPanel>
              ))}
            </div>
          </Tabs>
        </div>

        <div>
          <div className={css.sidebarHelp}>
            <img className={css.sidebarHelpImg} src={cactus} alt='Help' />
            <p className={css.sidebarHelpText}>
              If you need help with{' '}
              <span className={css.sidebarHelpTextSpan}>TaskPro</span>, check out
              our support resources or reach out to our customer support team.
            </p>
            <button
              className={css.sidebarHelpButton}
              onClick={handleOpenNeedHelpModal}>
              <svg className={css.sidebarHelpIcon}>
                <use href='/sprite.svg#help'></use>
              </svg>{' '}
              Need help?
            </button>
          </div>
          <button className={css.sidebarLogoutButton} onClick={handleLogout}>
            <svg className={css.sidebarLogoutSvg}>
              <use href='/sprite.svg#logout'></use>
            </svg>
            Log out
          </button>
        </div>
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
