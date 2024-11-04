import { useEffect, useState } from "react";
import style from "./About.module.css";

export default function About() {
  const id = localStorage.getItem("otherId");
  const [data, setData] = useState();
  const currentDate = new Date();
  const birthDate = new Date(data?.born);
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/normalUsers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setData(data.normalUser.normal_user_info);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.item}>
            <span>Nationality:</span>
            {data?.nationality !== "" ? data?.nationality : "-"}
          </div>
          <div className={style.item}>
            <span>Address:</span>
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
            <span>Gender:</span>
            {data?.sex !== "" ? data?.sex : "-"}
          </div>
          <div className={style.item}>
            <span>Age:</span>
            {age} years old
          </div>
          <div className={style.item}>
            <span>Height:</span>
            {data?.height + " cm"}
          </div>
          <div className={style.item}>
            <span>Weight:</span>
            {data?.weight + " kg"}
          </div>
          <div className={style.item}>
            <span>Phone:</span>
            {data?.phone !== "" ? data?.phone : "-"}
          </div>
          <div className={style.item}>
            <span>Position:</span>
            {data?.position !== "" ? data?.position : "-"}
          </div>

          {/* <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton> */}
        </div>
      </div>
    </>
  );
}
