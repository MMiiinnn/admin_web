import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";

import { useState, useEffect } from "react";

import { fetchStaff, fetchImport, fetchInvoice } from "../../data/data";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [listStaff, setListStaff] = useState(null);
  const [listInvoice, setListInvoice] = useState(null);
  const [listImport, setListImport] = useState(null);

  console.log("Test listStaff", listStaff);
  console.log("Test listInvoice", listInvoice);
  console.log("Test listImport", listImport);
  useEffect(() => {
    const getStaff = async () => {
      try {
        const res = await fetchStaff();
        setListStaff(res);
      } catch (error) {
        console.log(error);
        return error.response && error.response.data;
      }
    };
    const getInvoice = async () => {
      try {
        const res = await fetchInvoice();
        setListInvoice(res);
      } catch (error) {
        console.log(error);
        return error.response && error.response.data;
      }
    };
    const getImport = async () => {
      try {
        const res = await fetchImport();
        setListImport(res);
      } catch (error) {
        console.log(error);
        return error.response && error.response.data;
      }
    };

    getStaff();
    getInvoice();
    getImport();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Bảng tổng quan"
          subtitle="Chào mừng đến với website quản lý"
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {listStaff && (
            <StatBox
              title={listStaff.length}
              subtitle="Nhân viên"
              icon={
                <PeopleOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {listInvoice && (
            <StatBox
              title={listInvoice.length}
              subtitle="Hóa đơn"
              icon={
                <ReceiptOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {listImport && (
            <StatBox
              title={listImport.length}
              subtitle="Đơn nhập"
              icon={
                <ImportExportOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}
        </Box>
        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h3"
            fontWeight="600"
            sx={{ marginBottom: "15px",
              textAlign: "center"
            }}
          >
            Bản đồ
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={false} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
