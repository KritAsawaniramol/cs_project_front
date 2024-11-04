import { useEffect, useState } from "react";
import style from "./OtherProfile.module.css";
import About from "./otherProfile/About";
import Stat from "./otherProfile/Stat";
import { useLocation } from "react-router-dom";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { CssBaseline } from "@mui/material";

export default function OtherProfile() {
  const [data, setData] = useState();
  const [about, setAbout] = useState(true);
  const [stat, setStat] = useState(false);
  const { state } = useLocation();


  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/view/normalUsers/${state.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      setData(data.normalUser);
      console.log(data.normalUser);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <CssBaseline />
      <ResponsiveDrawer />
      <div className={style.main}>
        <div className={style.header}>
          <img
            className={style.img}
            alt="cover image"
            src={`http://localhost:8080/${data?.image_cover_path}`}
          ></img>
          <div className={style.profileContainer}>
            <img
              alt="profile image"
              src={`http://localhost:8080/${data?.image_profile_path}`}
              className={style.img}
            ></img>
          </div>
          <div className={style.textHeader}>
            {data?.normal_user_info.first_name_eng && data?.normal_user_info.last_name_eng !== ""
              ? data.normal_user_info.first_name_eng + " " + data.normal_user_info.last_name_eng
              : "First name " + "Last name"}
          </div>
          <div className={style.textDescription}>
            {data?.normal_user_info.description !== "" ? data?.normal_user_info.description : "Description"}
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
            Stat
          </div>
        </div>
        <div className={style.content}>{about ? <About /> : <Stat />}</div>
      </div>
    </>
  );
}
