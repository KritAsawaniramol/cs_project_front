import React, { useState } from "react";
import style from "./CreateTournament.module.css";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useNavigate } from "react-router-dom";
import Accordion2 from "./myTournament/Accordion";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CreateTournament() {
  const [name, setName] = useState("");
  const [sport, setSport] = useState("football");
  const [type, setType] = useState("Tournament");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [gender, setGender] = useState("Unisex");
  const [numberOfTeams, setNumberOfTeams] = useState("");
  const [minPlayers, setMinPlayers] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [applicationType, setApplicationType] = useState("free");
  const [contact, setContact] = useState("facebook");
  const [rule, setRule] = useState("");
  const [prize, setPrize] = useState("");
  const [description, setDescription] = useState("");
  const [fieldType, setFieldType] = useState("NaturalGrass");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [format, setFormat] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [house, setHouse] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const [tournament, setTournament] = useState([]);

  const startDateString = dayjs(startDate);
  dayjs.extend(utc);
  const startDateAPI = startDateString.utc().format();

  const endDateString = dayjs(endDate);
  dayjs.extend(utc);
  const endDateAPI = endDateString.utc().format();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleSport = (e) => {
    setSport(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };
  const handleMinAge = (e) => {
    setMinAge(e.target.value);
  };
  const handleMaxAge = (e) => {
    setMaxAge(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleNumberOfTeams = (e) => {
    setNumberOfTeams(e.target.value);
  };
  const handleMinPlayers = (e) => {
    setMinPlayers(e.target.value);
  };
  const handleMaxPlayers = (e) => {
    setMaxPlayers(e.target.value);
  };
  const handleApplicationType = (e) => {
    setApplicationType(e.target.value);
  };
  const handleRule = (e) => {
    setRule(e.target.value);
  };
  const handlePrize = (e) => {
    setPrize(e.target.value);
  };
  const handleImage = (e) => {
    setImage(e.target.value);
  };

  const handleHouse = (e) => {
    setHouse(e.target.value);
  };
  const handleVillage = (e) => {
    setVillage(e.target.value);
  };
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };
  const handleSubDistrict = (e) => {
    setSubDistrict(e.target.value);
  };
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleFieldType = (e) => {
    setFieldType(e.target.value);
  };
  const handleStartDate = (date, dateString) => {
    setStartDate(dateString);
  };
  const handleEndDate = (date, dateString) => {
    setEndDate(dateString);
  };
  const handleContact = (e) => {
    setContact(e.target.value);
  };
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleFormat = (e) => {
    setFormat(e.target.value);
  };

  const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}


  const handleCreateTournament = async () => {
    if (name == "" || sport == "" 
    || type == "" || startDateAPI == "" 
    || endDateAPI == "" || applicationType == ""
    || gender == "" ||( parseInt(numberOfTeams) == 0 || numberOfTeams == "")
    || house == "" || village == "" || district == "" 
    || subDistrict == "" || postalCode == "" 
    || country == "" || contact == "" || url == "") {
      alert("please complete all required fields.")
      return
    } else if (!isValidUrl(url)) {
      alert("contact URL is not valid url.")
      return
    }


    const res = await fetch("http://localhost:8080/organizer/competition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        sport: sport,
        type: type,
        format: format,
        description: description,
        rule: rule,
        prize: prize,
        start_date: startDateAPI,
        end_date: endDateAPI,
        application_type: applicationType,
        image_banner: image,
        age_over: parseInt(minAge),
        age_under: parseInt(maxAge),
        sex: gender,
        number_of_team: parseInt(numberOfTeams),
        num_of_player_min: parseInt(minPlayers),
        num_of_player_max: parseInt(maxPlayers),
        field_surface: fieldType,
        address: {
          house_number: house,
          village: village,
          district: district,
          subdistrict: subDistrict,
          postal_code: postalCode,
          country: country,
        },
        Contact_type: contact,
        Contact: url,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      alert("Create tournament success");
      navigate("/myTournament");
      //set all field " "
      setName("");
      setSport("football");
      setType("Tournament");
      setMinAge("");
      setMaxAge("");
      setGender("Unisex");
      setNumberOfTeams("");
      setMinPlayers("");
      setMaxPlayers("");
      setApplicationType("free");
      setContact("facebook");
      setRule("");
      setPrize("");
      setDescription("");
      setFieldType("naturalGrass");
      setStartDate("");
      setEndDate("");
      setFormat("");
      setUrl("");
      setImage("");
      setHouse("");
      setVillage("");
      setDistrict("");
      setSubDistrict("");
      setPostalCode("");
      setCountry("");
    }
  };
  const item2 = [];

  for (let i = 1; i < 12; i++) {
    const item = { name: i };
    item2.push(item);
  }
  return (
    <>
      <div className={style.container}>
        <SportsSoccerIcon className={style.logo} sx={{ fontSize: 100 }} />
        <Typography variant="h3">Create Tournament</Typography>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Tournament name"
          error={
            name == ""
          }
          required
          type="text"
          placeholder="Kick-off League 2024"
          onChange={handleName}
          value={name}
        ></TextField>
        <div className={style.datePicker}>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Sport"
            error={
              sport == ""
            }
            required
            value={sport}
            onChange={handleSport}
            select
          >
            <MenuItem value={"Football"}>Football</MenuItem>
            <MenuItem value={"Futsal"}>Futsal</MenuItem>
          </TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Type"
            select
            required
            error={
              type == ""
            }
            value={type}
            onChange={handleType}
          >
            <MenuItem value={"Tournament"}>Tournament</MenuItem>
            <MenuItem value={"Round Robin"}>Round robin</MenuItem>
          </TextField>
        </div>
        <div className={style.datePicker}>
          <div style={{ width: `295px` }}>Start Date</div>
          <div style={{ width: `295px` }}>End Date</div>
        </div>
        <div className={style.datePicker}>
          <DatePicker
            style={{ width: `295px`, height: `60px` }}
            placeholder="Start date"
            required
            value={startDateString}
            onChange={handleStartDate}
          />
          <DatePicker
            style={{ width: `295px`, height: `60px` }}
            placeholder="End date"
            required
            value={endDateString}
            onChange={handleEndDate}
          />
        </div>
        <div className={style.datePicker}>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Min age"
            value={minAge}
            onChange={handleMinAge}
          ></TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Max age"
            value={maxAge}
            onChange={handleMaxAge}
          ></TextField>
        </div>
        <TextField
          sx={{ width: `600px`, backgroundColor: `white` }}
          label="Gender"
          select
          required
          value={gender}
          error = {
            gender == ""
          }
          onChange={handleGender}
        >
          <MenuItem value="Unisex">Unisex</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
        <TextField
          sx={{
            width: 600,
            backgroundColor: `white`,
          }}
          label="Number of teams"
          value={numberOfTeams}
          required
          error = {
            numberOfTeams == ""
          }
          onChange={handleNumberOfTeams}
          select={type === "Round Robin" ? false : true}
        >
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="8">8</MenuItem>
          <MenuItem value="16">16</MenuItem>
          <MenuItem value="32">32</MenuItem>
          <MenuItem value="64">64</MenuItem>
        </TextField>
        <div className={style.datePicker}>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Min players"
            value={minPlayers}
            onChange={handleMinPlayers}
          ></TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Max players"
            value={maxPlayers}
            onChange={handleMaxPlayers}
          ></TextField>
        </div>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Field type"
          select
          required
          error = {
            fieldType == ""
          }
          value={fieldType}
          onChange={handleFieldType}
        >
          <MenuItem value={"NaturalGrass"}>Natural Grass</MenuItem>
          <MenuItem value={"ArtificialTurf"}>Artificial Turf</MenuItem>
          <MenuItem value={"FlatSurface"}> Flat Surface </MenuItem>
        </TextField>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Application type"
          select
          required
          error = {
            applicationType == ""
          }
          value={applicationType}
          onChange={handleApplicationType}
        >
          <MenuItem value={"free"}>Free</MenuItem>
          <MenuItem value={"with code"}>With code</MenuItem>
        </TextField>
        <div className={style.datePicker}>
          <TextField
            style={{ width: `295px`, backgroundColor: `white` }}
            select
            required
            label="Contact"
            value={contact}
            error = {
              contact == ""
            }
            onChange={handleContact}
          >
            <MenuItem value="facebook">Facebook</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
            <MenuItem value="instargram">Instargram</MenuItem>
          </TextField>
          <TextField
            style={{ width: `295px`, backgroundColor: `white` }}
            label="Contact URL"
            required
            value={url}
            error = {
              url == ""
            }
            onChange={handleUrl}
          ></TextField>
        </div>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Tournament format"
          select
          required
          value={format}
          error = {
            format == ""
          }
          onChange={handleFormat}
        >
          {item2.map((item, index) => {
            return (
              <MenuItem key={index} value={item.name + "v" + item.name}>
                {item.name + "vs" + item.name}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Description"
          type="text"
          placeholder="welcome to my tournament"
          multiline
          rows={5}
          onChange={handleDescription}
          value={description}
        ></TextField>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Rule"
          type="text"
          placeholder="Official football rules apply."
          multiline
          rows={5}
          value={rule}
          onChange={handleRule}
        ></TextField>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Prize"
          type="text"
          placeholder="Medals and bragging rights for the top three teams."
          multiline
          rows={5}
          value={prize}
          onChange={handlePrize}
        ></TextField>
        <Typography >
        Competition Venue
        </Typography>
        <div className={style.datePicker}>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="House number"
            required
            value={house}
            error = {
              house == ""
            }
            onChange={handleHouse}
          ></TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Village"
            value={village}
            onChange={handleVillage}
            required
            error = {
              village == ""
            }
          ></TextField>
        </div>
        <div className={style.datePicker}>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="District"
            value={district}
            error = {
              district == ""
            }
            required
            onChange={handleDistrict}
          ></TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Sub-district"
            value={subDistrict}
            required
            error = {
              subDistrict == ""
            }
            onChange={handleSubDistrict}
          ></TextField>
        </div>
        <div className={style.datePicker}>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Postal code"
            value={postalCode}
            required
            error = {
              postalCode == ""
            }
            onChange={handlePostalCode}
          ></TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Country"
            value={country}
            onChange={handleCountry}
            required
            error = {
              country == ""
            }
          ></TextField>
        </div>

        <div style={{ display: `flex`, gap: 30, marginTop: `1rem` }}>
          <Button
            variant="contained"
            sx={{ px: 5 }}
            onClick={() => {
              navigate("/myTournament");
            }}
          >
            Back
          </Button>
          {/* <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button> */}
          <Button
            variant="contained"
            sx={{ px: 5 }}
            onClick={handleCreateTournament}
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
