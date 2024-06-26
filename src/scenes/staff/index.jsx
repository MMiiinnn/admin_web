import { Box, useTheme } from "@mui/material";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import { tokens } from "../../theme";
import { fetchStaff } from "../../data/data"; // Change to call API
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { updateStaff, deleteStaff } from "../../services/adminService";

function Staff() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [listStaff, setListStaff] = useState({});
  const [rows, setRows] = useState();

  // state để check đang chỉnh sửa
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    const getList = async () => {
      const res = await fetchStaff();
      const results = res.filter((row) => row.status === 1)
      // console.log(results);
      if (results) {
        setListStaff(results);
        setRows(results);
      }
    };
    getList();
  }, []);

  // Xử lý khi bấm ra ngoài hàng khác
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // chuyển sang chế độ chỉnh sửa
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  // handle nút save
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  // handle nút delete
  const handleDeleteClick = (id) => async () => {
    await deleteStaff(id);
    setRows(rows.filter((row) => row.id !== id));
    window.location.reload();
  };

  // Cập nhật
  const handleUpdateRow = async (newRow, oldRow) => {
    const body = {
      name: newRow.name,
      phone: newRow.phone,
      address: newRow.address
    }
    try {
      await updateStaff(newRow.id, body);
      const updatedRows = rows.map((row) =>
        row.id === newRow.id ? newRow : row
      );
      setRows(updatedRows);
      return newRow;
    } catch (error) {
      console.error("Failed to update row:", error);
      return oldRow;
    }
  };

  // handle nút cancel
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  // Change
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    // cột id
    {
      field: "id",
      headerName: "ID",
    },
    // cột tên
    {
      field: "name",
      headerName: "Họ tên",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    // cột số điện thoại
    {
      field: "phone",
      headerName: "Số điện thoại",
      flex: 1,
      editable: true,
    },
    // cột địa chỉ
    {
      field: "address",
      headerName: "Địa chỉ",
      flex: 1,
      editable: true,
    },
    // cột chức năng
    {
      field: "actions",
      type: "actions",
      headerName: "Chức năng",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        // check xem có đang chỉnh sửa hay không
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: colors.grey[100],
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Quản lý nhân viên" subtitle="Danh sách" />
      {/* Có phần form không cần thêm new */}

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
          // Xử lý cập nhật hàng
          processRowUpdate={handleUpdateRow}
          // Trạng thái của hàng (chỉnh sửa hay không)
          rowModesModel={rowModesModel}
          // Sự kiện khi chế độ hàng thay đổi
          onRowModesModelChange={handleRowModesModelChange}
          // Sự kiện khi chỉnh sửa hàng dừng lại
          onRowEditStop={handleRowEditStop}
        />
      </Box>
    </Box>
  );
}

export default Staff;
