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
  const currentDate = new Date();
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
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
      setData(data.organizer);
    } catch (e) {
      console.log(e);
    }
  };
  const handleEdit = () => {
    navigate("/editProfile");
  };
  return (
    <>
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.item}>
            <span>address:</span>
            {data?.address.country &&
            data?.address.district &&
            data?.address.house_number &&
            data?.address.subdistrict &&
            data?.address.village &&
            data?.address.postal_code !== ""
              ? data?.address.country +
                " " +
                data?.address.district +
                " " +
                data?.address.house_number +
                " " +
                data?.address.subdistrict +
                " " +
                data?.address.village +
                " " +
                data?.address.postal_code
              : "-"}
          </div>

          <div className={style.item}>
            <span>Phone:</span>
            {data?.phone !== "" ? data?.phone : "-"}
          </div>
        </div>
      </div>
    </>
  );
}
