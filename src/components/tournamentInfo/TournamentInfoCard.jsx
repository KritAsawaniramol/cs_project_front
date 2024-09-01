import React, { useEffect, useState } from "react";
import style from "./TournamentInfoCard.module.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Forward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export default function TournamentInfoCard(props) {
  const { tourID, compatitionStatus } = props;
  const [data, setData] = useState();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const roleId = localStorage.getItem("roleID");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/view/competition/${tourID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      setData(data.compatition.teams);

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {data?.map((item, index) => {
        const handleClick = () => {
          navigate("/teamInfo", { state: { id: item?.id } });
          localStorage.setItem("otherId", item?.id);
        };
        const handleDeleteTeam = async () => {
          try {
            const res = fetch(
              `http://localhost:8080/organizer/competition/${tourID}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ team_id: item?.id }),
              }
            );
            window.location.reload()
          } catch (e) {
            console.log(e);
          }
        };

        return (
          <Card key={index} sx={{ width: 300 }}>
            <CardHeader
              action={
                <IconButton
                  disabled={
                    compatitionStatus == "Finished" ||
                    compatitionStatus == "Cancelled" ||
                    compatitionStatus == "Started"
                  }
                  onClick={handleDeleteTeam}
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardMedia
              component="img"
              image={`http://localhost:8080/${item?.image_profile_path}`}
              height={150}
              sx={{ objectFit: "contain" }}
            ></CardMedia>
            <CardContent>
              <Typography variant="h5">
                {item?.name === "" ? "First name" : item?.name}
              </Typography>
              <Typography>
                {item?.description === "" ? "Description" : item?.description}
              </Typography>
              <Typography>
                {"Member: " +
                  (item?.member.length === "" ? "-" : item?.member.length)}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: `flex-end` }}>
              <IconButton onClick={handleClick}>
                <Forward />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
      {/* <Button
        onClick={() => {
          console.log(data);
        }}
      >
        asd
      </Button> */}
    </>
  );
}
