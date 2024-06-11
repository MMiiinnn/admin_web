import { useEffect, useState } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { tokens } from "../../theme";
import { fetchInvoice } from "../../data/data"; // Change to call API
import Header from "../../components/Header";
import DetailPanel from "../../components/DetailPanel";
import { getDetailInvoice } from "../../services/adminService";

function Invoices() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [listInvoice, setListInvoice] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [detail, setDetail] = useState();

  const handleRowClick = async (params) => {
    setSelectedRow(params.row);
    const res = await getDetailInvoice( params.row.id );
    setDetail(res);
  };

  const handleClose = () => {
    setSelectedRow(null);
    window.location.reload();
  };

  useEffect(() => {
    const getList = async () => {
      const results = await fetchInvoice();
      if (results) {
        setListInvoice(results);
      }
    };
    getList();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "id_customer",
      headerName: "ID khách hàng",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "item_fee",
      headerName: "Giá sản phẩm",
      renderCell: (params) => (
        <Typography marginTop="15px">
          {params.row.item_fee} vnd
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "ship_fee",
      headerName: "Phí vận chuyển",
      renderCell: (params) => (
        <Typography marginTop="15px">
          {params.row.ship_fee} vnd
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "total",
      headerName: "Tổng",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]} marginTop="15px">
          {params.row.total} vnd
        </Typography>
      ),
    },
    {
      field: "name_payment_method",
      headerName: "Phương thức thanh toán",
      flex: 1,
    },
    {
      field: "name_status",
      headerName: "Trạng thái",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Quản lý hóa đơn" subtitle="Danh sách" />
      <Box
        position="relative"
        m="40px 0 0 0"
        height="73vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[700],
            borderTop: "none",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={listInvoice}
          columns={columns}
          editMode="row"
          onRowClick={handleRowClick}
        />
        {selectedRow && (
          <DetailPanel row={selectedRow} handleClose={handleClose} detail={detail} />
        )}
      </Box>
    </Box>
  );
}

export default Invoices;
