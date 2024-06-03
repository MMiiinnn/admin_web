import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const { logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleClickSubNav = async () => {
    localStorage.clear();
    navigate("/login");
    // window.location.reload();
  }

  return (
    <div>
      <IconButton
        // id="demo-positioned-button"
        // aria-controls={open ? 'demo-positioned-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <PersonOutlinedIcon />
      </IconButton>
      <Menu
        // id="demo-positioned-menu"
        // aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'left',
        // }}
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'left',
        // }}
      >
        <MenuItem onClick={handleClickSubNav}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
