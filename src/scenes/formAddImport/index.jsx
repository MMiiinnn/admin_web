import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { addStaff } from "../../services/adminService";

const initialValues = {
  name_provider: "",
  name_staff: "",
  phone: "",
  address: "",
  password: "",
};

const userSchema = yup.object().shape({
  name_provider: yup.string().required("Không được bỏ trống!"),
  name_staff: yup.string().required("Không được bỏ trống!"),
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
      <Header title="Thêm đơn nhập" subtitle="Điền thông tin vào form" />

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
                label="Tên công ty"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name_provider"
                error={!!touched.name_provider && !!errors.name_provider}
                helperText={touched.name_provider && errors.name_provider}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên nhân viên phụ trách"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name_staff}
                name="name_staff"
                error={!!touched.name_staff && !!errors.name_staff}
                helperText={touched.name_staff && errors.name_staff}
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
