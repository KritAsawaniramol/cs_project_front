import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlayerCard from "../playerCard";

export default function PersonCard() {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    firstName: "",
    lastName: "",
    position: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (e) => {
    // setSearch(e.target.value);
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "firstName") {
      console.log("case1");
      filter.firstName = value
    } else if (name === "lastName") {
      filter.lastName = value
    } else if (name === "position") {
      filter.position = value
    } 
    let result = data;
    if (filter.firstName !== "") {
      result = result?.filter((item) => {
        return item.first_name_eng.toLowerCase().startsWith(filter.firstName.toLowerCase());
      });
    }
    if (filter.lastName !== "") {
      result = result?.filter((item) => {
        return item.last_name_eng.toLowerCase().startsWith(filter.lastName.toLowerCase());
      });
    }
    
    if (filter.position !== "") {
      result = result?.filter((item) => {
        return item.position.toLowerCase().includes(filter.position.toLowerCase());
      });
    }
    
    setShowData(result)
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/normalUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setData(data);
      setShowData(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (   
    <>
      <Box width={'100%'} padding={'1rem'} >
        <TextField
          placeholder="First Name"
          label="First Name"
          name="firstName"
          value={filter.firstName}
          sx={{ width: `250px`, marginRight: `20px` }}
          onChange={handleFilter}
        ></TextField>
        <TextField
          placeholder="Last Name"
          label="Last Name"
          name="lastName"
          value={filter.lastName}
          sx={{ width: `250px`, marginRight: `20px` }}
          onChange={handleFilter}
        ></TextField>
          <TextField
          placeholder="Position Keyword"
          label="Position Keyword"
          name="position"
          value={filter.position}
          sx={{ width: `250px`, marginRight: `20px` }}
          onChange={handleFilter}
        ></TextField>
      </Box>

      {showData
        .map((item, index) => {
          const handleClick = () => {
            navigate("/otherProfile", { state: { id: item.id } });
            localStorage.setItem("otherId", item.id);
          };
          return (
            <PlayerCard key={index} item={item} onClickFunc={handleClick} />
          );
        })}

    </>
  );
}
