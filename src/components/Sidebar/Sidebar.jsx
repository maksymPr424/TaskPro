// import { useState, useEffect } from "react"; // Импортируем useState и useEffect
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import css from "./Sidebar.module.css";
// import NewBoardModal from "./NewBoardmodal/NewBoardModal";
// import NeedHelpModal from "./NeedHelpModal/NeedHelpModal";
// import EditBoardModal from "./EditBoardModal/EditBoardModal";

// export default function Sidebar() {
//   const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
//   const [selectedBoard, setSelectedBoard] = useState(null);
//   const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
//   const [isNeedHelpModalOpen, setIsNeedHelpModalOpen] = useState(false);
//   const [boards, setBoards] = useState([]); // Состояние для хранения списка бордов

//   // Запрос к бэку для получения списка бордов
//   useEffect(() => {
//     async function fetchBoards() {
//       try {
//         const response = await fetch("https://672566a8c39fedae05b4ab3d.mockapi.io/boards"); // Замените URL на реальный эндпоинт
//         const data = await response.json();
//         setBoards(data); // Сохранение данных бордов в состоянии
//       } catch (error) {
//         console.error("Ошибка при загрузке бордов:", error);
//       }
//     }

//     fetchBoards();
//   }, []);

//   const handleOpenNewBoardModal = () => setIsNewBoardModalOpen(true);
//   const handleCloseNewBoardModal = () => setIsNewBoardModalOpen(false);

//   const handleOpenNeedHelpModal = () => setIsNeedHelpModalOpen(true);
//   const handleCloseNeedHelpModal = () => setIsNeedHelpModalOpen(false);

//   const handleCreateBoard = async (newBoard) => {
//     try {
//       const response = await fetch("https://672566a8c39fedae05b4ab3d.mockapi.io/boards", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newBoard),
//       });
  
//       if (!response.ok) {
//         throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
//       }
  
//       const createdBoard = await response.json();
  
//       setBoards((prevBoards) => [...prevBoards, createdBoard]);
//       setIsNewBoardModalOpen(false);
//     } catch (error) {
//       console.error("Ошибка при создании новой доски:", error);
//     }
//   };
  

//   const handleSendHelpRequest = (helpData) => {
//     console.log("Help request sent:", helpData);
//     setIsNeedHelpModalOpen(false);
//   };

//   const handleOpenEditBoardModal = (board) => {
//     setSelectedBoard(board);
//     setIsEditBoardModalOpen(true);
//   };
//   const handleCloseEditBoardModal = () => {
//     setIsEditBoardModalOpen(false);
//     setSelectedBoard(null);
//   };

//   const handleSaveBoardChanges = (updatedBoard) => {
//     console.log("Board updated:", updatedBoard);
//     setIsEditBoardModalOpen(false);
//   };

//   return (
//     <aside className={css.sidebar}>
//       <div className={css.sidebarLogo}>
//         <svg className={css.sidebarLogoIcon}>
//           <use href="/src/assets/icon.svg#icon"></use>
//         </svg>
//         <h1 className={css.sidebarLogoName}>Task Pro</h1>
//       </div>
//       <h4 className={css.sidebarBoards}>My boards</h4>
      
//       <div className={css.sidebarCreate}>
//         <p className={css.sidebarCreateText}>Create a new board</p>
//         <button className={css.sidebarCreateButton} onClick={handleOpenNewBoardModal}>
//           <svg className={css.sidebarCreateSvg}>
//             <use href="/src/assets/plus.svg#plus"></use>
//           </svg>
//         </button>
//       </div>

//       {/* Вкладки для бордов */}
//       <Tabs className={css.tabsContainer}>
//   <TabList className={css.tabList}>
//     {boards.map((board) => (
//       <Tab key={board.id} className={css.tab}>
//         <div className={css.boardItem}>
//           <span className={css.boardIcon}>
//             {/* Иконка доски */}
//             <svg className={css.iconSvg}>
//               <use href={`/src/assets/${board.icon}.svg#icon`} />
//             </svg>
//           </span>
//           <span className={css.boardTitle}>{board.title}</span>
//           <button onClick={() => handleOpenEditBoardModal(board)} className={css.editButton}>
//             <svg className={css.editIcon}>
//               <use href="/src/assets/edit-icon.svg#edit-icon"></use>
//             </svg>
//           </button>
//           <button className={css.deleteButton}>
//             <svg className={css.deleteIcon}>
//               <use href="/src/assets/delete-icon.svg#delete-icon"></use>
//             </svg>
//           </button>
//         </div>
//       </Tab>
//     ))}
//   </TabList>
// </Tabs>



