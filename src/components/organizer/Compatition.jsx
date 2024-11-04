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
import PropTypes from "prop-types"; 

export default function Compatition(props) {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <div className={style.main}>
      {data?.compatition.map((item, index) => {
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
              component="img"
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


Compatition.propTypes = {
  data: PropTypes.shape({
    compatition: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired, 
        organizer_id: PropTypes.string.isRequired, 
        name: PropTypes.string,
        status: PropTypes.string,
        start_date: PropTypes.string.isRequired, 
        end_date: PropTypes.string.isRequired, 
        address: PropTypes.shape({
          house_number: PropTypes.string,
          village: PropTypes.string,
          subdistrict: PropTypes.string,
          district: PropTypes.string,
          postal_code: PropTypes.string,
          country: PropTypes.string,
        }),
        sport: PropTypes.string,
        sex: PropTypes.string,
        age_over: PropTypes.number,
        age_under: PropTypes.number,
        format: PropTypes.string,
        image_banner: PropTypes.string,
        organizer_name: PropTypes.string,
      })
    ).isRequired, 
  }).isRequired, 
};