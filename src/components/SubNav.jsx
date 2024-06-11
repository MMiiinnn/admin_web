import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { logoutRequest } from "../api/request";
import Cookies from "js-cookie";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleClickLogout = async () => {
    await logoutRequest();
    Cookies.remove("data");
    window.location.reload();
  };

  const handleClickProfile = async () => {
    navigate("/profile");
  }

  return (
    <>
      <div>
        <IconButton onClick={handleClick}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClickLogout}>Đăng xuất</MenuItem>
          <MenuItem onClick={handleClickProfile}>Tài khoản</MenuItem>
        </Menu>
      </div>
    </>
  );
}
