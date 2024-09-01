import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./NextMatch.module.css";
import ResponsiveDrawer from "./ResponsiveDrawer";
import MatchCard from "./nextMatch/MatchCard";
import { CssBaseline } from "@mui/material";

export default function NextMatch() {
  const roleID = localStorage.getItem("roleID");
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/user/nextMatch`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      setData(data.next_match);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const navigate = useNavigate()

  return (
    <div>
      <CssBaseline/>
      <ResponsiveDrawer />
      <div className={style.main}>
        <div className={style.header}>
          <img className={style.img} src="src/assets/image/stadium.jpeg"></img>
          <div className={style.textheader}>
            <div>Next Matchs</div>
          </div>
        </div>
        <div>
          {data?.map((nextMatch, index) => {
            const handleClick = () => {
                console.log(nextMatch.compatition_id)
                navigate(`/tournamentInfo`, {
                  state: { id: nextMatch.compatition_id },
                });
              };
            return (
              <div onClick={handleClick} key={index}>
                <MatchCard match={nextMatch}  />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
