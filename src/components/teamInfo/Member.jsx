import {
  Box,
  CssBaseline,
  Typography
} from "@mui/material";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerCard from "../playerCard";

export default function Member() {

  const id = localStorage.getItem("teamId");
  const me = localStorage.getItem("id");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true)
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
    setIsLoading(false)
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
      {
        !isLoading &&
        <>
          <Typography sx={{ width: '100%' }} variant="h2">Member: {data?.member?.length || 0}</Typography>
          {
            data?.member?.map((item, index) => {
              const handleClick = () => {
                navigate("/otherProfile", { state: { id: item.id } });
                localStorage.setItem("otherId", item.id);
              };
              return (
                <Box key={index}>
                  {
                    data?.owner_id == me ?
                      <PlayerCard key={index} item={item} onClickFunc={handleClick} handleDeleteMember={handleDeleteMember} />
                      : <PlayerCard key={index} item={item} onClickFunc={handleClick} />
                  }
                </Box>
              );
            })}
        </>
      }

    </>
  );
}
