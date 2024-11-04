import { useEffect, useRef, useState } from "react";
import style from "./Edit.module.css";
import { Button, CssBaseline, MenuItem, TextField, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useLocation, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function EditTournament() {
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
  const [edit, setEdit] = useState(true);
  const { state } = useLocation();
  const [status, setStatus] = useState("");
  const bannerRef = useRef();

  const handleBannerClick = () => {
    bannerRef.current.click();
  };
  const handleBannerFileChange = (e) => {
    const file = e.target.files[0];
    try {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result;

          // Convert base64String to a Blob
          const blob = dataURItoBlob(base64String);

          const formData = new FormData();
          formData.append("image", blob);

          const res = await fetch(
            `http://localhost:8080/image/banner/${state.id}`,
            {
              method: "PATCH",
              body: formData,
              credentials: "include",
            }
          );

          if (res.ok) {
            alert("Upload image success");
            const data = await res.json();
            console.log("data" + data);
            navigate(-1);
          } else {
            alert("Upload image fail");
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error(err);
    }
  };
  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }
  const handleDeleteBanner = async () => {
    const res = await fetch(`http://localhost:8080/image/banner/${state.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      alert("Delete banner success");
      navigate(-1);
    } else {
      alert("Delete banner fail");
    }
  };

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
  const handleEdit = () => {
    setEdit(false);
  };
  const handleEditTournament = async () => {
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
    const res = await fetch(
      `http://localhost:8080/organizer/competition/${state.id}`,
      {
        method: "PATCH",
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
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      alert("Edit tournament success");
      navigate(-1);
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
      setFieldType("NaturalGrass");
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
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
   

    try {
      const res = await fetch(
        `http://localhost:8080/view/competition/${state.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      setName(data?.compatition.name);
      setSport(data?.compatition.sport);
      setType(data?.compatition.type);
      setMinAge(data?.compatition.age_over);
      setMaxAge(data?.compatition.age_under);
      setStartDate(data?.compatition.start_date);
      setEndDate(data?.compatition.end_date);
      setGender(data?.compatition.sex);
      setNumberOfTeams(data?.compatition.number_of_team);
      setMinPlayers(data?.compatition.num_of_player_min);
      setMaxPlayers(data?.compatition.num_of_player_max);
      setFieldType(data?.compatition.field_surface);
      setApplicationType(data?.compatition.application_type);
      setContact(data?.compatition.Contact_type);
      setUrl(data?.compatition.Contact);
      setFormat(data?.compatition.format);
      setDescription(data?.compatition.description);
      setRule(data?.compatition.rule);
      setPrize(data?.compatition.prize);
      setHouse(data?.compatition.address.house_number);
      setVillage(data?.compatition.address.village);
      setDistrict(data?.compatition.address.district);
      setSubDistrict(data?.compatition.address.subdistrict);
      setPostalCode(data?.compatition.address.postal_code);
      setCountry(data?.compatition.address.country);
      setStatus(data?.compatition.status);
    } catch (e) {
      console.log(e);
    }
  };
  const item2 = [];

  for (let i = 1; i < 12; i++) {
    const item = { name: i };
    item2.push(item);
  }

  const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}


  return (
    <>
    <CssBaseline />
      <div className={style.container}>
        <SportsSoccerIcon className={style.logo} sx={{ fontSize: 100 }} />
        <Typography variant="h3">Edit Tournament</Typography>
        <div style={{ display: `flex`, gap: 30, marginBottom: 20 }}>
          <Button
            variant="contained"
            sx={{ px: 5 }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            onClick={handleDeleteBanner}
          >
            Set default image banner
          </Button>
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onClick={handleBannerClick}
          >
            Upload banner ( .png or .jpeg only )
          </Button>
          <input
            type="file"
            ref={bannerRef}
            style={{ display: `none` }}
            onChange={handleBannerFileChange}
          ></input>
          <Button variant="contained" sx={{ px: 5 }} onClick={handleEdit}>
            Edit
          </Button>
          <Button
            variant="contained"
            sx={{ px: 5 }}
            onClick={handleEditTournament}
          >
            Save
          </Button>
        </div>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Tournament name"
          required
          error={
            name == ""
          }
          type="text"
          placeholder="Kick-off League 2024"
          onChange={handleName}
          value={name}
          disabled={edit}
        ></TextField>
        <div className={style.datePicker}>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Sport"
            value={sport}
            error={
              sport == ""
            }
            onChange={handleSport}
            select
            disabled={edit}
          >
            <MenuItem value={"Football"}>Football</MenuItem>
            <MenuItem value={"Futsal"}>Futsal</MenuItem>
          </TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Type"
            select
            value={type}
            error={
              type == ""
            }
            onChange={handleType}
            disabled={edit || (status != "Coming soon") }
          >
            <MenuItem value={"Tournament"}>Tournament</MenuItem>
            <MenuItem value={"Round Robin"}>Round Robin</MenuItem>
          </TextField>
        </div>
        <div className={style.datePicker}>
          <DatePicker
            style={{ width: `295px`, height: `60px` }}
            placeholder="Start date"
            value={startDateString}
            onChange={handleStartDate}
            disabled={edit}
          />
          <DatePicker
            style={{ width: `295px`, height: `60px` }}
            placeholder="End date"
            value={endDateString}
            onChange={handleEndDate}
            disabled={edit}
          />
        </div>
        <div className={style.datePicker}>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Min age"
            value={minAge}
            onChange={handleMinAge}
            disabled={edit || (status != "Coming soon") }
          ></TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Max age"
            value={maxAge}
            onChange={handleMaxAge}
            disabled={edit || (status != "Coming soon") }
          ></TextField>
        </div>
        <TextField
          sx={{ width: `600px`, backgroundColor: `white` }}
          label="Gender"
          select
          value={gender}
          error = {
            gender == ""
          }
          onChange={handleGender}
          disabled={edit || (status != "Coming soon") }
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
          error = {
            numberOfTeams == ""
          }
          onChange={handleNumberOfTeams}
          select={type === "Round Robin" ? false : true}
          disabled={edit || (status != "Coming soon") }
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
            disabled={edit || (status != "Coming soon") }
          ></TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Max players"
            value={maxPlayers}
            onChange={handleMaxPlayers}
            disabled={edit || (status != "Coming soon") }
          ></TextField>
        </div>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Field type"
          select
          error = {
            fieldType == ""
          }
          value={fieldType}
          onChange={handleFieldType}
          disabled={edit}
        >
          <MenuItem value={"NaturalGrass"}>Natural Grass</MenuItem>
          <MenuItem value={"ArtificialTurf"}>Artificial Turf</MenuItem>
          <MenuItem value={"FlatSurface"}> Flat Surface </MenuItem>
        </TextField>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Application type"
          select
          value={applicationType}
          error = {
            applicationType == ""
          }
          onChange={handleApplicationType}
          disabled={edit || (status != "Coming soon") }
        >
          <MenuItem value={"free"}>Free</MenuItem>
          <MenuItem value={"with code"}>With code</MenuItem>
        </TextField>
        <div className={style.datePicker}>
          <TextField
            style={{ width: `295px`, backgroundColor: `white` }}
            select
            label="Contact"
            value={contact}
            error = {
              contact == ""
            }
            onChange={handleContact}
            disabled={edit}
          >
            <MenuItem value="facebook">Facebook</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
            <MenuItem value="instargram">Instargram</MenuItem>
          </TextField>
          <TextField
            style={{ width: `295px`, backgroundColor: `white` }}
            label="URL"
            value={url}
            error = {
              url == ""
            }
            onChange={handleUrl}
            disabled={edit}
          ></TextField>
        </div>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Tournament format"
          select
          value={format}
          error = {
            format == ""
          }
          onChange={handleFormat}
          disabled={edit}
        >
          {item2.map((item, index) => {
            return (
              <MenuItem key={index} value={item.name + "vs" + item.name}>
                {item.name + "vs" + item.name}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          sx={{ width: 600, backgroundColor: `white` }}
          label="Description"
          type="text"
          placeholder="welcome to my team"
          multiline
          rows={5}
          onChange={handleDescription}
          value={description}
          disabled={edit}
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
          disabled={edit}
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
          disabled={edit}
        ></TextField>
        <div className={style.datePicker}>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="House number"
            value={house}
            onChange={handleHouse}
            disabled={edit}
          ></TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Village"
            value={village}
            onChange={handleVillage}
            disabled={edit}
          ></TextField>
        </div>
        <div className={style.datePicker}>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="District"
            value={district}
            onChange={handleDistrict}
            disabled={edit}
          ></TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Sub-district"
            value={subDistrict}
            onChange={handleSubDistrict}
            disabled={edit}
          ></TextField>
        </div>
        <div className={style.datePicker}>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Postal code"
            value={postalCode}
            onChange={handlePostalCode}
            disabled={edit}
          ></TextField>
          <TextField
            sx={{ width: `295px`, backgroundColor: `white` }}
            label="Country"
            value={country}
            onChange={handleCountry}
            disabled={edit}
          ></TextField>
        </div>

    
      </div>
    </>
  );
}
