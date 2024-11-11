import { Menu, MenuItem, styled } from "@mui/material";

export const CustomMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    border: "1px solid var(--active-green-violet)",
    boxShadow: "none",
    borderRadius: "8px",
    width: "100px",
    margin: "18px 0px",
    maxHeight: "107px",
    overflow: "hidden",
  },
}));

export const CustomMenuItem = styled(MenuItem)(({ theme, isselected }) => ({
  fontSize: "14px",
  height: "21px",
  fontWeight: "400",
  minHeight: "21px",
  marginBottom: "4px",
  color: isselected ? "var(--active-green-violet)" : "#161616",
  lineHeight: "normal",
  letterSpacing: "-0.28px",
  backgroundColor: "transparent",
  fontFamily: "mediumFont",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));
