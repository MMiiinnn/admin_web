import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { tokens } from "../../theme";
import { updateProfile } from "../../services/adminService";

const ProfileTable = (profile) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const initialData = [
    {
      email: profile.profile.data.email,
      name: profile.profile.data.name,
      phone: profile.profile.data.phone,
    },
  ];
  // console.log("test: ",initialData)
  const [rows, setRows] = useState(initialData);
  const [editMode, setEditMode] = useState(false);
  const [editedRows, setEditedRows] = useState(initialData);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateProfile(editedRows);
      console.log("test: ", editedRows)

    } catch (error) {
      console.log(error);
      return error.response && error.response.data;
    }
    console.log("edit row test: ", editedRows);
    setRows(editedRows);
    setEditMode(false);
    window.location.reload();
  };

  const handleCancelClick = () => {
    setEditedRows(rows);
    setEditMode(false);
  };

  const handleChange = (index, field, value) => {
    const newRows = editedRows.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setEditedRows(newRows);
  };

  const handleEnter = (e) => {
    if (e.charCode === 13 && e.code === "Enter") {
      handleSaveClick();
    }
  };

  return (
    <TableContainer>
      <Table
        sx={{
          width: "50%",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Thông tin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {editedRows.map((row, index) => (
            <>
              <TableRow key={`${index}-name`}>
                <TableCell>Họ tên</TableCell>
                <TableCell>
                  {editMode ? (
                    <TextField
                      value={row.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                    />
                  ) : (
                    row.name
                  )}
                </TableCell>
              </TableRow>
              <TableRow key={`${index}-phone`}>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>
                  {editMode ? (
                    <TextField
                      value={row.phone}
                      onChange={(e) =>
                        handleChange(index, "phone", e.target.value)
                      }
                    />
                  ) : (
                    row.phone
                  )}
                </TableCell>
              </TableRow>
              <TableRow key={`${index}-email`}>
                <TableCell>Email</TableCell>
                <TableCell>
                  {editMode ? (
                    <TextField
                      value={row.email}
                      onChange={(e) =>
                        handleChange(index, "email", e.target.value)
                      }
                    />
                  ) : (
                    row.email
                  )}
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      <div style={{ marginTop: "10px" }}>
        {editMode ? (
          <>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveClick}
              onKeyDown={handleEnter}
              sx={{
                color: colors.grey[100],
                "&:hover": {
                  color: colors.greenAccent[500],
                },
              }}
            >
              Lưu
            </Button>
            <Button
              variant="contained"
              // color="secondary"
              startIcon={<CancelIcon />}
              onClick={handleCancelClick}
              style={{ marginLeft: "10px" }}
              sx={{
                color: colors.grey[100],
                "&:hover": {
                  color: colors.greenAccent[500],
                },
              }}
            >
              Hủy
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditClick}
            sx={{
              // backgroundColor: colors.grey[100],
              color: colors.grey[100],
              border: `1px solid ${colors.grey[100]}`,
              "&:hover": {
                backgroundColor: colors.grey[100],
                color: colors.grey[900],
              },
            }}
          >
            Sửa
          </Button>
        )}
      </div>
    </TableContainer>
  );
};

export default ProfileTable;
