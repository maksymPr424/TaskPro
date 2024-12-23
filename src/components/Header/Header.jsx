import { useEffect, useState } from "react";
import styles from "./Header.module.css";
// import defaultPhoto from "../../img/user.jpg";
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
import { Modal, Box } from "@mui/material";
import {
  selectUserName,
  selectUserPhotoUrl,
  selectUserStatus,
  selectUserTheme,
} from "../../redux/header/selectors.js";

import userWhite from "../../img/user-violet.jpg";
import userDark from "../../img/user-dark.jpg";

const Header = ({ fetchActiveBoard }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const authTheme = useSelector(selectTheme);
  const theme = useSelector(selectUserTheme) || authTheme;

  const authStatus = useSelector((state) => state.user.status);
  const status = useSelector(selectUserStatus) || authStatus;

  const authName = useSelector(selectName);
  const name = useSelector(selectUserName) || authName;

  const noneImage = theme === "dark" ? userDark : userWhite;

  const authPhoto = useSelector(selectPhotoUrl);
  const photoUrl = useSelector(selectUserPhotoUrl) || authPhoto || noneImage;
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
    setIsSidebarOpen(true);
  };
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.menuIcon} onClick={handleOpenSidebar}>
        <svg className={styles.icon}>
          <use href="/sprite.svg#pop"></use>
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
            <use href="/sprite.svg#str"></use>
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
          <p className={styles.userName}>{name || "User"}</p>
          <img
            src={photoUrl || getDefaultImage()}
            alt="User Photo"
            className={styles.userPhoto}
          />
        </div>
      </div>
      <EditUserInfo
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        photoUrl={photoUrl}
      />
      {isSidebarOpen && (
        <Modal
          open={isSidebarOpen}
          onClose={handleCloseSidebar}
          aria-labelledby="sidebar-modal"
          aria-describedby="sidebar-content"
          sx={{
            zIndex: 0,
          }}
          className={styles.sidebarModal}
        >
          <Box
            sx={{
              position: "fixed",
              outline: "none",
            }}
          >
            <Sidebar fetchActiveBoard={fetchActiveBoard} />
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Header;
