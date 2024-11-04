import React, { useState } from "react";
import { Menu, MenuItem, styled } from "@mui/material";
import styles from "./Header.module.css";
import icon from "../../assets/sprite.svg";
import defaultPhoto from "../../img/user.jpg";
import EditUserInfo from "../EditUserInfo/EditUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { selectUserTheme } from "../../redux/header/selectors.js";
import updateUserTheme from "../../redux/header/operationsHeader.js";

const THEMS = ["light", "dark", "violet"];

const CustomMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    border: "1px solid",
    borderColor: "#BEDBB0 !important",
    boxShadow: "none",
    borderRadius: "8px",
    width: "100px",
    margin: "18px 0px",
    maxHeight: "107px",
    overflow: "hidden",
  },
}));

const CustomMenuItem = styled(MenuItem)(({ theme, isselected }) => ({
  fontSize: "14px",
  height: "21px",
  fontWeight: "400",
  minHeight: "21px",
  marginBottom: "4px",
  color: isselected ? "aquamarine" : "#161616",
  lineHeight: "normal",
  letterSpacing: "-0.28px",
  backgroundColor: "transparent !important",
  fontFamily: "mediumFont",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector(selectUserTheme);
  const status = useSelector((state) => state.user.status);

  // console.log("Current theme:", theme); // Debugging: Check the theme value

  const handleThemeSelect = (selectedTheme) => {
    if (status !== "loading") {
      dispatch(updateUserTheme(selectedTheme));
      setAnchorEl(null); // Close menu after theme selection
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

  console.log(theme);

  return (
    <div className={styles.header}>
      <div className={styles.menuIcon}>
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
        {THEMS.map((item) => (
          <CustomMenuItem
            key={item}
            onClick={() => handleThemeSelect(item)}
            isselected={theme === item ? "true" : undefined}
          >
            {/* {item} */}
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </CustomMenuItem>
        ))}
      </CustomMenu>

      <div
        className={styles.userInfo}
        onClick={handleModalOpen}
        style={{ cursor: "pointer" }}
      >
        <span className={styles.userName}>User</span>
        <img src={defaultPhoto} alt="User Photo" className={styles.userPhoto} />
      </div>

      <EditUserInfo isOpen={isModalOpen} onRequestClose={handleModalClose} />
    </div>
  );
};

export default Header;