//       <div className={css.sidebarHelp}>
//         <img className={css.sidebarHelpImg} src="/src/img/flowerPot.png" alt="Help" />
//         <p className={css.sidebarHelpText}>If you need help with <span className={css.sidebarHelpTextSpan}>TaskPro</span>, check out our support resources or reach out to our customer support team.</p>
//         <div className={css.sidebarHelpNeed}>
//           <svg className={css.sidebarHelpIcon}>
//             <use href="/src/assets/help-circle.svg#help-circle"></use>
//           </svg>
//           <button className={css.sidebarHelpButton} onClick={handleOpenNeedHelpModal}>Need help?</button>
//         </div>
//       </div>

//       <div className={css.sidebarLogout}>
//         <svg className={css.sidebarLogoutSvg}>
//           <use href="/src/assets/logout.svg#logout"></use>
//         </svg>
//         <button className={css.sidebarLogoutButton}>Log out</button>
//       </div>

//       {isNewBoardModalOpen && (
//         <NewBoardModal onClose={handleCloseNewBoardModal} onCreateBoard={handleCreateBoard} />
//       )}

//       {isEditBoardModalOpen && selectedBoard && (
//         <EditBoardModal
//           boardData={selectedBoard}
//           onClose={handleCloseEditBoardModal}
//           onSaveChanges={handleSaveBoardChanges}
//         />
//       )}

//       {isNeedHelpModalOpen && (
//         <NeedHelpModal onClose={handleCloseNeedHelpModal} onSend={handleSendHelpRequest} />
//       )}
//     </aside>
//   );
// }



// import { useState, useEffect } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import css from "./Sidebar.module.css";
// import NewBoardModal from "./NewBoardModal/NewBoardModal";
// import NeedHelpModal from "./NeedHelpModal/NeedHelpModal";
// import EditBoardModal from "./EditBoardModal/EditBoardModal";

// export default function Sidebar() {
//   const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
//   const [selectedBoard, setSelectedBoard] = useState(null);
//   const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
//   const [isNeedHelpModalOpen, setIsNeedHelpModalOpen] = useState(false);
//   const [boards, setBoards] = useState([]); // Состояние для хранения списка досок

//   // Запрос к бэку для получения списка досок
//   useEffect(() => {
//     async function fetchBoards() {
//       try {
//         const response = await fetch("https://672566a8c39fedae05b4ab3d.mockapi.io/boards");
//         const data = await response.json();
//         setBoards(data); // Сохранение данных досок в состоянии
//       } catch (error) {
//         console.error("Ошибка при загрузке досок:", error);
//       }
//     }

//     fetchBoards();
//   }, []);

//   const handleOpenNewBoardModal = () => setIsNewBoardModalOpen(true);
//   const handleCloseNewBoardModal = () => setIsNewBoardModalOpen(false);

//   const handleOpenNeedHelpModal = () => setIsNeedHelpModalOpen(true);
//   const handleCloseNeedHelpModal = () => setIsNeedHelpModalOpen(false);

//   const handleCreateBoard = async (newBoard) => {
//     try {
//       const response = await fetch("https://672566a8c39fedae05b4ab3d.mockapi.io/boards", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newBoard),
//       });

//       if (!response.ok) {
//         throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
//       }

//       const createdBoard = await response.json();

//       setBoards((prevBoards) => [...prevBoards, createdBoard]);
//       setIsNewBoardModalOpen(false);
//     } catch (error) {
//       console.error("Ошибка при создании новой доски:", error);
//     }
//   };

//   const handleSendHelpRequest = (helpData) => {
//     console.log("Help request sent:", helpData);
//     setIsNeedHelpModalOpen(false);
//   };

//   const handleOpenEditBoardModal = (board) => {
//     setSelectedBoard(board);
//     setIsEditBoardModalOpen(true);
//   };

//   const handleCloseEditBoardModal = () => {
//     setIsEditBoardModalOpen(false);
//     setSelectedBoard(null);
//   };

