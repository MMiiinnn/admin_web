import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { addStaff } from "../../services/adminService";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  retypePassword: "",
};

const phoneRegExp = /([\\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

const userSchema = yup.object().shape({
  name: yup.string().required("Không được bỏ trống!"),
  email: yup.string().email("Email không hợp lệ").required("Không được bỏ trống!"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ")
    .required("Không được bỏ trống!"),
  address: yup.string().required("Không được bỏ trống!"),
  password: yup.string().required("Không được bỏ trống!"),
  retypePassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không khớp!')
    .required("Không được bỏ trống!"),
});

function FormAddStaff() {
  const isNonMoBile = useMediaQuery("min-width: 600px");

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const res = await addStaff(values)
      if(res){
        alert("Thêm nhân viên thành công!");
        resetForm();
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Box m="20px">
      <Header title="Thêm nhân viên" subtitle="Điền thông tin vào form" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMoBile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Họ và tên"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Số điện thoại"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Mật khẩu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Nhập lại mật khẩu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.retypePassword}
                name="retypePassword"
                error={!!touched.retypePassword && !!errors.retypePassword}
                helperText={touched.retypePassword && errors.retypePassword}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                    Xác nhận
                </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default FormAddStaff;
