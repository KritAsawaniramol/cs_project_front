import { useEffect } from "react";
import style from "./MatchesForm.module.css";
import { useState } from "react";
import {
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion2 from "./Accordion";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export default function MatchesForm() {
  const navigate = useNavigate();

  const [goals1, setGoals1] = useState(0);
  const [goals2, setGoals2] = useState(0);
  const [result, setResult] = useState("");
  const [timeScore1, setTimeScore1] = useState();
  const [timeScore2, setTimeScore2] = useState();
  const [url, setUrl] = useState("");
  const [time, setTime] = useState();
  const { state } = useLocation();
  const [match, setMatch] = useState([]);
  const [compatition, setCompatiton] = useState();
  const [team1Name, setTeam1Name] = useState();
  const [team2Name, setTeam2Name] = useState();
  const [goalRcords, setGoalRcords] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchData2 = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/view/match/${state.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();

      setMatch(data?.match);
    
      let tScore1 = []
      let tScore2 = []

    
      for (let i = 0; i < data?.match?.goal_records?.length; i++) {
        if (data?.match?.goal_records[i].team_id == data?.match?.team1_id ) {

          tScore1.push(data?.match?.goal_records[i]);
        } else {
          tScore2.push(data?.match?.goal_records[i]);
        }
      }

      setTimeScore1(tScore1)
      setTimeScore2(tScore2)
      setGoals1(data?.match.team1_goals)
      setGoals2(data?.match.team2_goals)
      setResult(data?.match.result)
      setUrl(data?.match.video_url)
      setTeam1Name(data?.match.team1_name)
      setTeam2Name(data?.match.team2_name)
      setGoalRcords(data?.goal_records)
      setTime(dayjs(data?.match.date_time))

    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/view/competition/${state.comID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();

      setCompatiton(data);
    } catch (e) {
      console.log(e);
    }
  };

  const data_from_child1 = (data) => {
    console.log("data_from_child1: ", data);
    setTimeScore1(data)
  }
  const data_from_child2 = (data) => {
    console.log("data_from_child2: ", data);

    setTimeScore2(data)
  }


  const handleGoals1 = (e) => {
    setGoals1(e.target.value);
  };
  const handleGoals2 = (e) => {
    setGoals2(e.target.value);
  };
  const handleResult = (e) => {
    setResult(e.target.value);
  };
  const handleURL = (e) => {
    setUrl(e.target.value);
  };

  const onChange = (value) => {
    setTime(value);

  };
 

  const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}

  const onSave = async () => {
    if (url != "" && !isValidUrl(url)) {
      alert("video URL is not valid url.")
      return
    }


    let requestBody = {
      date_time: time,
      team1_goals: parseInt(goals1),
      team2_goals: parseInt(goals2),
      // result: result === "Draw" ? "" : result,
      result: result,
      video_url: url,
    };

    if (timeScore1 && timeScore1.length > 0) {
      const goalRecords1 = timeScore1
      .filter((score) => parseInt(score.player_id) != 0)
      .map((score) => ({
        ...score,
        matches_id: state.id, 
        team_id: match.team1_id, 
        player_id: parseInt(score.player_id),
        time_scored: parseInt(score.time_scored)
      }));

      requestBody.goal_records = [
        ...(requestBody.goal_records || []),
        ...goalRecords1,
      ];
    }

    if (timeScore2 && timeScore2.length > 0) {
      const goalRecords2 = timeScore2
      .filter((score) => parseInt(score.player_id) != 0)
      .map((score) => (
        {
        ...score,
        matches_id: state.id, 
        team_id: match.team2_id, 
        player_id: parseInt(score.player_id),
        time_scored: parseInt(score.time_scored)
      }));
      console.log(goalRecords2);
      requestBody.goal_records = [
        ...(requestBody.goal_records || []),
        ...goalRecords2,
      ];
    }
    try {
      const res = await fetch(
        `http://localhost:8080/organizer/match/${state.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        // alert("Update success");
        alert(data.message)
        navigate(-1);
        setGoals1(0);
        setGoals2(0);
        setResult("");
        setUrl();
        setTime();
      } else {
        alert(data.message)
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }
  return (
    <>
      <div className={style.container}>
        <SportsSoccerIcon className={style.logo} sx={{ fontSize: 100 }} />
        <Typography variant="h3">Matches Record</Typography>
        <Typography variant="h4">Team 1: {team1Name}</Typography>
        <Typography variant="h5">VS</Typography>
        <Typography variant="h4">Team 2: {team2Name}</Typography>
        <DatePicker
          style={{ width: `600px`, height: `60px` }}
          showTime
          onChange={onChange}
          value={time}
          minDate={dayjs("2024-01-01 00:00:00",  "YYYY-MM-DD HH:MM:SS")}
        />
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Team 1 Goals"
          type="text"
          placeholder="Team 1 Goals"
          value={goals1}
          onChange={handleGoals1}
        ></TextField>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Team 2 Goals"
          type="text"
          placeholder="2"
          value={goals2}
          onChange={handleGoals2}
        ></TextField>

        <Accordion2
          goals1={goals1}
          goals2={goals2}
          goalRcords={goalRcords}
          tScore1={timeScore1}
          tScore2={timeScore2}
          player1={match?.team1_player}
          player2={match?.team2_player}
          setter1={data_from_child1}
          setter2={data_from_child2}
          match={match}
        />
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          type="text"
          label="Video URL"
          placeholder="Video URL"
          value={url}
          onChange={handleURL}
        ></TextField>
        <TextField
          required
          sx={{ width: 600, backgroundColor: `white` }}
          label="Result"
          select
          value={result}
          onChange={handleResult}
        >
          <MenuItem value="Team1Win">Team 1 Win</MenuItem>
          <MenuItem value="Team2Win">Team 2 Win</MenuItem>
          <MenuItem sx={{display: `${compatition?.type != "Tournament"?"none":""}`}} value="Draw">{compatition?.type} </MenuItem>
        </TextField>
        <div style={{ display: `flex`, gap: 20 }}>
          <Button
            variant="contained"
            sx={{ px: 5 }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
          <Button variant="contained" sx={{ px: 5 }} onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
