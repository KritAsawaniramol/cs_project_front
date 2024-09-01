import React from "react";
import style from "./MatchCard.module.css";
import PropTypes from "prop-types"; // Import PropTypes

const MatchCard = ({ match }) => {
  console.log(match?.match_date_time);
  return (
    <div className={style.matchCard}>
      <div className={style.teamLogo}>
        {/* <img
          src={"src/assets/image/person-circle.svg"}
          alt="Team Logo"
          className={style.teamLogo}
        /> */}
        <img
                src={`${
                  `http://localhost:8080/${match?.rival_team_image_profile}` !==
                  "http://localhost:8080/undefined"
                    ? `http://localhost:8080/${match?.rival_team_image_profile}`
                    : "src/assets/image/defaultProfile.jpg"
                }`}
                // style={{ width: `100%`, height: `100%`, objectFit: `contain` }}
                className={style.teamLogo}

              ></img>
      </div>
      <div className={style.item}>
        <h3>VS {match?.rival_team_name}</h3>
        <p>
          <strong>Competition:</strong> {match?.compatition_name}
        </p>
        <p>
          <strong>Address:</strong> {match?.compatition_address?.house_number}{" "}
          {match?.compatition_address?.village}{" "}
          {match?.compatition_address?.subdistrict}{" "}
          {match?.compatition_address?.district}{" "}
          {match?.compatition_address?.postal_code}{" "}
          {match?.compatition_address?.country}
        </p>
        <p>
          <strong>Match Date:</strong>{" "}
          {new Date(match?.match_date_time).getFullYear() === 1
            ? "-"
            : new Date(match?.match_date_time).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default MatchCard;

// Define prop types
MatchCard.propTypes = {
  match: PropTypes.shape({
    rival_team_image_profile: PropTypes.string,
    rival_team_name: PropTypes.string,
    compatition_name: PropTypes.string,
    compatition_address: PropTypes.shape({
      house_number: PropTypes.string,
      village: PropTypes.string,
      subdistrict: PropTypes.string,
      district: PropTypes.string,
      postal_code: PropTypes.string,
      country: PropTypes.string,
    }),
    match_date_time: PropTypes.string,
  }).isRequired, // Ensure match prop is required
};
