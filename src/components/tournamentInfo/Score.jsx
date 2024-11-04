import { Box, IconButton } from "@mui/material";
import  { useEffect, useState } from "react";
import style from "./Score.module.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import PropTypes from "prop-types";

export default function Score(props) {
  const { id, update } = props;
  const role = localStorage.getItem("role");
  const roleId = localStorage.getItem("roleID");
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchData();

  }, []);
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/competition/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setData(data.compatition);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  };


  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (

    <Box
      sx={{
        p: `1rem`,
      }}
    >
      <Box>
        <table className={style.mytable}>
          <thead>
            <tr>
              <th style={{ width: `200px` }}>Date</th>
              <th style={{ width: `200px` }}>Video</th>
              <th style={{ width: `200px` }}>Opponent</th>
              <th style={{ width: `200px` }}>Score</th>
              <th style={{ width: `200px` }}>Vs. Opponent</th>
              <th
                style={{
                  width: `200px`,
                  display: `${role === "organizer" && roleId == data?.organizer_info.id
                      ? ""
                      : "none"
                    }`,
                }}
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.match.map((item, index) => {
              const handleUpdate = () => {
                navigate("/matchesForm", {
                  state: { id: item?.id, comID: data.id },
                });
                console.log(item?.id);
              };
              const openInNewTab = () => {
                console.log("item?.video_url" + item?.video_url);
                const newWindow = window.open(
                  item?.video_url,
                  "_blank",
                  "noopener,noreferrer"
                );
                if (newWindow) newWindow.opener = null;
              };

              const date =
                item?.date_time &&
                  dayjs(item?.date_time).format("DD/MM/YYYY") !== "01/01/0001"
                  ? dayjs(item?.date_time).format("DD/MM/YYYY HH:mm")
                  : "-";
              return (
                <tr key={index}>
                  <td>{date}</td>
                  <td>
                    <IconButton
                      disabled={item?.video_url == ""}
                      onClick={openInNewTab}
                    >
                      <SmartDisplayIcon />
                    </IconButton>
                  </td>
                  <td
                    style={{
                      display: `flex`,

                      width: `100%`,
                      // gap: `1rem`,
                      alignItems: `center`,
                      height: `auto`,
                    }}
                  >



                    {data?.teams.map((team, index) =>
                      item?.team1_id === team.id ? (
                        <img
                          key={index}
                          style={{
                            width: 40,
                            // height: 68,
                            objectFit: `contain`,
                            marginRight: `1rem`,
                          }}
                          src={`http://localhost:8080/${team.image_profile_path}`}
                        />
                      ) : null


                    )}
                    {data?.teams.map((team) =>
                      item?.team1_id === team?.id ? team?.name : ""
                    )}



                    
                  </td>
                  <td
                    // style={{
                    //   item?.result == "Team1Win" 
                    //   ? backgroundColor:`green`
                    //   : backgroundColor: `blue`
                    // }}
                    className={`${style.cell} ${item?.result == "Team1Win"
                        ? style.winTeam1
                        : item?.result == "Team2Win"
                          ? style.winTeam2
                          : item?.result == "Draw"
                            ? style.draw
                            : item?.result == "none"
                              ? style.none
                              : style.unassigned
                      }`}



                  >{item.team1_goals + " - " + item.team2_goals}</td>
                  <td
                    style={{
                      display: `flex`,
                      // gap: `1rem`,
                      alignItems: `center`,
                    }}
                  >
                    {data?.teams.map((team, index) =>
                      item?.team2_id === team.id ? (
                        <img key={index}
                          style={{
                            width: 40,
                            // height: 40,
                            objectFit: `contain`,
                            marginRight: `1rem`,
                          }}
                          src={`http://localhost:8080/${team?.image_profile_path}`}
                        />

                      ) :null

                    )}
                    {data?.teams.map((team) =>
                      item?.team2_id === team.id ? team.name : ""
                    )}
                  </td>
                  <td
                    style={{
                      display: `${role === "organizer" &&
                          roleId == data?.organizer_info.id
                          ? ""
                          : "none"
                        }`,
                    }}
                  >
                    <button
                      className={style.buttonn}
                      disabled={
                        data?.status != "Started" ||
                        (data?.type == "Round Robin"
                          && (item?.team1_id == 0 || item?.team2_id == 0))}
                      onClick={handleUpdate}
                      style={{
                        display: `${role === "organizer" &&
                            roleId == data?.organizer_info.id
                            ? ""
                            : "none"
                          }`,
                      }}
                    >
                      Update matches
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

Score.propTypes = {
  id: PropTypes.string.isRequired, 
  update: PropTypes.func.isRequired, 
};