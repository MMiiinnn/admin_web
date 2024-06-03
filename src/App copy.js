import { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Login from "./scenes/login";
import Calendar from "./scenes/calendar/calendar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { StoreContext } from './store';
import { ConfigProvider } from 'antd';
import config from './config';
import dayjs from 'dayjs';


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [state, dispatch] = useContext(StoreContext);
  const titles = {
    [config.routes.login]: 'Footwear - Đăng nhập',
    [config.routes.order]: 'Footwear - Đơn hàng',
    [config.routes.staff]: 'Footwear - Nhân viên',
    [config.routes.dashboard]: 'Footwear - Bảng điều khiển',
    [config.routes.invoices]: 'Footwear - Hóa đơn',
    [config.routes.form]: 'Footwear - Form',
    [config.routes.profile]: 'Footwear - Tài khoản',
    [config.routes.contacts]: 'Footwear - Liên hệ',
    [config.routes.calendar]: 'Footwear - Lịch',
    [config.routes.line]: 'Footwear - Biểu đồ đường',
    [config.routes.bar]: 'Footwear - Biểu đồ cột',
    [config.routes.pie]: 'Footwear - Biểu đồ tròn',
  };
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const expireIn = dayjs(localStorage.getItem('expireIn'));
    if (dayjs().isAfter(expireIn)) {
        localStorage.clear();
        alert('The login session has expired. Please log in again.');
        navigate(config.routes.login);
    }
    document.title = titles[location.pathname] ?? 'TeaZ - Manage';
}, [location])

  return (
    <ConfigProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ConfigProvider>
  );
}

export default App;
