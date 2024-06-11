import { useEffect, useState, Fragment, useContext } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import DefaultLayout from "./scenes/global/DefaultLayout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { StoreContext } from "./store";
import config from "./config";
import dayjs from "dayjs";
import { privateRoutes, publicRoutes } from "./Routes";

function App() {
  const [theme, colorMode] = useMode();
  const [state, dispatch] = useContext(StoreContext);
  const titles = {
    [config.routes.login]: "Footwear - Đăng nhập",
    // [config.routes.invoice]: "Footwear - Đơn hàng",
    [config.routes.staff]: "Footwear - Nhân viên",
    [config.routes.dashboard]: "Footwear - Bảng điều khiển",
    [config.routes.invoices]: "Footwear - Hóa đơn",
    [config.routes.formAddStaff]: "Footwear - Thêm nhân viên",
    [config.routes.formAddProvider]: "Footwear - Thêm nhà cung cấp",
    [config.routes.formAddSImport]: "Footwear - Thêm đơn nhập",
    // [config.routes.profile]: "Footwear - Tài khoản",
    [config.routes.import]: "Footwear - Đơn nhập",
    [config.routes.calendar]: "Footwear - Lịch",
    [config.routes.line]: "Footwear - Biểu đồ đường",
    [config.routes.bar]: "Footwear - Biểu đồ cột",
    [config.routes.pie]: "Footwear - Biểu đồ tròn",
  };
  const location = useLocation();
  const navigate = useNavigate();

  // Check phiên đăng nhập
  useEffect(() => {
    const expireIn = dayjs(localStorage.getItem("expireIn"));
    if (dayjs().isAfter(expireIn)) {
      localStorage.clear();
      alert("The login session has expired. Please log in again.");
      navigate("/login");
    }
    document.title = titles[location.pathname] ?? "Footwear Web Page";
  }, [location]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            {privateRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Element = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    state.userInfo ? (
                      <Layout>
                        <Element />
                      </Layout>
                    ) : (
                      <Navigate to={config.routes.login} replace />
                    )
                  }
                />
              );
            })}
            {publicRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Element = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Element />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
