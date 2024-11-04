import { useEffect, useState } from "react";

import '../card/Card'
import DefaultCard from "../card/Card";

export default function TournamentCard() {
  const [data, setData] = useState();
  const id = localStorage.getItem("roleID");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/view/competition?organizerID=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      setData(data.compatition);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <DefaultCard data={data} />
    </>
  );
}
