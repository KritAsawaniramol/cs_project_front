import React, { useEffect, useState } from "react";

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

      {/* {data?.map((item, index) => {
        const startDate = dayjs(item?.start_date).format("DD/MM/YYYY");
        const endDate = dayjs(item?.end_date).format("DD/MM/YYYY");
        const handleClick = () => {
          navigate(`/tournamentInfo`, {
            state: { id: item.id, orgId: item.organizer_id },
          });
        };
        return (
          <Card
            key={index}
            sx={{ width: 300, cursor: `pointer` }}
            onClick={handleClick}
          >
            <CardMedia
              sx={{ height: 150 }}
              image={
                banner !== ""
                  ? banner
                  : `http://localhost:8080/${item?.image_banner}`
              }
            ></CardMedia>
            <CardContent>
              <Typography >{"Name:" + " " + item?.name}</Typography>
              <Typography
                sx={{
                  width: `fit-content`,
                  px: 1,
                  borderRadius: "10px",
                  backgroundColor: `${
                    item?.status === "Applications opening"
                      ? "lightgreen"
                      : item?.status === "Coming soon"
                      ? "lightblue"
                      : item?.status === "Started"
                      ? "yellow"
                      : item?.status === "Finished"
                      ? "orange"
                      : "red"
                  }`,
                }}
              >
                {item?.status}
              </Typography>

              <Typography>{startDate + " " + "-" + " " + endDate}</Typography>
              <Typography>
                {"Address:" + " " + item?.address.house_number &&
                item?.address.village &&
                item?.address.district &&
                item?.address.subdistrict &&
                item?.address.postal_code &&
                item?.address.country !== ""
                  ? "Address: " +
                    item?.address.house_number +
                    " " +
                    item.address.village +
                    " " +
                    item.address.district +
                    " " +
                    item.address.subdistrict +
                    " " +
                    item.address.postal_code +
                    " " +
                    item.address.country
                  : "-"}
              </Typography>
              <Typography>
                {item?.sport !== "" ? "Sport: " + item.sport : "-"}
              </Typography>
              <Typography>
                {item?.sex !== "" ? "Gender: " + item.sex : "-"}
              </Typography>
              <Typography>
                {item.age_over && item.age_under !== 0
                  ? "Age: " +
                    item.age_over +
                    " - " +
                    item.age_under +
                    " years old"
                  : "Age: -"}
              </Typography>
            </CardContent>
            <CardActions>
              <AccountCircle />
              <Typography sx={{ pl: 1 }}>{item?.organizer_name}</Typography>
            </CardActions>
          </Card>
        );
      })} */}

    </>
  );
}
