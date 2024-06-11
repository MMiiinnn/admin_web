import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          <span style={{
            marginRight: "10px",
            verticalAlign: "middle",
          }}>{icon}</span>{subtitle}: {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
