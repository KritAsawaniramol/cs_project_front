import React, { useEffect, useState } from "react";
import style from "./About.module.css";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function About() {
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const roleId = localStorage.getItem("roleID");
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const currentDate = new Date();
  const birthDate = new Date(role === "normal" ? data?.normal_user.born : "");
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchOrganizer();
  }, []);
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setData(data.user);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchOrganizer = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/view/organizer/${roleId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      setData2(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = () => {
    if (role === "normal") {
      navigate("/editProfile");
    } else {
      navigate("/editOrganizer");
    }
  };
  return (
    <>
      <div className={style.main}>
        <div className={style.container}>
          <div
            className={style.item}
            style={{ display: `${role === "normal" ? "" : "none"}` }}
          >
            <span>Nationality:</span>
            {role === "normal" ? data?.normal_user.nationality : " "}
          </div>
          <div className={style.item}>
            <span>address:</span>
            {role === "normal"
              ? data?.normal_user.address.country &&
                data?.normal_user.address.district &&
                data?.normal_user.address.house_number &&
                data?.normal_user.address.subdistrict &&
                data?.normal_user.address.village &&
                data?.normal_user.address.postal_code !== ""
                ? data?.normal_user.address.country +
                  " " +
                  data?.normal_user.address.district +
                  " " +
                  data?.normal_user.address.house_number +
                  " " +
                  data?.normal_user.address.subdistrict +
                  " " +
                  data?.normal_user.address.village +
                  " " +
                  data?.normal_user.address.postal_code
                : "-"
              : data2?.organizer.address.country &&
                data2?.organizer.address.district &&
                data2?.organizer.address.house_number &&
                data2?.organizer.address.subdistrict &&
                data2?.organizer.address.village &&
                data2?.organizer.address.postal_code !== ""
              ? data2?.organizer.address.house_number +
                " " +
                data2?.organizer.address.village +
                " " +
                data2?.organizer.address.district +
                " " +
                data2?.organizer.address.subdistrict +
                " " +
                data2?.organizer.address.postal_code +
                " " +
                data2?.organizer.address.country
              : "-"}
          </div>
          <div
            className={style.item}
            style={{ display: `${role === "normal" ? "" : "none"}` }}
          >
            <span>Gender:</span>
            {role === "normal" ? data?.normal_user.sex : ""}
          </div>
          <div
            className={style.item}
            style={{ display: `${role === "normal" ? "" : "none"}` }}
          >
            <span>Age:</span>
            {role === "normal" ? `${age}` + " " + "years old" : ""}
          </div>
          <div
            className={style.item}
            style={{ display: `${role === "normal" ? "" : "none"}` }}
          >
            <span>Height:</span>
            {role === "normal" ? data?.normal_user.height + " cm" : ""}
          </div>
          <div
            className={style.item}
            style={{ display: `${role === "normal" ? "" : "none"}` }}
          >
            <span>Weight:</span>
            {role === "normal" ? data?.normal_user.weight + " kg" : ""}
          </div>
          <div className={style.item}>
            <span>Phone:</span>
            {role === "normal"
              ? data?.normal_user.phone
              : data2?.organizer.phone}
          </div>
          <div
            className={style.item}
            style={{ display: `${role === "normal" ? "" : "none"}` }}
          >
            <span>Position:</span>
            {role === "normal" ? data?.normal_user.position : ""}
          </div>
          <div
            className={style.item}
            style={{ display: `${role === "normal" ? "" : "none"}` }}
          >
            <span>Username:</span>
            {role === "normal" ? data?.normal_user.username : "-"}
          </div>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
