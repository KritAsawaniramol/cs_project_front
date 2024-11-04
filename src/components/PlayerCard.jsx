import {
  Forward,
} from '@mui/icons-material'
import CloseIcon from "@mui/icons-material/Close";

import { Card, CardActions, CardContent, CardMedia, IconButton, Typography, CardHeader } from '@mui/material'
import PropTypes from 'prop-types';


function PlayerCard({ item, onClickFunc, handleDeleteMember }) {


  console.log(item);
  return (
  
      <Card sx={{ width: "300px" }}>
        {
          handleDeleteMember ?
            <CardHeader
              action={
                <IconButton
                  onClick={() => handleDeleteMember(item?.id)}
                >
                  <CloseIcon />
                </IconButton>
              }
            /> : null
        }
        
        <CardMedia
          component="img"
         
          src={`http://localhost:8080/${item.image_profile_path}`}
          height={'300px'}
          
          sx={{ objectFit: "contain", height: '300px' }}
        ></CardMedia>
        <CardContent>
          <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
            {item.first_name_eng === ""
              ? "First name"
              : item.first_name_eng}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>
            {item.last_name_eng === "" ? "Last name" : item.last_name_eng}
          </Typography>
          <Typography>
            {"Position:" +
              (item.position === "" ? "Position " : item.position)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: `flex-end` }}>
          <IconButton onClick={onClickFunc}>
            <Forward />
          </IconButton>
        </CardActions>
      </Card>
  
  )
}

PlayerCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name_eng: PropTypes.string,
    last_name_eng: PropTypes.string,
    position: PropTypes.string,
    image_profile_path: PropTypes.string.isRequired, 
  }).isRequired,
  onClickFunc: PropTypes.func.isRequired,
  handleDeleteMember: PropTypes.func,
};

export default PlayerCard