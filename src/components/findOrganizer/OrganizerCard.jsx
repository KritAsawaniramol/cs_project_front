import React, { useEffect, useState } from "react";
import {
  
  TextField,
} from "@mui/material";
import OrgCard from "./OrgCard";

export default function OrganizerCard() {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/organizer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setData(data.organizer);
      setShowData(data.organizer);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
    let result = data;
    if (value !== "") {
      result = result?.filter((item) => {
        return item.name.toLowerCase().startsWith(value.toLowerCase());
      });
    }
    setShowData(result);
  }

  return (
    <>
      <TextField
        placeholder="Search organizer by name"
        fullWidth
        onChange={handleFilter}
        value={filter}
      ></TextField>
      <OrgCard data={showData} />
    </>
  );
}
