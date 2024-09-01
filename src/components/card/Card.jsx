import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import dayjs from "dayjs";
import './Card.css';

export default function DefaultCard(props) {
  const { data } = props;
  const [banner, setBanner] = useState("");

  const navigate = useNavigate();

  return (
    <>
    <CssBaseline />
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
            sx={{ width: 300, cursor: `pointer`,
          }}
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
            <CardContent className="card-content-typography">
              <Typography sx={{ 

                maxWidth: '2600px',        // Limit the width
                whiteSpace: 'nowrap',     // Prevents text from wrapping to a new line
                overflow: 'hidden',       // Ensures that overflow content is not displayed
                textOverflow: 'ellipsis', // Adds an ellipsis (...) to indicate text overflow

                fontWeight: 'bold', 
                fontSize: '20px'}}>
                {item.name === ""
                  ? ""
                  : item.name}
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
    </>
  );
}

// Define prop types
DefaultCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      sport: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      age_over: PropTypes.number,
      age_under: PropTypes.number,
      format: PropTypes.string,
      image_banner: PropTypes.string,
      organizer_id: PropTypes.number.isRequired,
      organizer_name: PropTypes.string.isRequired,
    })
  ).isRequired,
};