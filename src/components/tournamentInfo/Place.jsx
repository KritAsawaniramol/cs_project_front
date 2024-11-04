import style from "./Place.module.css";
import PropTypes from "prop-types";

export default function Place(props) {
  const { teams, type } = props;

  console.log(teams)
  teams?.sort(function(a,b) {
    return a.rank_number - b.rank_number;
  })

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th>Place</th>
          <th>Team</th>
          <th style={{display:`${type == "Tournament"?"none":""}`}}>Point</th>
          <th>Goals Scored</th>
          <th>Goals Conceded</th>
        </tr>
      </thead>
      <tbody>
  {teams?.map((data, i) => (
    <tr key={i}>
      <td>{data?.rank == "0"?"-":data?.rank}</td>
      <td>
        <div className={style.teamContainer}>
          <img 
            src={`http://localhost:8080/${data?.image_profile_path}`} 
            alt={data?.name} 
            className={style?.teamImage}
          />
          {data?.name}
        </div>
      </td>
      <td style={{display:`${type == "Tournament"?"none":""}`}}>
        {data?.point}
      </td>
      <td>
        {data?.goals_scored}
      </td>
      <td>
        {data?.goals_conceded}
      </td>
    </tr>
  ))}
</tbody>
    </table>
  );
}

Place.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      rank: PropTypes.string,
      rank_number: PropTypes.number.isRequired,
      image_profile_path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      point: PropTypes.number, 
      goals_scored: PropTypes.number, 
      goals_conceded: PropTypes.number, 
    })
  ).isRequired,
  type: PropTypes.string.isRequired, 
};