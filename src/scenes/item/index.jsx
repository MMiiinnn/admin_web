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
import { fetchItem } from "../../data/data"; // Change to call API
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { updateItem, deleteItem } from "../../services/adminService";

function Item() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [listItem, setListItem] = useState({});
  const [rows, setRows] = useState();

  // state để check đang chỉnh sửa
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    const getList = async () => {
      const res = await fetchItem();
      // console.log(results);
      if (res) {
        setListItem(res);
        setRows(res);
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
    await deleteItem(id);
    setRows(rows.filter((row) => row.id !== id));
    window.location.reload();
  };

  // Cập nhật
  const handleUpdateRow = async (newRow, oldRow) => {
    const body = {
      id_type: newRow.id_type,
      id_brand: newRow.id_brand,
      id_material: newRow.id_material,
      id_origin: newRow.id_origin,
      name: newRow.name,
    }
    try {
      await updateItem(newRow.id, body);
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
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Sản phẩm",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "id_type",
      headerName: "Mã loại",
      editable: true,
    },
    {
      field: "id_brand",
      headerName: "Mã thương hiệu",
      editable: true,
    },
    {
      field: "id_material",
      headerName: "Mã chất liệu",
      editable: true,
    },
    {
      field: "id_origin",
      headerName: "Mã xuất xứ",
      editable: true,
    },
    {
      field: "description",
      headerName: "Mô tả",
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
      <Header title="Quản lý hàng hóa" subtitle="Danh sách" />
      {/* Có phần form không cần thêm new */}

      {listItem && <Box
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
          rows={listItem}
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
      </Box>}
    </Box>
  );
}

export default Item;
