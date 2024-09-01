import React from "react";
import style from "./RegisterNormal.module.css";
import { useState } from "react";
import { Button, CssBaseline, TextField, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useNavigate } from "react-router-dom";

export default function RegisterNormal() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/register/normal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        alert(data.message);
        navigate("/login");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleRegisterOrganizer = () => {
    navigate("/registerOrganizer");
  };
  return (
    <>
    <CssBaseline />
      <div className={style.container}>
        <SportsSoccerIcon className={style.logo} sx={{ fontSize: 100 }} />
        <Typography variant="h3">Kick-off League</Typography>
        <Typography variant="h3">Sign up</Typography>
        <TextField
          sx={{ width: 400 }}
          label="Email"
          type="text"
          placeholder="user@example.com"
          onChange={handleEmailChange}
          required
        ></TextField>
        <TextField
          sx={{ width: 400 }}
          label="Username"
          type="text"
          placeholder="username"
          onChange={handleUsernameChange}
          required
        ></TextField>
        <TextField
          sx={{ width: 400 }}
          label="Password"
          type="password"
          placeholder="*********"
          onChange={handlePasswordChange}
          required
        ></TextField>
        <div>
          {" "}
          <Button variant="contained" sx={{ px: 5 }} onClick={handleRegister}>
            Create Account
          </Button>
          <Button
            variant="contained"
            sx={{ px: 5, ml: 1 }}
            onClick={handleRegisterOrganizer}
          >
            Sign up for Organizer
          </Button>
        </div>
      </div>
    </>
  );
}
