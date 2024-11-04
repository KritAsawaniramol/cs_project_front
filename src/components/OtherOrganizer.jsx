import { useEffect, useState } from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import style from "./OtherOrganizer.module.css";

import { useLocation } from "react-router-dom";
import About from "./organizer/About";
import Compatition from "./organizer/Compatition";
import { CssBaseline } from "@mui/material";

export default function OtherOrganizer() {
  const [data, setData] = useState();
  const [about, setAbout] = useState(true);
  const [stat, setStat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true)
    
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
      setIsLoading(false)
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
    !isLoading && <>
    <CssBaseline />
      <ResponsiveDrawer />
      <div className={style.main}>
        <div className={style.header}>
          <img
            className={style.img}
            alt="cover image"
            src={
              data?.image_cover_path !== ""
                ? `http://localhost:8080/${data?.image_cover_path}`
                : ""
            }
          ></img>
          <div className={style.profileContainer}>
            <img
              alt="profile image"
              src={
                data?.image_profile_path !== ""
                  ? `http://localhost:8080/${data?.image_profile_path}`
                  : ""
              }
              //`${data?.image_profile_path}`}
              className={style.img}
            ></img>
          </div>
          <div className={style.textHeader}>
            {data?.name !== "" ? data?.name : "Organizer name "}
          </div>
          <div className={style.textDescription}>
            <p style={{overflowY: 'auto', maxHeight: "80px"}}>

            {data?.description !== "" ? data?.description : "Description"}
            </p>
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
            Competitions
          </div>
        </div>
        <div className={style.content}>
          {about ? <About data={data}/> : <Compatition data={data} />}
        </div>
      </div>
    </>
  );
}
