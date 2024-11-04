import style from "./CreateTeam.module.css";
import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useNavigate } from "react-router-dom";

export default function CreateTeam() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreateTeam = async () => {
    try {
      const res = await fetch("http://localhost:8080/user/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        alert(data.message);
        navigate("/myTeam");
        setName("");
        setDescription("");
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
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  return (
    <>
      <div className={style.container}>
        <SportsSoccerIcon className={style.logo} sx={{ fontSize: 100 }} />
        <Typography variant="h3">Create Team</Typography>
        <TextField
          sx={{ width: 400 }}
          label="Name"
          required
          type="text"
          placeholder="user's team"
          onChange={handleNameChange}
        ></TextField>
        <TextField
          sx={{ width: 400 }}
          label="Description"
          type="text"
          placeholder="welcome to my team"
          multiline
          rows={4}
          onChange={handleDescriptionChange}
        ></TextField>
        <div style={{ display: `flex`, gap: 30 }}>
          <Button
            variant="contained"
            sx={{ px: 5 }}
            onClick={() => {
              navigate("/myTeam");
            }}
          >
            Back
          </Button>
          <Button variant="contained" sx={{ px: 5 }} onClick={handleCreateTeam}>
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
