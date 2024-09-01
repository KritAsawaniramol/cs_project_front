import React, { useEffect, useState } from "react";
import Reacket from "reacket";

const match = [
  {
    id: 1,
    round: 1,
    match: 1,
    players: [
      {
        id: 1,
        name: "Team A",
      },
      {
        id: 2,
        name: "Team B",
      },
    ],
    score: [0, 1],
  },
  {
    id: 2,
    round: 1,
    match: 2,
    players: [
      {
        id: 3,
        name: "Team C",
        seed: 5,
      },
      {
        id: 4,
        name: "Team D",
        seed: 4,
      },
    ],
    score: [2, 3],
  },
  {
    id: 3,
    round: 1,
    match: 3,
    players: [
      {
        id: 5,
        name: "Team E",
      },
      {
        id: 6,
        name: "Team F",
      },
    ],
    score: [3, 5],
  },
  {
    id: 4,
    round: 1,
    match: 4,
    players: [
      {
        id: 7,
        name: "Team G",
      },
      {
        id: 8,
        name: "Team H",
      },
    ],
    score: [4, 2],
  },
  {
    id: 5,
    round: 2,
    match: 1,
    players: [
      {
        id: 2,
        name: "Team B",
      },
      {
        id: 4,
        name: "Team D",
      },
    ],
    score: [4, 6],
  },
  {
    id: 6,
    round: 2,
    match: 2,
    players: [
      {
        id: 6,
        name: "Team F",
      },
      {
        id: 7,
        name: "Team G",
      },
    ],
    score: [0, 1],
  },
  {
    id: 7,
    round: 3,
    match: 1,
    players: [
      {
        id: 4,
        name: "Team D",
      },
      {
        id: 7,
        name: "Team G",
      },
    ],
    score: [0, 1],
  },
];

export default function Bracket(props) {
  const { id } = props;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);


  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/view/competition/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data); // Log the response data
      setData(data.compatition.match);
      const m = data?.compatition.match.map((item, i) => {
        const name1 = data?.compatition.teams.map((team) => {
          if (team?.id === item?.team1_id) {
            return team.name;
          } else {
            return "";
          }
        });
        const name2 = data?.compatition.teams.map((team) => {
          if (team?.id === item?.team2_id) {
            return team.name;
          } else {
            return "";
          }
        });
        return {
          key: i,
          id: i,
          round: parseInt(item.round.split(" ")[1]),
          match: item.index,
          players: [
            {
              id: item.team1_id,
              name: item.team1_name,
            },
            {
              id: item.team2_id,
              name: item.team2_name,
            },
          ],
          score: [item.team1_goals, item.team2_goals],
        };
      });
      setMatches(m);
    } catch (e) {
      console.log(e); // Log any errors
    } finally {
     
      console.log(matches);
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* <button onClick={handleData}>sad</button> */}
          {console.log(matches)}
          <Reacket matches={matches} />
        </>
      )}
    </>
  );
}
