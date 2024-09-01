import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import style from "./OtherOrganizer.module.css";
import { AccountCircle } from "@mui/icons-material";

import { useLocation } from "react-router-dom";
import About from "./organizer/About";
import Compatition from "./organizer/Compatition";
import { CssBaseline } from "@mui/material";

export default function OtherOrganizer() {
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");
  const [data, setData] = useState();
  const [about, setAbout] = useState(true);
  const [stat, setStat] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/view/organizer/${state.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      setData(data.organizer);
      console.log(data.organizer);
    } catch (e) {
      console.log(e);
    }
  };
  const handleAbout = () => {
    setAbout(true);
    setStat(false);
  };
  const handleStat = () => {
    setAbout(false);
    setStat(true);
  };

  return (
    <>
    <CssBaseline />
      <ResponsiveDrawer />
      <div className={style.main}>
        <div className={style.header}>
          <img
            className={style.img}
            alt="cover image"
            src={
              cover !== ""
                ? cover
                : `http://localhost:8080/${data?.image_cover_path}`
            }
          ></img>
          <div className={style.profileContainer}>
            <img
              alt="profile image"
              src={
                profile !== ""
                  ? profile
                  : `http://localhost:8080/${data?.image_profile_path}`
              }
              //`${data?.image_profile_path}`}
              className={style.img}
            ></img>
          </div>
          <div className={style.textHeader}>
            {data?.name !== "" ? data?.name : "Organizer name "}
          </div>
          <div className={style.textDescription}>
            {data?.description !== "" ? data?.description : "Description"}
          </div>
        </div>
        <div className={style.tabs}>
          <div
            className={style.button}
            style={{ borderBottom: `${about ? "1px solid black" : ""}` }}
            onClick={handleAbout}
          >
            About
          </div>
          <div
            className={style.button}
            style={{ borderBottom: `${stat ? "1px solid black" : ""}` }}
            onClick={handleStat}
          >
            Compatition
          </div>
        </div>
        <div className={style.content}>
          {about ? <About /> : <Compatition data={data} />}
        </div>
      </div>
    </>
  );
}
