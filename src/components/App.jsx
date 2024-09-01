import { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import ResponsiveDrawer from './ResponsiveDrawer';
import Card from './card/Card';
import style from "./App.module.css";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';



function App() {
  const drawerWidth = 220;
  const [data, setData] = useState();
  const [showData, setShowData] = useState();
  const [filter, setFilter] = useState({
    name: "",
    sport: "",
    gender: "",
    matchStatus: "",
  });

  const status = [
    { name: "All", value: "" },
    { name: "Application opening", value: "Applications opening" },
    { name: "Coming soon", value: "Coming soon" },
    { name: "Started", value: "Started" },
    { name: "Finished", value: "Finished" },
    { name: "Cancel", value: "Cancel" },
  ];


  useEffect(() => {
    fetchData();
  }, []);


  const handleFilter = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "name") {
      filter.name = value
    } else if (name === "sport") {
      filter.sport = value
    } else if (name === "gender") {
      filter.gender = value
    } else if (name === "matchStatus") {
      filter.matchStatus = value
    }

    console.log(filter);
    let result = data;
    console.log(filter);
    if (filter.name !== "") {
      result = result?.filter((item) => {
        return item.name.toLowerCase().startsWith(filter.name.toLowerCase());
      });
    }
    if (filter.sport !== "") {
      result = result?.filter((item) => {
        return item.sport.toLowerCase().startsWith(filter.sport.toLowerCase());
      });
    }
    if (filter.gender !== "") {
      result = result?.filter((item) => {
        return item.sex.toLowerCase().startsWith(filter.gender.toLowerCase());
      });
    }

    if (filter.status !== "") {
      result = result?.filter((item) => {
        return item.status.toLowerCase().startsWith(filter.matchStatus.toLowerCase());
      });
    }


    setShowData(result)
    console.log(result);

  };


  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/competition`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setData(data.compatition);
      setShowData(data.compatition);
      // setFilterData(data.compatition);
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
          <div>Find Your</div>
            <div>Tournament</div>
          </div>
        </div>

        {/* search */}
        <div className={style.filterContainer}>
          <TextField
            name="name"
            sx={{ width: `400px` }}
            label="Name"
            placeholder="Search name"
            value={filter.name}
            onChange={(e) => handleFilter(e)}
          ></TextField>
          <TextField
            name="sport"
            sx={{ width: `200px` }}
            label="Type"
            select
            value={filter.sport}
            onChange={(e) => handleFilter(e)}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"Football"}>Football</MenuItem>
            <MenuItem value={"Futsal"}>Futsal</MenuItem>
          </TextField>
          <TextField
            name="gender"
            sx={{ width: `200px` }}
            label="gender"
            select
            value={filter.gender}
            onChange={(e) => handleFilter(e)}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"Unisex"}>Unisex</MenuItem>
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </TextField>
          <TextField
            name="matchStatus"
            sx={{ width: `200px` }}
            label="Status"
            select
            value={filter.matchStatus}
            onChange={(e) => handleFilter(e)}
          >
            {status.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* tournament card */}
        <Box sx={{ p: 3 }}>
          <div className={style.cardContainer}>
            <Card data={showData} />
          </div>
        </Box>
      </Box>
    </Box>
  );
}



export default App;
