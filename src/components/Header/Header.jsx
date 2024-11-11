import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import icon from "../../assets/sprite.svg";
import defaultPhoto from "../../img/user.jpg";
import EditUserInfo from "../EditUserInfo/EditUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { updateUserTheme } from "../../redux/header/operationsHeader.js";
import { CustomMenuItem, CustomMenu } from "./HeaderCustumMemu.jsx";
import { themes } from "../../constants/global.js";
import { defaultImages } from "../../constants/global.js";
import {
  selectName,
  selectPhotoUrl,
  selectTheme,
} from "../../redux/auth/selectors.js";
import { setUserTheme } from "../../redux/auth/slice.js";
import Sidebar from "../Sidebar/Sidebar.jsx";
import ModalWindow from "../Modal/Modal.jsx";
import { Modal } from "@mui/material";

const Header = ({ onSidebarToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const status = useSelector((state) => state.user.status);
  const name = useSelector(selectName);

  const [isOpenSidebar, setOpenSidebar] = useState(false);

  const photoUrl = useSelector(selectPhotoUrl);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeSelect = (selectedTheme) => {
    if (status !== "loading") {
      dispatch(updateUserTheme(selectedTheme));
      dispatch(setUserTheme(selectedTheme));

      setAnchorEl(null);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  function getDefaultImage() {
    return defaultImages[theme] || defaultImages.light;
  }

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
    console.log(123);
  };
  const handleCloseSidebar = () => {
    setOpenSidebar(null);
  };

  const handleSidebarToggle = () => {
    if (onSidebarToggle) {
      onSidebarToggle(); // Вызов функции из пропа
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.menuIcon} onClick={handleSidebarToggle}>
        <svg>
          <use href={`${icon}#pop`}></use>
        </svg>
      </div>

      <div className={styles.rightHeader}>
        <div
          className={styles.theme}
          onClick={handleMenuClick}
          style={{ cursor: "pointer" }}
        >
          Theme
          <svg className={styles.menuIcon2}>
            <use href={`${icon}#str`}></use>
          </svg>
        </div>

        <CustomMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "theme-button",
          }}
        >
          {themes.map((item) => (
            <CustomMenuItem
              key={item}
              onClick={() => handleThemeSelect(item)}
              isselected={theme === item ? "true" : undefined}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </CustomMenuItem>
          ))}
        </CustomMenu>

        <div
          className={styles.userInfo}
          onClick={handleModalOpen}
          style={{ cursor: "pointer" }}
        >
          <span className={styles.userName}>{name || "User"}</span>
          <img
            src={photoUrl || getDefaultImage()}
            alt="User Photo"
            className={styles.userPhoto}
          />
        </div>
      </div>
      <EditUserInfo isOpen={isModalOpen} onRequestClose={handleModalClose} />
      {isSidebarOpen && (
        <Modal
          isOpen={isOpenSidebar}
          onRequestClose={handleCloseSidebar}
          contentLabel="ModalWindow"
        >
          <Sidebar />
        </Modal>
      )}
    </div>
  );
};

export default Header;