//   const handleSaveBoardChanges = (updatedBoard) => {
//     console.log("Board updated:", updatedBoard);
//     setIsEditBoardModalOpen(false);
//   };

//   return (
//     <aside className={css.sidebar}>
//       <div className={css.sidebarLogo}>
//         <svg className={css.sidebarLogoIcon}>
//           <use href="/src/assets/icon.svg#icon"></use>
//         </svg>
//         <h1 className={css.sidebarLogoName}>Task Pro</h1>
//       </div>
//       <h4 className={css.sidebarBoards}>My boards</h4>

//       <div className={css.sidebarCreate}>
//         <p className={css.sidebarCreateText}>Create a new board</p>
//         <button className={css.sidebarCreateButton} onClick={handleOpenNewBoardModal}>
//           <svg className={css.sidebarCreateSvg}>
//             <use href="/src/assets/plus.svg#plus"></use>
//           </svg>
//         </button>
//       </div>

//       {/* Вкладки для досок */}
//       <Tabs className={css.tabsContainer}>
//         <TabList className={css.tabList}>
//           {boards.map((board) => (
//             <Tab key={board.id} className={css.tab}>
//               <div className={css.boardItem}>
//                 <span className={css.boardIcon}>
//                   {/* Иконка доски */}
//                   {board.icon && (
//                     <svg className={css.iconSvg}>
//                       <use href={`/src/assets/${board.icon}.svg#icon`} />
//                     </svg>
//                   )}
//                 </span>
//                 <span className={css.boardTitle}>{board.title}</span>
//                 <button onClick={() => handleOpenEditBoardModal(board)} className={css.editButton}>
//                   ed
//                 </button>
//                 <button className={css.deleteButton}>
//                   <svg className={css.deleteIcon}>
//                     <use href="/src/assets/delete-icon.svg#delete-icon"></use>
//                   </svg>
//                 </button>
//               </div>
//             </Tab>
//           ))}
//         </TabList>

//         {/* Пустые TabPanel для каждого Tab */}
//         {boards.map((board) => (
//           <TabPanel key={board.id} className={css.tabPanel}>
//             {/* Здесь можно добавить содержимое панели, если нужно */}
//           </TabPanel>
//         ))}
//       </Tabs>

//       <div className={css.sidebarHelp}>
//         <img className={css.sidebarHelpImg} src="/src/img/flowerPot.png" alt="Help" />
//         <p className={css.sidebarHelpText}>
//           If you need help with <span className={css.sidebarHelpTextSpan}>TaskPro</span>, check out our support resources or reach out to our customer support team.
//         </p>
//         <div className={css.sidebarHelpNeed}>
//           <svg className={css.sidebarHelpIcon}>
//             <use href="/src/assets/help-circle.svg#help-circle"></use>
//           </svg>
//           <button className={css.sidebarHelpButton} onClick={handleOpenNeedHelpModal}>
//             Need help?
//           </button>
//         </div>
//       </div>

//       <div className={css.sidebarLogout}>
//         <svg className={css.sidebarLogoutSvg}>
//           <use href="/src/assets/logout.svg#logout"></use>
//         </svg>
//         <button className={css.sidebarLogoutButton}>Log out</button>
//       </div>

//       {isNewBoardModalOpen && (
//         <NewBoardModal onClose={handleCloseNewBoardModal} onCreateBoard={handleCreateBoard} />
//       )}

//       {isEditBoardModalOpen && selectedBoard && (
//         <EditBoardModal
//           boardData={selectedBoard}
//           onClose={handleCloseEditBoardModal}
//           onSaveChanges={handleSaveBoardChanges}
//         />
//       )}

//       {isNeedHelpModalOpen && <NeedHelpModal onClose={handleCloseNeedHelpModal} onSend={handleSendHelpRequest} />}
//     </aside>
//   );
// }
// import { useState, useEffect } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import css from "./Sidebar.module.css";
// import NewBoardModal from "./NewBoardModal/NewBoardModal";
// import NeedHelpModal from "./NeedHelpModal/NeedHelpModal";
// import EditBoardModal from "./EditBoardModal/EditBoardModal";

// export default function Sidebar() {
//   const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
//   const [selectedBoard, setSelectedBoard] = useState(null);
//   const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
//   const [isNeedHelpModalOpen, setIsNeedHelpModalOpen] = useState(false);
//   const [boards, setBoards] = useState([]);

