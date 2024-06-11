import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { isLogin } from "../../api/request";
import ProfileTable from "./profileTable";

const HeaderProfile = ({ name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        Xin chào {name}!
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        Thông tin chi tiết
      </Typography>
    </Box>
  );
};

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await isLogin();
      setProfile(res);
      console.log(res);
      return res;
    };

    fetchProfile();
  }, []);
  return (
    <Box m="20px">
      {profile && <HeaderProfile name={profile.data.name} />}
      <Box>
       {profile && <ProfileTable profile={profile} />}
      </Box>
    </Box>
  );
}

export default Profile;
