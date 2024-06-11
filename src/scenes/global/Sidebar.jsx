import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';

import { isLogin } from "../../api/request";
import config from "../../config";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selected, setSelected] = useState("Quản lý");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await isLogin();
      setProfile(res);
      console.log(res);
    };

    fetchProfile();
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {/* Icon and Title */}
            {
              <Box
                ml="15px"
                textAlign="center"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
              </Box>
            }
          </MenuItem>

          {profile ? (
            <Box mb="25px">
              {/* Display Name */}
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "20px 0 10px 0" }}
                >
                  {profile.data.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box></Box>
          )}

          <Box
            paddingLeft="10%"
          >
            <Item
              title="Quản lý"
              to={config.routes.dashboard}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Nhân viên"
              to={config.routes.staff}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Nhà cung cấp"
              to={config.routes.provider}
              icon={<MapsHomeWorkOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Đơn nhập"
              to={config.routes.import}
              icon={<ImportExportOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Hóa đơn"
              to={config.routes.invoices}
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Forms
            </Typography>
            <Item
              title="Thêm nhân viên"
              to={config.routes.formAddStaff}
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Thêm đơn nhập"
              to={config.routes.formAddImport}
              icon={<DownloadOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Thêm nhà cung cấp"
              to={config.routes.formAddProvider}
              icon={<BeenhereOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to={config.routes.calendar}
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Order"
              to={config.routes.order}
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to={config.routes.bar}
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to={config.routes.pie}
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to={config.routes.line}
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