//   const API_URL = "https://672566a8c39fedae05b4ab3d.mockapi.io/boards";

//   useEffect(() => {
//     async function fetchBoards() {
//       try {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         setBoards(data);
//       } catch (error) {
//         console.error("Ошибка при загрузке досок:", error);
//       }
//     }
//     fetchBoards();
//   }, []);

//   const handleOpenNewBoardModal = () => setIsNewBoardModalOpen(true);
//   const handleCloseNewBoardModal = () => setIsNewBoardModalOpen(false);

//   const handleOpenNeedHelpModal = () => setIsNeedHelpModalOpen(true);
//   const handleCloseNeedHelpModal = () => setIsNeedHelpModalOpen(false);
//   const handleSendHelpRequest = (helpData) => {
//     console.log("Help request sent:", helpData);
//     setIsNeedHelpModalOpen(false);
//   };
  
//   const handleCreateBoard = async (newBoard) => {
//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newBoard),
//       });
//       if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      
//       const createdBoard = await response.json();
//       setBoards((prevBoards) => [...prevBoards, createdBoard]);
//       setIsNewBoardModalOpen(false);
//     } catch (error) {
//       console.error("Ошибка при создании новой доски:", error);
//     }
//   };

//   const handleOpenEditBoardModal = (board) => {
//     setSelectedBoard(board);
//     setIsEditBoardModalOpen(true);
//   };

//   const handleCloseEditBoardModal = () => {
//     setIsEditBoardModalOpen(false);
//     setSelectedBoard(null);
//   };

//   const handleSaveBoardChanges = async (updatedBoard) => {
//     try {
//       const response = await fetch(`${API_URL}/${updatedBoard.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedBoard),
//       });
//       if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      
//       const data = await response.json();
//       setBoards((prevBoards) =>
//         prevBoards.map((board) => (board.id === data.id ? data : board))
//       );
//       setIsEditBoardModalOpen(false);
//     } catch (error) {
//       console.error("Ошибка при обновлении доски:", error);
//     }
//   };

//   const handleDeleteBoard = async (boardId) => {
//     try {
//       const response = await fetch(`${API_URL}/${boardId}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      
//       setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
//     } catch (error) {
//       console.error("Ошибка при удалении доски:", error);
//     }
//   };

//   return (
//     <aside className={css.sidebar}>
//       <div className={css.sidebarLogo}>
//         <svg className={css.sidebarLogoIcon}>
//           <use href="/src/assets/icon.svg#icon"></use>
//         </svg>
//         <h1 className={css.sidebarLogoName}>Task Pro</h1>
//       </div>
//       <h4 className={css.sidebarBoards}>My boards</h4>

//       <div className={css.sidebarCreate}>
//         <p className={css.sidebarCreateText}>Create a new board</p>
//         <button className={css.sidebarCreateButton} onClick={handleOpenNewBoardModal}>
//           <svg className={css.sidebarCreateSvg}>
//             <use href="/src/assets/plus.svg#plus"></use>
//           </svg>
//         </button>
//       </div>

//       <Tabs className={css.tabsContainer}>
//         <TabList className={css.tabList}>
//           {boards.map((board) => (
//             <Tab key={board.id} className={css.tab}>
//               <div className={css.boardItem}>
//                 <span className={css.boardIcon}>
//                   {board.icon && (
//                     <svg className={css.iconSvg}>
//                       <use href={`/src/assets/${board.icon}.svg#icon`} />
//                     </svg>
//                   )}
//                 </span>
//                 <span className={css.boardTitle}>{board.title}</span>
//                 <button onClick={() => handleOpenEditBoardModal(board)} className={css.editButton}>
//                   <svg className={css.editIcon}>
//                     <use href="/src/assets/edit-icon.svg#edit-icon"></use>
//                   </svg>
//                 </button>
//                 <button onClick={() => handleDeleteBoard(board.id)} className={css.deleteButton}>
//                   <svg className={css.deleteIcon}>
//                     <use href="/src/assets/delete-icon.svg#delete-icon"></use>
//                   </svg>
//                 </button>
//               </div>
//             </Tab>
//           ))}
//         </TabList>

