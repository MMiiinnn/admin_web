import PropTypes from "prop-types";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { Box } from "@mui/material";
import { StoreContext } from "../../../store";
import { useContext } from "react";

function DefaultLayout({ children }) {
  const [state, dispatch] = useContext(StoreContext);

  return (
    <Box display="flex">
      {state.userInfo ? <Sidebar /> : null}
      <Box width="100%">
        <Topbar />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
