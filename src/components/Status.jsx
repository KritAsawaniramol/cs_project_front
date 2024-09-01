import {
  Box,
  Button,
  
} from "@mui/material";
import React, { useState } from "react";

// const styled = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

export default function Status(props) {
  const { func,name, data, id, color, } = props;
  const status = ["Application opening", "Started", "Finished", "Cancelled"];
  const [selectedStatus, setSelectedStatus] = useState(status[0]);
  const [previousStatus, setPreviousStatus] = useState(data?.status);
  const role = localStorage.getItem("role");
  const roleId = localStorage.getItem("roleID");

  const handleStatus = (e) => {
    if (e !== previousStatus) {
      setSelectedStatus(e.target.value);
      setPreviousStatus(e);
    }
  };
  const updateStatusStart = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/organizer/competition/start/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (res.status === 200) {
        alert("Update success");
      }
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const updateStatusOpen = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/organizer/competition/open/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        alert("Update success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateStatusFinish = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/organizer/competition/finish/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        alert("Update success");
      }
    } catch (e) {
      console.log(e);
    }
  };
  // const updateStatusCancel = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:8080/organizer/competition/cancel/${id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //       }
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //     if (res.status === 200) {
  //       alert("Update success");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <>
      <Button
        variant="contained"
        onClick={func}
        style={{
          display: `${
            role === "organizer" && roleId == data?.organizer_info.id
              ? ""
              : "none"
          }`,
        }}
        color={color}
      >
        {name}
      </Button>
    </>
  );
}
