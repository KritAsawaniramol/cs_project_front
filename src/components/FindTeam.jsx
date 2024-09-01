import React, { useState } from "react";
import style from "./FindTeam.module.css";
import TeamCard from "./findTeam/TeamCard";
import ResponsiveDrawer from "./ResponsiveDrawer";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

export default function FindTeam() {
  const [name, setName] = useState("");
  const drawerWidth = 220;
  const handleName = (e) => {
    setName(e.target.value);
  };

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
            <div>Find Teams</div>
          </div>
        </div>
        
        <div className={style.container}>
          <TeamCard  />
        </div>

        </Box>
      </Box>
    </>
  );
}
