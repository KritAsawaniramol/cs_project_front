import style from "./FindOrganizer.module.css";
import ResponsiveDrawer from "./ResponsiveDrawer";
import OrganizerCard from "./findOrganizer/OrganizerCard";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

export default function FindOrganizer() {

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
              <div>Find Organizer</div>
            </div>
          </div>

          <div className={style.container}>
            <OrganizerCard />
          </div>
        </Box>
      </Box>
    </>
  );
}
