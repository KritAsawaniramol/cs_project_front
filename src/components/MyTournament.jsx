import React from "react";
import ResponsiveDrawer from './ResponsiveDrawer';
import style from "./MyTournament.module.css";
import TournamentCard from "./myTournament/TournamentCard";
import { useNavigate } from "react-router-dom";
import { Box, Button, CssBaseline } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function MyTournament() {
  const navigate = useNavigate();
  const handleCreateTournament = () => {
    navigate("/createTournament");
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
              <div>My Tournament</div>
            </div>

          </div>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 2, marginRight: 3}}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateTournament}>
            Create Tournament
          </Button>
          </Box>
         
          <div className={style.container}>
            <TournamentCard />
          </div>


        </Box>
      </Box>
    </>
  );
}
