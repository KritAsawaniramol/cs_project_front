import React from "react";
import style from "./Compatition.module.css";
import { CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";


export default function Compatition(props) {
  const navigate = useNavigate();
  const { compatitions } = props;
  console.log("compatitions")
  console.log(compatitions)

  return (
    <>
      <CssBaseline />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{backgroundColor: '#f4f4f4'}} >
              <TableCell style={{maxWidth: 70, fontWeight: 'bold', fontSize: '20px'}} align="center">Tournament Name</TableCell>
              <TableCell style={{maxWidth: 70, fontWeight: 'bold', fontSize: '20px'}} align="center">Date</TableCell>
              <TableCell style={{maxWidth: 70, fontWeight: 'bold', fontSize: '20px'}} align="center">Place</TableCell>
              <TableCell style={{maxWidth: 70, fontWeight: 'bold', fontSize: '20px'}} align="center">Type</TableCell>
              <TableCell style={{maxWidth: 70, fontWeight: 'bold', fontSize: '20px'}} align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {compatitions?.map((item) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
              >
                <TableCell align="center" component="th" scope="row" >
                  {item.name}
                </TableCell>
                <TableCell align="center">
                  {dayjs(item?.start_date).format("DD/MM/YYYY")} - {dayjs(item?.end_date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="center"
                  style={{
                    textAlign: `center`,
                    backgroundColor: `${item?.rank === "1" ? "#F1C40F" : item?.rank === "2" ? "#5DADE2" : "#FDFEFE"}`
                  }}
                >
                  {item?.rank == "0" ? "-" : item?.rank}
                </TableCell>
                <TableCell align="center">{item.sport}</TableCell>
                <TableCell align="center"
                  style={{
                    backgroundColor: `${item?.status === "Applications opening"
                        ? "#82E0AA"
                        : item?.status === "Coming soon"
                          ? "#85C1E9"
                          : item?.status === "Started"
                            ? "#F9E79F"
                            : item?.status === "Finished"
                              ? "#FAD7A0"
                              : "#F1948A"
                      }`,
                    textAlign: `center`
                  }}
                >
                  {item.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

// PropTypes validation
Compatition.propTypes = {
  compatitions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      rank: PropTypes.string.isRequired,
      sport: PropTypes.string.isRequired,
    })
  ).isRequired,
};