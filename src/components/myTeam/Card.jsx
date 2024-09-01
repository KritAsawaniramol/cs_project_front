
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamCard2 from "../TeamCard2";

export default function MyTeamCard() {
  const [team, setTeam] = useState([]);
  const id = localStorage.getItem("id");
  const [cover, setCover] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/user/teams`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.teams);
      setTeam(data.teams);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <TeamCard2 data={team} />
    </>
  );
}
