import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import style from "./Matches.module.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Matches(props) {
  const { data } = props;
  console.log(data);

  const nav = useNavigate()
  const rows2 = data?.recent_match;
  return (
    <>
      <div className={style.container}>
        <h1>Last 20 matches</h1>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{ backgroundColor: `black`, borderLeft: `10px solid black` }}
            >
              <TableCell sx={{ color: `white` }}>Date</TableCell>
              <TableCell sx={{ color: `white` }}>Result</TableCell>
              <TableCell sx={{ color: `white` }}>VS</TableCell>
              <TableCell sx={{ color: `white` }}>Tournament</TableCell>
              <TableCell sx={{ color: `white` }} align="right">
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows2?.map((row) => {
              let day = dayjs(row.date_time).format("DD MMM, YYYY");
              if(day ==="01 Jan, 0001"){
                day = "-"
              }
              return (
                <TableRow
                onClick={() => {
                  nav(`/tournamentInfo`, {
                    state: { id: row.compatition_id },
                  });
                }}
                  sx={{
                    cursor: "pointer",
                    borderLeft: `${
                      row.result === "Win"
                        ? `10px solid rgb(0, 128, 0,0.9)`
                        : row.result === "Loss"
                        ? `10px solid rgb(252, 66, 27)`
                        : "10px solid rgb(255, 165, 0)"
                    }`,
                    borderRight: `1px solid black`,
                  }}
                  key={row.id}
                >
                  <TableCell>{day}</TableCell>
                  <TableCell
                    sx={{
                      color: `${
                        row.result === "Win"
                          ? `rgb(0, 128, 0,0.9)`
                          : row.result === "Loss"
                          ? `rgb(252, 66, 27)`
                          : "rgb(255, 165, 0)"
                      }`,
                    }}
                  >
                    {row.result}
                  </TableCell>
                  <TableCell>{row.vs_team_name}</TableCell>
                  <TableCell>{row.tournament_name}</TableCell>
                  <TableCell align="right">{`${row.score}`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

Matches.propTypes = {
  data: PropTypes.shape({
    recent_match: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        date_time: PropTypes.string.isRequired,
        result: PropTypes.string.isRequired,
        vs_team_name: PropTypes.string.isRequired,
        tournament_name: PropTypes.string.isRequired,
        score: PropTypes.string.isRequired,
        compatition_id: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};