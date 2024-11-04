import  { useEffect, useState } from "react";
import style from "./Compatition.module.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Compatition() {
  const [data, setData] = useState();
  const roleId = localStorage.getItem("roleID");
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
      setData(data.organizer.compatition);

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={style.main}>
      {data?.map((item, index) => {
        const startDate = dayjs(item.start_date).format("DD/MM/YYYY");
        const endDate = dayjs(item.end_date).format("DD/MM/YYYY");
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
              image={`http://localhost:8080/${item?.image_banner}`}
            ></CardMedia>
            <CardContent>
              <Typography>
                {"Name:" + " " + item.name === ""
                  ? "Name"
                  : "Name: " + item.name}
              </Typography>
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

              <Typography>
                {startDate === " "
                  ? "-"
                  : startDate + " " + "-" + " " + endDate}
              </Typography>
              <Typography>
                {"Address: " +
                  item?.address.house_number +
                  " " +
                  item?.address.village +
                  " " +
                  item?.address.subdistrict +
                  " " +
                  item?.address.district +
                  " " +
                  item?.address.postal_code +
                  " " +
                  item?.address.country}
              </Typography>
              <Typography>{"Sport: " + item?.sport}</Typography>
              <Typography>
                {"Gender: " + item.sex === "" ? "" : "Gender: " + item.sex}
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
              <Typography>
                {item?.format !== "" ? "Format: " + item.format : "-"}
              </Typography>
            </CardContent>
            <CardActions>
              <AccountCircle />
              <Typography sx={{ pl: 1 }}>{item.organizer_name}</Typography>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
