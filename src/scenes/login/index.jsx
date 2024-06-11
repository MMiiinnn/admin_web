import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import Header from "../../components/Header";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { login } from "../../services/authService";
import config from '../../config';
import { StoreContext, actions } from "../../store";
import Cookies from "js-cookie";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  // Khai báo biến
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [state, dispatch] = useContext(StoreContext);
  
  const handleSubmit_Outside = async (event) => {
    const getTokenApi = async () => {
        const results = await login({ email, password });
        console.log(results)
        if (results && results.data === 0) {
            state.showToast('Đăng nhập', 'Sai tài khoản hoặc mật khẩu', 'error');
        } else if (results && results.data !== 0) {
            Cookies.set('data', JSON.stringify(results.data));
            dispatch(actions.setUserInfo(results.data));
            state.showToast('Đăng nhập', results.message);
            navigate(config.routes.dashboard);        
        }
    };
    getTokenApi();
  };

  // Hàm show password
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEnter = (e) => {
    if (e.charCode === 13 && e.code === "Enter") {
      handleSubmit_Outside();
    }
  };

  return (
    <Box
      m="50px auto 0 auto"
      width="600px"
      p="50px 140px"
      borderRadius="10px"
      sx={{ backgroundColor: colors.primary[400] }}
    >
      <Box mt="40px">
        <Header title="LOGIN ADMIN" />
      </Box>
      <Formik onSubmit={handleSubmit_Outside} initialValues={initialValues}>
        {({ errors, touched, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box mb="30px">
              <TextField
                fullWidth
                sx={{ display: "block", width: "20rem" }}
                color="text"
                variant="standard"
                type="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                value={email}
                name="email"
                margin="normal"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                sx={{ display: "block", width: "20rem" }}
                color="text"
                variant="standard"
                type={showPassword ? "text" : "password"}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                margin="normal"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                onKeyDown={(e) => handleEnter(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box display="flex" justifyContent="end">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={email && password ? false : true}
              >
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default Login;
