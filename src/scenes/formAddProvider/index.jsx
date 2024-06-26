import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { addProvider } from "../../services/adminService";

const initialValues = {
  name: "",
  phone: "",
  address: "",
};

const phoneRegExp = /([\\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

const userSchema = yup.object().shape({
  name: yup.string().required("Không được bỏ trống!"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ!")
    .required("Không được bỏ trống!"),
  address: yup.string().required("Không được bỏ trống!"),
});

function FormAddProvider() {
  const isNonMoBile = useMediaQuery("min-width: 600px");

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const res = await addProvider(values)
      if(res){
        alert("Thêm nhà cung cấp thành công!");
        resetForm();
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Box m="20px">
      <Header title="Thêm nhà cung cấp" subtitle="Điền thông tin vào form" />

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
                label="Công ty"
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

export default FormAddProvider;
