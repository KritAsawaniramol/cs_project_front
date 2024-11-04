import style from "./FindPerson.module.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ResponsiveDrawer from "./ResponsiveDrawer";
import PersonCard from "./card/PersonCard";

export default function FindPerson() {
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
            <div>Find Persons</div>
          </div>
        </div>

        <div className={style.container}>
          <PersonCard />
        </div>


      </Box>
      </Box>
    </>
  );
}
