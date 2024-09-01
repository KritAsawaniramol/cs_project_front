import React, { useEffect, useState } from "react";
import style from "./Stat.module.css";
import Matches from "../profile/Matches";
import StatCard from "../profile/Card";

export default function StatOther() {
  const [data, setData] = useState();
  const id = localStorage.getItem("otherId");

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
      setData(data.normalUser.normal_user_stat);
      console.log(data.normalUser.normal_user_stat);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className={style.content}>
        <div className={style.card}>
          <StatCard
            name={"Win rate"}
            value={
              data?.win_rate !== "" ? data?.win_rate.toString().slice(0, 4) : 0
            }
            suffix={"%"}
            color={"orange"}
            precision={2}
          />
        </div>
        <div className={style.card}>
          <StatCard
            name={"Total Match"}
            value={data?.total_match !== "" ? data?.total_match : 0}
          />
        </div>
        <div className={style.card}>
          <StatCard
            name={"Win"}
            value={data?.win !== "" ? data?.win : 0}
            color={"green"}
          />
        </div>
        <div className={style.card}>
          <StatCard
            name={"Goals per compatition"}
            value={
              data?.goals_per_compatition !== " "
                ? data?.goals_per_compatition
                : 0
            }
            color={"orange"}
            precision={2}
          />
        </div>
        <div className={style.card}>
          <StatCard
            name={"Lose"}
            value={data?.lose !== "" ? data?.lose : 0}
            color={"red"}
          />
        </div>
        <div className={style.card}>
          <StatCard
            name={"Goals"}
            value={parseInt(data?.goals)}
            color={"purple"}
          />
        </div>
      </div>

      <div className={style.container}>
        <Matches data={data} />
      </div>
    </>
  );
}
