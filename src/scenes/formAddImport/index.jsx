import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { addImport } from "../../services/adminService";

const initialValues = {
  id_provider: "",
  description: "",
};

const userSchema = yup.object().shape({
  id_provider: yup.string().required("Không được bỏ trống!"),
  description: yup.string().required("Không được bỏ trống!"),
});

function FormAddStaff() {
  const isNonMoBile = useMediaQuery("min-width: 600px");

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const res = await addImport(values)
      if(res){
        alert("Thêm đơn nhập thành công!");
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
                label="ID nhà cung cấp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_provider}
                name="id_provider"
                error={!!touched.id_provider && !!errors.id_provider}
                helperText={touched.id_provider && errors.id_provider}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mô tả"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
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
