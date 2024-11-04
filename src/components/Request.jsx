import { useEffect, useState } from "react";
import style from "./Request.module.css";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { Box, CssBaseline, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Incoming from "./request/Incoming";

export default function Request() {
  const [request, setRequest] = useState([{}]);
  const [name, setName] = useState("");
  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/user/requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setRequest(data.add_member_requests);
    } catch (e) {
      console.log(e);
    }
  };
  const handleName = (e) => {
    setName(e.target.value);
    console.log(name);
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
              <div>Request</div>
            </div>
          </div>
        <div className={style.search}>
          <TextField
            fullWidth
            placeholder="Team's name"
            value={name}
            onChange={handleName}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon sx={{ rotate: `90deg` }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </div>
        <div className={style.text}>PENDING - {request?.length || 0}</div>
        <div className={style.content}> 

        <Incoming search={name} />
        </div>
        </Box>
      </Box>
    </>
  );
}
