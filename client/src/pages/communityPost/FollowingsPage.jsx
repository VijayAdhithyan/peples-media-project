import React from "react";
import LeftSideBar from "../../components/leftSideBar/LeftSideBar";
import CommunityFollowings from "../../components/community/CommunityFollowings";
import { Box, Stack } from "@mui/material";

const FollowingsPage = () => {
  return (
    <Box>
      <Stack>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: "1", display: { xs: "none", md: "flex" } }}>
            <LeftSideBar />
          </Box>
          <Box style={{ flex: "3" }}>
            <CommunityFollowings />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default FollowingsPage;
