import React from "react";
import LeftSideBar from "../../components/leftSideBar/LeftSideBar";
import CommunityProfile from "../../components/community/CommunityProfile";
import { Box, Stack } from "@mui/material";

const ProfilePage = () => {
  return (
    <Box>
      <Stack>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: "1", display: { xs: "none", md: "flex" } }}>
            <LeftSideBar />
          </Box>
          <Box style={{ flex: "3" }}>
            <CommunityProfile />
          </Box>
          {/* <div style={{ flex: "1.5" }}><RightSideBar /></div> */}
        </Box>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
