import style from "./Login.module.css";
import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200 && data.user.role === "normal") {
        alert(data.message);
        navigate("/");
        setEmail("");
        setPassword("");
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("roleID", data.user.normal_user_id);
      } else if (res.status === 200 && data.user.role === "organizer") {
        alert(data.message);
        navigate("/");
        setEmail("");
        setPassword("");
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("roleID", data.user.organizer_id);
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRegis = () => {
    navigate("/registerNormal");
  };
  return (
    <>
      <div className={style.container}>
        <SportsSoccerIcon className={style.logo} sx={{ fontSize: 100 }} />
        <Typography variant="h3">Login</Typography>
        <TextField
          sx={{ width: 400 }}
          label="Email"
          type="text"
          placeholder="user@example.com"
          onChange={handleUsernameChange}
        ></TextField>
        <TextField
          sx={{ width: 400 }}
          label="Password"
          type="password"
          placeholder="*********"
          onChange={handlePasswordChange}
        ></TextField>
        <div style={{ display: `flex`, gap: 20 }}>
          <Button variant="contained" sx={{ px: 5 }} onClick={handleRegis}>
            Sign up
          </Button>
          <Button variant="contained" sx={{ px: 5 }} onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
