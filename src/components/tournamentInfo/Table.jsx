import { useEffect, useState } from "react";
import style from "./Table.module.css";
import PropTypes from "prop-types";

export default function Table(props) {
  const { id } = props;
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/competition/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };



  const roundRobin = (compatition, team) => {
    const match = [];
    for (let i = 0; i < team.length; i++) {
      match[i] = [];
    }

    console.log(compatition.match.length)

    if (compatition.status == "Applications opening" || compatition.status == "Coming soon" ) {
      for (let i = 0; i < compatition.number_of_team; i++) {
        for (let j = 0; j < compatition.number_of_team; j++) {
          match[i][j] = {
            score: "none",
            result: "none",
          };
        }
      }
    } else {
      for (let i = 0; i < team.length; i++) {
        if (team[i].name == "none") {
          for (let j = 0; j < team.length; j++) {
            match[i][j] = {
              score: "none",
              result: "none",
            };
            match[j][i] = {
              score: "none",
              result: "none",
            };
          }
        } else {
          console.log(compatition.match);
          for (let j = 0; j < compatition.match.length; j++) {
            if (compatition.match[j].team1_id == team[i].id) {
              const index = parseInt(
                team.map((x) => x.id).indexOf(compatition.match[j].team2_id)
              );
              if (i != index) {
                // console.log(compatition.match[j].result)

                // console.log(`x: ${i}, y: ${index} ${compatition.match[j].team1_goals +
                //   " - " +
                //   compatition.match[j].team2_goals}`);
                // console.log(`x: ${index}, y: ${i} ${compatition.match[j].team2_goals +
                //   " - " +
                //   compatition.match[j].team1_goals}`);
                match[i][index] = {
                  score:
                    compatition.match[j].team1_goals +
                    " - " +
                    compatition.match[j].team2_goals,
                  result: compatition.match[j].result ,
                };
                match[index][i] = {
                  score:
                    compatition.match[j].team2_goals +
                    " - " +
                    compatition.match[j].team1_goals,
                  result: compatition.match[j].result === "Team1Win" ? "Team2Win" : "Team1Win",
                };
              }
            }
          }
          console.log(match);
        }
  
        match[i][i] = {
          score: "none",
          result: "none",
        };
      }
    }

   
    // console.log("match");
    // console.log(match);
    return match;
  };

  const getTeam = (compatition) => {
    const t = [];
    for (let i = 0; i < compatition.teams?.length; i++) {
      t.push({
        id: compatition.teams[i].id,
        name: compatition.teams[i].name,
        image: compatition.teams[i].image_profile_path,
      });
    }

    if (compatition.teams?.length < compatition.number_of_team) {
      const n = compatition.number_of_team - compatition.teams?.length;
      for (let i = 0; i < n; i++) {
        t.push({
          id: 0,
          name: "none",
        });
      }
    }
    return t;
  };

  // console.log(data);
  let teams = data ? getTeam(data.compatition) : [];
  const match = data ? roundRobin(data.compatition, teams) : [];
  console.log(match);
  // console.log(teams);
  // const schedule2 = data ? roundRobin2(data.compatition) : [];

  return (
    <table className={style.mytable} style={{ flex: `1 1 auto` }}>
      <tbody style={{}}>
        {teams.map((team, i) => (
          <tr style={{ flex: `1 1 auto` }} key={i}>
            <th
              style={{
                width: `50px`,
                height: `50px`,
                alignItems: `center`,
              }}
            >
              <img
                src={`${
                  `http://localhost:8080/${team.image}` !==
                  "http://localhost:8080/undefined"
                    ? `http://localhost:8080/${team.image}`
                    : "src/assets/image/defaultProfile.jpg"
                }`}
                style={{
                  width: `100%`,
                  height: `100%`,
                  objectFit: `contain`,
                }}
              ></img>
              {team.name}
            </th>
            {match[i].map((m, j) => {
              if (i == 2 && j == 1) {
                console.log(m.result);
              }
              const isWin = m.result === "Team1Win" 
                // (m.result === "Team1Win" && i < j) 
                // || (m.result === "Team2Win" && i > j);
              const isLoss = m.result !== "" && !isWin && m.result !== "none" && m.result !== "Draw";
              const isNone = m.result === "none";
              const isDraw = m.result === "Draw"
              return (
                <td
                  key={j}
                  className={`${style.cell} ${
                    isWin 
                    ? style.winTeam1
                      : isLoss
                      ? style.winTeam2
                      : isDraw
                      ? style.draw
                      : isNone
                      ? style.none
                      : style.unassigned
                  }`}
                >
                  {m.score}
                </td>
              );
            })}
          </tr>
        ))}
        <tr>
          <th></th>
          {teams.map((team, i) => (
            <th style={{ width: `50px`, height: `50px` }} key={i}>
              <img
                src={`${
                  `http://localhost:8080/${team.image}` !==
                  "http://localhost:8080/undefined"
                    ? `http://localhost:8080/${team.image}`
                    : "src/assets/image/defaultProfile.jpg"
                }`}
                style={{ width: `100%`, height: `100%`, objectFit: `contain` }}
              ></img>
              {team.name}
            </th>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

Table.propTypes = {
  id: PropTypes.string.isRequired, 
}