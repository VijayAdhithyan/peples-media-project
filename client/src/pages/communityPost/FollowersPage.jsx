import React from "react";
import LeftSideBar from "../../components/leftSideBar/LeftSideBar";
import CommunityFollowers from "../../components/community/CommunityFollowers";
import { Box, Stack } from "@mui/material";

const FollowersPage = () => {
  return (
    <Box>
      <Stack>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: "1", display: { xs: "none", md: "flex" } }}>
            <LeftSideBar />
          </Box>
          <Box style={{ flex: "3" }}>
            <CommunityFollowers />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default FollowersPage;