//         {boards.map((board) => (
//           <TabPanel key={board.id} className={css.tabPanel}>
//             {/* Панель для каждой доски, если требуется */}
//           </TabPanel>
//         ))}
//       </Tabs>

//       <div className={css.sidebarHelp}>
//         <img className={css.sidebarHelpImg} src="/src/img/flowerPot.png" alt="Help" />
//         <p className={css.sidebarHelpText}>
//           If you need help with <span className={css.sidebarHelpTextSpan}>TaskPro</span>, check out our support resources or reach out to our customer support team.
//         </p>
//         <div className={css.sidebarHelpNeed}>
//           <svg className={css.sidebarHelpIcon}>
//             <use href="/src/assets/help-circle.svg#help-circle"></use>
//           </svg>
//           <button className={css.sidebarHelpButton} onClick={handleOpenNeedHelpModal}>
//             Need help?
//           </button>
//         </div>
//       </div>

//       <div className={css.sidebarLogout}>
//         <svg className={css.sidebarLogoutSvg}>
//           <use href="/src/assets/logout.svg#logout"></use>
//         </svg>
//         <button className={css.sidebarLogoutButton}>Log out</button>
//       </div>

//       {isNewBoardModalOpen && (
//         <NewBoardModal onClose={handleCloseNewBoardModal} onCreateBoard={handleCreateBoard} />
//       )}

//       {isEditBoardModalOpen && selectedBoard && (
//         <EditBoardModal
//           boardData={selectedBoard}
//           onClose={handleCloseEditBoardModal}
//           onSaveChanges={handleSaveBoardChanges}
//         />
//       )}

//       {isNeedHelpModalOpen && (<NeedHelpModal onClose={handleCloseNeedHelpModal} onSend={handleSendHelpRequest} />
// )}

//     </aside>
//   );
// }
// import { useState, useEffect } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import css from "./Sidebar.module.css";
// import NewBoardModal from "./NewBoardModal/NewBoardModal";
// import NeedHelpModal from "./NeedHelpModal/NeedHelpModal";
// import EditBoardModal from "./EditBoardModal/EditBoardModal";

// export default function Sidebar() {
//   const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
//   const [selectedBoard, setSelectedBoard] = useState(null);
//   const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
//   const [isNeedHelpModalOpen, setIsNeedHelpModalOpen] = useState(false);
//   const [boards, setBoards] = useState([]);

//   const API_URL = "https://672566a8c39fedae05b4ab3d.mockapi.io/boards";

//   useEffect(() => {
//     async function fetchBoards() {
//       try {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         setBoards(data);
//       } catch (error) {
//         console.error("Ошибка при загрузке досок:", error);
//       }
//     }
//     fetchBoards();
//   }, []);

//   const handleOpenNewBoardModal = () => setIsNewBoardModalOpen(true);
//   const handleCloseNewBoardModal = () => setIsNewBoardModalOpen(false);

//   const handleOpenNeedHelpModal = () => setIsNeedHelpModalOpen(true);
//   const handleCloseNeedHelpModal = () => setIsNeedHelpModalOpen(false);

//   const handleSendHelpRequest = (helpData) => {
//     console.log("Help request sent:", helpData);
//     setIsNeedHelpModalOpen(false);
//   };

//   const handleCreateBoard = async (newBoard) => {
//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newBoard),
//       });
//       if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

//       const createdBoard = await response.json();
//       setBoards((prevBoards) => [...prevBoards, createdBoard]);
//       setIsNewBoardModalOpen(false);
//     } catch (error) {
//       console.error("Ошибка при создании новой доски:", error);
//     }
//   };

//   const handleOpenEditBoardModal = (board) => {
//     if (board) {
//       setSelectedBoard(board);
//       setIsEditBoardModalOpen(true);
//     } else {
//       console.error("Нет выбранной доски для редактирования.");
//     }
//   };

//   const handleCloseEditBoardModal = () => {
//     setIsEditBoardModalOpen(false);
//     setSelectedBoard(null);
//   };

//   const handleSaveBoardChanges = async (updatedBoard) => {
//     try {
//       const response = await fetch(`${API_URL}/${updatedBoard.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedBoard),
//       });
//       if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

