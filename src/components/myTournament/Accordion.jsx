import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { MenuItem, TextField } from "@mui/material";
import PropTypes from "prop-types";


export default function Accordion2(props) {
  const {
    setter1, setter2,
    goals1, goals2, player1, player2, tScore1, tScore2 } = props;


  const [timeScore1, setTimeScore1] = useState([{ player_id: 0, time_scored: 0 }]);
  const [timeScore2, setTimeScore2] = useState([{ player_id: 0, time_scored: 0 }]);

  const fetchData1 = async () => {
    try {
      await fetch(`http://localhost:8080/view/teams/1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

    } catch (e) {
      console.log(e);
    }
  };
  const fetchData2 = async () => {
    try {
      await fetch(`http://localhost:8080/view/teams/2`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });


    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    console.log(props);

    setTimeScore1(tScore1)
    setTimeScore2(tScore2)
    setter1(tScore1)
    setter2(tScore2)
    fetchData1();
    fetchData2();
    // setTimeScore1()
    // setTimeScore1()
  }, []);

  useEffect(() => {
    // const timeScore1 = [...timeScore2, { player: "", time: "" }];
    // for (let i =0; i <)
    // timeScore1
    // onTimeScoreChange(timeScore1, timeScore2)
    setter1(timeScore1)
    setter2(timeScore2)
  }, [timeScore1, timeScore2]);

  const handleAddTimeScore1 = () => {
    if (timeScore1.length < goals1) {
      const newTimeScore = [...timeScore1, { player_id: 0, time_scored: 0 }];
      // onTimeScoreChange(1, newTimeScore)
      setTimeScore1(newTimeScore);
    }
  };

  const handleAddTimeScore2 = () => {
    if (timeScore2.length < goals2) {
      const newTimeScore = [...timeScore2, { player_id: 0, time_scored: 0 }];
      // onTimeScoreChange(2, newTimeScore)
      setTimeScore2(newTimeScore);

    }
  };

  const handleDeleteTimeScore1 = (index) => {
    const newTimeScore1 = [...timeScore1];
    newTimeScore1.splice(index, 1);
    // onTimeScoreChange(1, newTimeScore)
    setTimeScore1(newTimeScore1);
  };

  const handleDeleteTimeScore2 = (index) => {
    const newTimeScore2 = [...timeScore2];
    newTimeScore2.splice(index, 1);
    // onTimeScoreChange(2, newTimeScore)
    setTimeScore2(newTimeScore2);
  };

  const handlePlayer1 = (e, i) => {
    const onChangeVal = [...timeScore1];
    onChangeVal[i].player_id = parseInt(e.target.value);
    console.log("onChangeVal: ", onChangeVal);
    setTimeScore1(onChangeVal);
  };
  const handleTime1 = (e, i) => {
    const onChangeVal = [...timeScore1];
    onChangeVal[i].time_scored = parseInt(e.target.value);
    setTimeScore1(onChangeVal);
  };
  const handlePlayer2 = (e, i) => {
    const onChangeVal = [...timeScore2];
    onChangeVal[i].player_id = parseInt(e.target.value);
    setTimeScore2(onChangeVal);
  };
  const handleTime2 = (e, i) => {
    const onChangeVal = [...timeScore2];
    onChangeVal[i].time_scored = parseInt(e.target.value);
    setTimeScore2(onChangeVal);
  };



  return (
    <>
      <Accordion sx={{ width: 600 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Goals Record
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: `1rem` }}>
            <h2>
              Team 1{" "}
              {console.log(timeScore1)}
              {timeScore1?.map((item, index) => {
                console.log(item);
                return (
                  <div key={index} style={{ display: `flex`, gap: 10 }}>
                    <TextField
                      sx={{ mt: 1, width: 750 }}
                      label={"Player Name"}
                      value={item.player_id}
                      select
                      onChange={(e) => {
                        handlePlayer1(e, index);
                      }}
                    >
                      {player1?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item?.first_name_eng} {item?.last_name_eng}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                    <TextField
                      type="number"
                      sx={{ mt: 1, width: 300 }}
                      label="Time (min)"
                      value={item?.time_scored}
                      error={
                        parseInt(item?.time_scored) < 0
                      }
                      onChange={(e) => {
                        handleTime1(e, index);
                      }}
                    ></TextField>
                    <Button
                      sx={{ mt: 1, px: 5 }}
                      variant="contained"
                      onClick={() => handleDeleteTimeScore1(index)}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
            </h2>
            <Button
              sx={{ mt: 1 }}
              variant="contained"
              onClick={handleAddTimeScore1}
            >
              Add Timescore
            </Button>
          </div>
          <div style={{ marginBottom: `1rem` }}>
            <h2>
              Team 2{" "}
              {timeScore2?.map((item, index) => {
                return (
                  <div key={index} style={{ display: `flex`, gap: 10 }}>
                    <TextField
                      sx={{ mt: 1, width: 750 }}
                      label="Player Name"
                      value={item?.player_id}
                      select
                      onChange={(e) => {
                        handlePlayer2(e, index);
                      }}
                    >
                      {player2?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item?.first_name_eng} {item?.last_name_eng}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                    <TextField
                      type="number"
                      sx={{ mt: 1, width: 300 }}
                      label="Time (min)"
                      error={
                        parseInt(item?.time_scored) < 0
                      }
                      value={item?.time_scored}
                      onChange={(e) => {
                        handleTime2(e, index);
                      }}
                    ></TextField>
                    <Button
                      sx={{ mt: 1, px: 5 }}
                      variant="contained"
                      onClick={() => handleDeleteTimeScore2(index)}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
            </h2>
            <Button
              sx={{ mt: 1 }}
              variant="contained"
              onClick={handleAddTimeScore2}
            >
              Add Timescore
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

Accordion2.propTypes = {
  setter1: PropTypes.func.isRequired,  // Function to set state, required
  setter2: PropTypes.func.isRequired,  // Function to set state, required
  goals1: PropTypes.number.isRequired, // Number of goals for team 1, required
  goals2: PropTypes.number.isRequired, // Number of goals for team 2, required
  goalRcords: PropTypes.array,         // Array of goal records, optional
  player1: PropTypes.arrayOf(          // Array of players for team 1
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name_eng: PropTypes.string.isRequired,
      last_name_eng: PropTypes.string.isRequired,
    })
  ),
  player2: PropTypes.arrayOf(          // Array of players for team 2
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name_eng: PropTypes.string.isRequired,
      last_name_eng: PropTypes.string.isRequired,
    })
  ),
  tScore1: PropTypes.array,
  tScore2: PropTypes.array         // Array of time scores for team 2
};
