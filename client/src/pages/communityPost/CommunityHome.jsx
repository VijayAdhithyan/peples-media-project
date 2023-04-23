import React from "react";
import CommunityPost from "../../components/community/CommunityPost";
import LeftSideBar from "../../components/leftSideBar/LeftSideBar";
import { Box, Stack } from "@mui/material";

const CommunityHome = () => {

  return (
    <Box className="community-home">
      <Stack>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: "1", display: { xs: "none", md: "flex" } }}>
            <LeftSideBar />
          </Box>
          <Box style={{ flex: "3" }}>
            <CommunityPost />
          </Box>
          {/* <div style={{ flex: "1.5" }}><RightSideBar /></div> */}
        </Box>
      </Stack>
    </Box>
  );
};

export default CommunityHome;
