import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import style from "./Invite.module.css";
import { MenuItem, TextField } from "@mui/material";

export default function Invite(props2) {
  const { open, close, id } = props2;
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("player");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    console.log(role);
  };
  const handleInvite = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/user/sendAddMemberRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            receiver_username: username,
            team_id: id,
            role: role,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        alert(data.message);
        close();
        setUsername("");
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.container}>
          <Typography
            className={style.text}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Invite player to join your team
          </Typography>
          <TextField
            placeholder="Enter username"
            fullWidth
            onChange={handleUsernameChange}
          ></TextField>
          <TextField
            sx={{ mt: `1rem` }}
            placeholder="Role"
            fullWidth
            select
            onChange={handleRoleChange}
            value={role}
          >
            <MenuItem value="player">Player</MenuItem>
            <MenuItem value="coach">Coach</MenuItem>
          </TextField>
          <div className={style.button}>
            <Button
              sx={{ mt: `1rem` }}
              variant="contained"
              onClick={handleInvite}
            >
              Invite
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
