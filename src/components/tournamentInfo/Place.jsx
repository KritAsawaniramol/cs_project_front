import React from "react";
import style from "./Place.module.css";

export default function Place(props) {
  const { teams, type } = props;
  // const mockData = [
  //   { place: 1, team: "Team A" },
  //   { place: 2, team: "Team B" },
  //   { place: 3, team: "Team C" },
  //   { place: 4, team: "Team D" },
  //   { place: 5, team: "Team E" },
  //   { place: 6, team: "Team F" },
  //   { place: 7, team: "Team G" },
  //   { place: 8, team: "Team H" },
  //   { place: 9, team: "Team I" },
  //   { place: 10, team: "Team J" },
  // ];


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
