import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { fetchStaff } from "../../data/data"; // Change to call API
import Header from "../../components/Header";
import { useEffect, useState } from "react";

function Staff() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [listStaff, setListStaff] = useState({});
  const [rows, setRows] = useState(listStaff);

  const getList = async () => {
    const results = await fetchStaff();
    if (results) {
      setListStaff(results);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      editable: true,
    },

    // Chuyển thành action sửa và xóa

    // Level
    // {
    //   field: "access",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];

  const handleUpdateRow = async () => {

  }

  const handleCreate = async () => {

  }


  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="TEAM" subtitle="Managing the Staff Members" />
        <Box>
          <Button
            onClick={handleCreate}
            variant="contained"
            style={{
              padding: "10px 40px",
              margin: "10px 10px",
              backgroundColor: colors.blueAccent[400],
              color: "white",
              border: "none",
              
            }}
          >
            New
          </Button>
        </Box>
      </Box>
      <Box
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
        }}
      >
        <DataGrid
          rows={listStaff}
          columns={columns}
          editMode="row"
          checkboxSelection
          processRowUpdate={handleUpdateRow}
        />
      </Box>
    </Box>
  );
}

export default Staff;
