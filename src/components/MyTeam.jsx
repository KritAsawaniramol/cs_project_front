import React, { useState } from "react";
import style from "./MyTeam.module.css";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { Box, Button, colors, CssBaseline } from "@mui/material";
import MyTeamCard from "./myTeam/Card";
import { useNavigate } from "react-router-dom";
import JoinTeam from "./myTeam/JoinTeam";
import AddIcon from '@mui/icons-material/Add';

export default function MyTeam() {
  const navigate = useNavigate();
  const [isMyTeam, setIsMyTeam] = useState(true);
  const handleCreateTeam = () => {
    navigate("/createTeam");
  };
  const handleTeamTab = () => {
    setIsMyTeam(true);
  };

  const handleJoinTab = () => {
    setIsMyTeam(false);
  };

  const drawerWidth = 220;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ResponsiveDrawer />
        <Box
          component="main"
          sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          {/* header */}
          <div className={style.header}>
            <img className={style.img} src="src/assets/image/stadium.jpeg"></img>
            <div className={style.textheader}>
              <div>My Teams</div>
            </div>
          </div>
          <div style={{
            display: `flex`, justifyContent: `space-between`, paddingLeft: `20px`, paddingRight: `20px`, alignItems: 'center',
          }}>
            <div style={{ display: `flex` }}>
              <div
                className={style.tabs}
                style={{
                  color: `${isMyTeam ? "black" : "gray"}`,
                  fontWeight: 'bold',
                  borderBottom: `${isMyTeam ? '1px solid black' : ''}`
                }}
                onClick={handleTeamTab}
              >
                My team
              </div>
              <div
                className={style.tabs}
                style={{
                  color: `${isMyTeam ? "gray" : "black"}`,
                  fontWeight: 'bold',
                  borderBottom: `${isMyTeam ? '' : '1px solid black'}`
                }}
                onClick={handleJoinTab}
              >
                Team joined
              </div>
            </div>
            
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateTeam}>
              Create Team
            </Button>

          </div>

          <div className={style.container}>
            {isMyTeam ? <MyTeamCard /> : <JoinTeam />}
          </div>
        </Box>
      </Box>
    </>
  );
}