//       const data = await response.json();
//       setBoards((prevBoards) =>
//         prevBoards.map((board) => (board.id === data.id ? data : board))
//       );
//       setIsEditBoardModalOpen(false);
//     } catch (error) {
//       console.error("Ошибка при обновлении доски:", error);
//     }
//   };

//   const handleDeleteBoard = async (boardId) => {
//     try {
//       const response = await fetch(`${API_URL}/${boardId}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

//       setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
//     } catch (error) {
//       console.error("Ошибка при удалении доски:", error);
//     }
//   };

//   return (
//     <aside className={css.sidebar}>
//       <div className={css.sidebarLogo}>
//         <svg className={css.sidebarLogoIcon}>
//           <use href="/src/assets/icon.svg#icon"></use>
//         </svg>
//         <h1 className={css.sidebarLogoName}>Task Pro</h1>
//       </div>
//       <h4 className={css.sidebarBoards}>My boards</h4>

//       <div className={css.sidebarCreate}>
//         <p className={css.sidebarCreateText}>Create a new board</p>
//         <button className={css.sidebarCreateButton} onClick={handleOpenNewBoardModal}>
//           <svg className={css.sidebarCreateSvg}>
//             <use href="/src/assets/plus.svg#plus"></use>
//           </svg>
//         </button>
//       </div>
//       <Tabs className={css.tabsContainer}>
//   <TabList className={css.tabList}>
//     {boards.map((board) => (
//       <Tab key={board.id} className={`${css.tab} ${board.id === selectedBoardId ? css.activeTab : ''}`}>
//         <div className={css.boardItem}>
//           <span className={css.boardIcon}>
//             {board.icon && (
//               <svg className={css.iconSvg}>
//                 <use href={`/src/assets/${board.icon}.svg#icon`} />
//               </svg>
//             )}
//           </span>
//           <span className={css.boardTitle}>{board.title}</span>
//           <button onClick={() => handleOpenEditBoardModal(board)} className={css.editButton}>
//             <svg className={css.editIcon}>
//               <use href="/src/assets/edit-icon.svg#edit-icon"></use>
//             </svg>
//           </button>
//           <button onClick={() => handleDeleteBoard(board.id)} className={css.deleteButton}>
//             <svg className={css.deleteIcon}>
//               <use href="/src/assets/delete-icon.svg#delete-icon"></use>
//             </svg>
//           </button>
//         </div>
//       </Tab>
//     ))}
//   </TabList>

//   {boards.map((board) => (
//     <TabPanel key={board.id} className={css.tabPanel}>
//       {/* Панель для каждой доски, если требуется */}
//     </TabPanel>
//   ))}
// </Tabs>


//       <div className={css.sidebarHelp}>
//         <img className={css.sidebarHelpImg} src="/src/img/flowerPot.png" alt="Help" />
//         <p className={css.sidebarHelpText}>
//           If you need help with <span className={css.sidebarHelpTextSpan}>TaskPro</span>, check out our support resources or reach out to our customer support team.
//         </p>
//         <div className={css.sidebarHelpNeed}>
//           <svg className={css.sidebarHelpIcon}>
//             <use href="/src/assets/help-circle.svg#help-circle"></use>
//           </svg>
//           <button className={css.sidebarHelpButton} onClick={handleOpenNeedHelpModal}>
//             Need help?
//           </button>
//         </div>
//       </div>

//       <div className={css.sidebarLogout}>
//         <svg className={css.sidebarLogoutSvg}>
//           <use href="/src/assets/logout.svg#logout"></use>
//         </svg>
//         <button className={css.sidebarLogoutButton}>Log out</button>
//       </div>

//       {/* Модальные окна */}
//       {isNewBoardModalOpen && (
//         <NewBoardModal onClose={handleCloseNewBoardModal} onCreateBoard={handleCreateBoard} />
//       )}

//       {isEditBoardModalOpen && selectedBoard && (
//         <EditBoardModal
//           boardData={selectedBoard}
//           onClose={handleCloseEditBoardModal}
//           onSaveChanges={handleSaveBoardChanges}
//         />
//       )}

//       {isNeedHelpModalOpen && (
//         <NeedHelpModal onClose={handleCloseNeedHelpModal} onSend={handleSendHelpRequest} />
//       )}
//     </aside>
//   );
// }
import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import css from "./Sidebar.module.css";
import NewBoardModal from "./NewBoardModal/NewBoardModal";
import NeedHelpModal from "./NeedHelpModal/NeedHelpModal";
import EditBoardModal from "./EditBoardModal/EditBoardModal";

