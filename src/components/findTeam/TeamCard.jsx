import React, { useEffect, useState } from "react";
import style from "./TeamCard.module.css";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Forward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import TeamCard2 from "../TeamCard2";


export default function TeamCard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [showData, setShowData] = useState([]);
  const [filter, setFilter] = useState("");


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/teams`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setData(data.teams);
      setShowData(data.teams);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };


  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
    let result = data;
    console.log("filter", value);
    if (value !== "") {
      result = result?.filter((item) => {
        return item.name.toLowerCase().startsWith(value.toLowerCase());
      });
    }
    setShowData(result)
  };
  return (
    <>
      <TextField
        placeholder="Search team by name"
        fullWidth
        onChange={handleFilter}
        value={filter}
      ></TextField>
     
      <TeamCard2 data={showData} />
    </>
  );
}
