import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SubNav from "../../components/SubNav";
import { StoreContext } from "../../store";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [state, dispatch] = useContext(StoreContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box></Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon fontSize="small" />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {state.userInfo ? (
          <IconButton>
            <SubNav />
          </IconButton>
        ) : null}
      </Box>
    </Box>
  );
};

export default Topbar;
