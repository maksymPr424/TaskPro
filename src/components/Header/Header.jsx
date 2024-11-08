import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import icon from "../../assets/sprite.svg";
import defaultPhoto from "../../img/user.jpg";
import EditUserInfo from "../EditUserInfo/EditUserInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserData,
  selectUserTheme,
} from "../../redux/header/selectors.js";
import { updateUserTheme } from "../../redux/header/operationsHeader.js";
import { CustomMenuItem, CustomMenu } from "./HeaderCustumMemu.jsx";
import { themes } from "../../constants/global.js";
import { defaultImages } from "../../constants/global.js";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector(selectUserTheme);
  const status = useSelector((state) => state.user.status);
  const userData = useSelector(selectUserData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeSelect = (selectedTheme) => {
    if (status !== "loading") {
      dispatch(updateUserTheme(selectedTheme));
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

  console.log(theme);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
    console.log("Слайдбар открыт/закрыт");
  };

  return (
    <div className={styles.header}>
      <div className={styles.menuIcon} onClick={handleSidebarToggle}>
        <svg>
          <use href={`${icon}#pop`}></use>
        </svg>
      </div>

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
        <span className={styles.userName}>{userData.name || "User"}</span>
        <img
          src={userData.photoUrl || getDefaultImage()}
          alt="User Photo"
          className={styles.userPhoto}
        />
      </div>

      <EditUserInfo isOpen={isModalOpen} onRequestClose={handleModalClose} />
      {isSidebarOpen && (
        <div className={styles.sidebarPlaceholder}>Slidebar</div>
      )}
    </div>
  );
};

export default Header;
