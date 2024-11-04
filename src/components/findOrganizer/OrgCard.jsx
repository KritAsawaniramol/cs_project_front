import PropTypes from "prop-types";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Forward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


export default function OrgCard(props) {
  const navigate = useNavigate();
  const { data } = props;
  return (
    <>
    
      {data
        .map((item, index) => {
          const handleClick = () => {
            navigate("/otherOrganizer", { state: { id: item.id } });
            localStorage.setItem("otherId", item.id);
          };
          return (
            <Card key={index} sx={{ width: 300 }}>
              <CardMedia
                component="img"
                image={`http://localhost:8080/${item.image_profile_path}`}
               
                sx={{ objectFit: "contain" , height: '300px'}}
              ></CardMedia>
              <Box sx={{height: '200px', maxHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: "space-between"}}>
              <CardContent>
              <Box sx={{ maxHeight: 100, overflowY: 'auto', padding: '0', margin: '0'}}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '25px' }}>
                  {item.name === "" ? "" : item.name}
                </Typography>
                <Typography >
                  {item.description === "" ? "" : item.description}
                </Typography>
                </Box>
              </CardContent>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '22px'}}>
                  <Typography fontSize={17}>
                  {item?.phone === "" ? "Phone: - " : "Phone: " + item.phone}
                  </Typography>
                  </Box>
                  <CardActions sx={{ justifyContent: `flex-end`}}>
                    <IconButton onClick={handleClick}>
                      <Forward />
                    </IconButton>
                  </CardActions>
              </Box>
              </Box>
            </Card>
          );
        })}
    </>
  );
}

// PropTypes validation
OrgCard.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image_profile_path: PropTypes.string.isRequired,
        name: PropTypes.string,
        description: PropTypes.string,
        phone: PropTypes.string,
      })
    ).isRequired,
  };