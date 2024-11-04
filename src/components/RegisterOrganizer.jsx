import style from "./RegisterOrganizer.module.css";
import { useState } from "react";
import { Button, CssBaseline, TextField, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useNavigate } from "react-router-dom";

export default function RegisterOrganizer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/register/organizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          phone: phone,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        alert(data.message);
        navigate("/login");
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleRegisterNormal = () => {
    navigate("/registerNormal");
  };

  return (
    <>
        <CssBaseline />
      <div className={style.container}>
        <SportsSoccerIcon className={style.logo} sx={{ fontSize: 100 }} />
        <Typography variant="h3">Kick-off League</Typography>
        <Typography variant="h3">{`Sign up "Organizer"`}</Typography>
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
          label="Organizer name"
          type="text"
          placeholder="Kick-off League"
          onChange={handleNameChange}
          required
        ></TextField>
        <TextField
          sx={{ width: 400 }}
          label="Phone"
          type="text"
          placeholder="0123456789"
          onChange={handlePhoneChange}
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
            onClick={handleRegisterNormal}
          >
            Sign up for Normal
          </Button>
        </div>
      </div>
    </>
  );
}
