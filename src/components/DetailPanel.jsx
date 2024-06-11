import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { tokens } from "../theme";
import { getConfirmInvoice } from "../services/adminService";
import { useState } from "react";

function DetailPanel({ row, handleClose, detail }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [newRow, setNewRow] = useState(row);
  const [showDetailTable, setShowDetailTable] = useState(false);

  const {
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: newRow,
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const res = await getConfirmInvoice(row.id);
    setNewRow(res);
    handleClose();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: -50,
        left: 140,
        bgcolor: colors.blueAccent[900],
        color: colors.primary[100],
        border: "1px solid",
        borderColor: colors.primary[300],
        borderRadius: 2,
        p: 2,
        boxShadow: 3,
      }}
    >
      {detail && (
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
          <Typography variant="h5">{`Chi tiết hóa đơn #${row.id}`}</Typography>
          <Typography>
            ID Khách hàng:{" "}
            <span style={{ marginLeft: "4.55rem" }}>
              {detail.info.id_customer}
            </span>
          </Typography>
          <Typography>
            Số điện thoại:{" "}
            <span style={{ marginLeft: "5.25rem" }}>
              {detail.info.phone_customer}
            </span>
          </Typography>
          <Typography
            onMouseEnter={() => setShowDetailTable(true)}
            onMouseLeave={() => setShowDetailTable(false)}
            sx={{ cursor: "pointer" }}
          >
            Đơn giá:
            <span style={{ marginLeft: "7.5rem" }}>
              {detail.info.item_fee} vnd
            </span>
            {showDetailTable && (
              <Box
                sx={{
                  position: "absolute",
                  top: "0",
                  left: 360,
                  width: "400px",
                  borderRadius: 2,
                  p: 2,
                  zIndex: 1,
                }}
              >
                <Paper>
                  <Table
                    sx={{
                      backgroundColor: colors.blueAccent[900],
                      color: colors.primary[100],
                      border: "1px solid"
                    }}
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell>Sản phẩm</TableCell>
                        <TableCell>Giá</TableCell>
                      </TableRow>
                      {detail.data.map((value, index) => {
                        return (
                          <TableRow>
                            <TableCell>{value.name}</TableCell>
                            <TableCell>{value.unit_price}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>
            )}
          </Typography>
          <Typography>
            Phí vận chuyển:{" "}
            <span style={{ marginLeft: "4.45rem" }}>
              {detail.info.ship_fee} vnd
            </span>
          </Typography>
          <Typography>
            Tổng:{" "}
            <span style={{ marginLeft: "8.45rem" }}>
              {detail.info.total} vnd
            </span>
          </Typography>
          <Typography>
            Phương thức thanh toán:{" "}
            <span style={{ marginLeft: "1rem" }}>
              {detail.info.name_payment_method}
            </span>
          </Typography>
          <Typography>
            Hình thức:{" "}
            <span style={{ marginLeft: "6.7rem" }}>
              {detail.info.name_customer}
            </span>
          </Typography>
          <Typography>
            Địa chỉ:{" "}
            <span style={{ marginLeft: "7.7rem" }}>{detail.info.address}</span>
          </Typography>
          <Typography>
            Ghi chú:{" "}
            <span style={{ marginLeft: "7.45rem" }}>
              {detail.info.description}
            </span>
          </Typography>
          <Typography>
            Ngày tạo hóa đơn:{" "}
            <span style={{ marginLeft: "3.55rem" }}>
              {detail.info.datetime}
            </span>
          </Typography>
          <Typography>
            Trạng thái:{" "}
            <span style={{ marginLeft: "6.6rem" }}>
              {detail.info.name_status}
            </span>
          </Typography>
          <Stack direction="row" spacing={2}>
            {row.id_status === 0 && (
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid}
                sx={{
                  fontWeight: 500,
                  border: `1px solid ${colors.grey[100]}`,
                  "&:hover": {
                    color: colors.grey[900],
                    backgroundColor: colors.greenAccent[500],
                  },
                }}
              >
                Xác nhận đơn
              </Button>
            )}
            <Button
              type="button"
              variant="outlined"
              onClick={handleClose}
              sx={{
                color: colors.grey[100],
                backgroundColor: colors.grey[900],
                border: `1px solid ${colors.grey[100]}`,
                "&:hover": {
                  color: colors.grey[900],
                  backgroundColor: colors.grey[100],
                },
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}

export default DetailPanel;
