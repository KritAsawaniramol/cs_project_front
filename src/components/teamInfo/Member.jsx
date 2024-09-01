import {

  CssBaseline,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerCard from "../playerCard";


export default function Member(props) {
  const { teamID } = props;

  const id = localStorage.getItem("teamId");
  const me = localStorage.getItem("id");
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/teams/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setData(data.teams);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteMember = async (selectedID) => {
    const res = await fetch(`http://localhost:8080/user/team/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ normal_user_id: selectedID }),
    });

    const data = await res.json();
    if (res.status == 200) {
      alert(data.message)
    } else {
      alert(data.message)
    }
    window.location.reload();
  };


  return (
    <>
      <CssBaseline />
      {data?.member?.map((item, index) => {
        const handleClick = () => {
          navigate("/otherProfile", { state: { id: item.id } });
          localStorage.setItem("otherId", item.id);
        };

        return (
          <>
            {
              data?.owner_id == me ? 
              <PlayerCard key={index} item={item} onClickFunc={handleClick} handleDeleteMember={handleDeleteMember} />
              :<PlayerCard key={index} item={item} onClickFunc={handleClick}  />
            
            }
          </>
        );
      })}
    </>
  );
}