export default function Sidebar() {
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isNeedHelpModalOpen, setIsNeedHelpModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null); // Добавлено для отслеживания активной вкладки

  const API_URL = "https://672566a8c39fedae05b4ab3d.mockapi.io/boards";

  useEffect(() => {
    async function fetchBoards() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBoards(data);
      } catch (error) {
        console.error("Ошибка при загрузке досок:", error);
      }
    }
    fetchBoards();
  }, []);

  const handleOpenNewBoardModal = () => setIsNewBoardModalOpen(true);
  const handleCloseNewBoardModal = () => setIsNewBoardModalOpen(false);

  const handleOpenNeedHelpModal = () => setIsNeedHelpModalOpen(true);
  const handleCloseNeedHelpModal = () => setIsNeedHelpModalOpen(false);
  const handleSendHelpRequest = (helpData) => {
    console.log("Help request sent:", helpData);
    setIsNeedHelpModalOpen(false);
  };

  const handleCreateBoard = async (newBoard) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBoard),
      });
      if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      
      const createdBoard = await response.json();
      setBoards((prevBoards) => [...prevBoards, createdBoard]);
      setIsNewBoardModalOpen(false);
    } catch (error) {
      console.error("Ошибка при создании новой доски:", error);
    }
  };

  const handleOpenEditBoardModal = (board) => {
    setSelectedBoard(board);
    setSelectedBoardId(board.id); // Обновляем активную вкладку
    setIsEditBoardModalOpen(true);
  };

  const handleCloseEditBoardModal = () => {
    setIsEditBoardModalOpen(false);
    setSelectedBoard(null);
  };

  const handleSaveBoardChanges = async (updatedBoard) => {
    try {
      const response = await fetch(`${API_URL}/${updatedBoard.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBoard),
      });
      if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      
      const data = await response.json();
      setBoards((prevBoards) =>
        prevBoards.map((board) => (board.id === data.id ? data : board))
      );
      setIsEditBoardModalOpen(false);
    } catch (error) {
      console.error("Ошибка при обновлении доски:", error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      const response = await fetch(`${API_URL}/${boardId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
    } catch (error) {
      console.error("Ошибка при удалении доски:", error);
    }
  };

  return (
    <aside className={css.sidebar}>
      <div className={css.sidebarLogo}>
        <svg className={css.sidebarLogoIcon}>
          <use href="/src/assets/icon.svg#icon"></use>
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
            <Tab key={board.id} className={css.tab}>
                <div className={css.boardItem}>
                    <span className={css.boardIcon}>
                        {board.icon && (
                            <svg className={css.iconSvg}>
                                <use href={`/src/assets/${board.icon}.svg#icon`} />
                            </svg>
                        )}
                    </span>
                    <span className={css.boardTitle}>{board.title}</span>
                    <button onClick={() => handleOpenEditBoardModal(board)} className={css.editButton}>
                        {/* <svg className={css.editIcon}>
                            <use href="/src/assets/edit-icon.svg#edit-icon"></use>
                        </svg> */}
                        ed
                    </button>
                    <button onClick={() => handleDeleteBoard(board.id)} className={css.deleteButton}>
                        {/* <svg className={css.deleteIcon}>
                            <use href="/src/assets/delete-icon.svg#delete-icon"></use>
                        </svg> */}
                        del
                    </button>
                </div>
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
        <img className={css.sidebarHelpImg} src="/src/img/flowerPot.png" alt="Help" />
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
        <button className={css.sidebarLogoutButton}>Log out</button>
      </div>

      {isNewBoardModalOpen && (
        <NewBoardModal onClose={handleCloseNewBoardModal} onCreateBoard={handleCreateBoard} />
      )}

      {isEditBoardModalOpen && selectedBoard && (
        <EditBoardModal
          boardData={selectedBoard}
          onClose={handleCloseEditBoardModal}
          onSaveChanges={handleSaveBoardChanges}
        />
      )}

      {isNeedHelpModalOpen && (
        <NeedHelpModal onClose={handleCloseNeedHelpModal} onSend={handleSendHelpRequest} />
      )}
    </aside>
  );
}
