import { useEffect, useState } from "react";
import Reacket from "reacket";
import PropTypes from "prop-types";

export default function Bracket(props) {
  const { id } = props;
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
      const m = data?.compatition.match.map((item, i) => {
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
          {console.log(matches)}
          <Reacket matches={matches} />
        </>
      )}
    </>
  );
}

Bracket.propTypes = {
  id: PropTypes.string.isRequired
}