import { useEffect, useState } from "react";
import style from "./Incoming.module.css";
import { Box, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from 'prop-types';

export default function Incoming(props) {
  const { search } = props;
  const [request, setRequest] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/user/requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setRequest(data);
      console.log("request");
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {request?.add_member_requests
        .filter((item) => {
          return search.toLowerCase() === ""
            ? item
            : item.team_name.toLowerCase().startsWith(search.toLowerCase());
        })
        .map((item, index) => {
          const handleAccept = async () => {
            try {
              const res = await fetch(
                `http://localhost:8080/user/acceptAddMemberRequest`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify({
                    requestID: item.id,
                  }),
                }
              );
              window.location.reload();
              const data = await res.json();
              console.log(data);
            } catch (e) {
              console.log(e);
            }
          };
          const handleIgnore = async () => {
            try {
              const res = await fetch(
                `http://localhost:8080/user/ignoreAddMemberRequest`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify({
                    requestID: item.id,
                  }),
                }
              );
              window.location.reload();
              const data = await res.json();
              console.log(data);
            } catch (e) {
              console.log(e);
            }
          };
          return (
            <Box padding={"20px"} key={index} className={style.container}>
              <div className={style.info}>
                <img
                  className={style.img}
                  src={`http://localhost:8080/${item?.team_iamge_profile}`}
                ></img>
                <div>
                  <div className={style.text}>{item?.team_name}</div>
                  <div className={style?.description}>
                    {"role:" + " " + item?.role}
                  </div>
                </div>
              </div>
              <div className={style.button}>
                <IconButton onClick={handleAccept}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={handleIgnore}>
                  <ClearIcon />
                </IconButton>
              </div>
            </Box>
          );
        })}
    </>
  );
}

Incoming.propTypes = {
  search: PropTypes.string
};
