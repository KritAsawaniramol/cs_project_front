import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ForwardIcon from "@mui/icons-material/Forward";
import { useNavigate } from "react-router-dom";
import TeamCard2 from "../TeamCard2";

export default function JoinTeam() {
  const [data, setData] = useState([]);
  const [cover, setCover] = useState("");
  const roleId = localStorage.getItem("roleID");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/view/normalUsers/${roleId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      setData(data.normalUser.TeamJoined);
      console.log("TeamJoined: ", data.normalUser.TeamJoined);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>

        <TeamCard2 data={data} />
    </>
  );
}
