import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import style from "./EditProfile.module.css";
import { Button, CssBaseline, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default function EditProfile() {
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nameThai, setNameThai] = useState("");
  const [lastNameThai, setLastNameThai] = useState("");
  const [nationality, setNationality] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const day = dayjs(age);
  dayjs.extend(utc);
  const date = day.utc().format();
  const dateFormat = "YYYY-MM-DD";

  const [heightString, setHeight] = useState("");
  const [weightString, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");

  const height = parseInt(heightString);
  const weight = parseInt(weightString);
  const countries = [
    { name: "Afghanistan", value: "AF" },
    { name: "Albania", value: "AL" },
    { name: "Algeria", value: "DZ" },
    { name: "Andorra", value: "AD" },
    { name: "Angola", value: "AO" },
    { name: "Antigua and Barbuda", value: "AG" },
    { name: "Argentina", value: "AR" },
    { name: "Armenia", value: "AM" },
    { name: "Australia", value: "AU" },
    { name: "Austria", value: "AT" },
    { name: "Azerbaijan", value: "AZ" },
    { name: "Bahamas", value: "BS" },
    { name: "Bahrain", value: "BH" },
    { name: "Bangladesh", value: "BD" },
    { name: "Barbados", value: "BB" },
    { name: "Belarus", value: "BY" },
    { name: "Belgium", value: "BE" },
    { name: "Belize", value: "BZ" },
    { name: "Benin", value: "BJ" },
    { name: "Bhutan", value: "BT" },
    { name: "Bolivia", value: "BO" },
    { name: "Bosnia and Herzegovina", value: "BA" },
    { name: "Botswana", value: "BW" },
    { name: "Brazil", value: "BR" },
    { name: "Brunei", value: "BN" },
    { name: "Bulgaria", value: "BG" },
    { name: "Burkina Faso", value: "BF" },
    { name: "Burundi", value: "BI" },
    { name: "Cabo Verde", value: "CV" },
    { name: "Cambodia", value: "KH" },
    { name: "Cameroon", value: "CM" },
    { name: "Canada", value: "CA" },
    { name: "Central African Republic", value: "CF" },
    { name: "Chad", value: "TD" },
    { name: "Chile", value: "CL" },
    { name: "China", value: "CN" },
    { name: "Colombia", value: "CO" },
    { name: "Comoros", value: "KM" },
    { name: "Congo (Congo-Brazzaville)", value: "CG" },
    { name: "Costa Rica", value: "CR" },
    { name: "Croatia", value: "HR" },
    { name: "Cuba", value: "CU" },
    { name: "Cyprus", value: "CY" },
    { name: "Czechia (Czech Republic)", value: "CZ" },
    { name: "Democratic Republic of the Congo", value: "CD" },
    { name: "Denmark", value: "DK" },
    { name: "Djibouti", value: "DJ" },
    { name: "Dominica", value: "DM" },
    { name: "Dominican Republic", value: "DO" },
    { name: "Ecuador", value: "EC" },
    { name: "Egypt", value: "EG" },
    { name: "El Salvador", value: "SV" },
    { name: "Equatorial Guinea", value: "GQ" },
    { name: "Eritrea", value: "ER" },
    { name: "Estonia", value: "EE" },
    { name: "Ethiopia", value: "ET" },
    { name: "Fiji", value: "FJ" },
    { name: "Finland", value: "FI" },
    { name: "France", value: "FR" },
    { name: "Gabon", value: "GA" },
    { name: "Gambia", value: "GM" },
    { name: "Georgia", value: "GE" },
    { name: "Germany", value: "DE" },
    { name: "Ghana", value: "GH" },
    { name: "Greece", value: "GR" },
    { name: "Grenada", value: "GD" },
    { name: "Guatemala", value: "GT" },
    { name: "Guinea", value: "GN" },
    { name: "Guinea-Bissau", value: "GW" },
    { name: "Guyana", value: "GY" },
    { name: "Haiti", value: "HT" },
    { name: "Holy See", value: "VA" },
    { name: "Honduras", value: "HN" },
    { name: "Hungary", value: "HU" },
    { name: "Iceland", value: "IS" },
    { name: "India", value: "IN" },
    { name: "Indonesia", value: "ID" },
    { name: "Iran", value: "IR" },
    { name: "Iraq", value: "IQ" },
    { name: "Ireland", value: "IE" },
    { name: "Israel", value: "IL" },
    { name: "Italy", value: "IT" },
    { name: "Jamaica", value: "JM" },
    { name: "Japan", value: "JP" },
    { name: "Jordan", value: "JO" },
    { name: "Kazakhstan", value: "KZ" },
    { name: "Kenya", value: "KE" },
    { name: "Kiribati", value: "KI" },
    { name: "Kuwait", value: "KW" },
    { name: "Kyrgyzstan", value: "KG" },
    { name: "Laos", value: "LA" },
    { name: "Latvia", value: "LV" },
    { name: "Lebanon", value: "LB" },
    { name: "Lesotho", value: "LS" },
    { name: "Liberia", value: "LR" },
    { name: "Libya", value: "LY" },
    { name: "Liechtenstein", value: "LI" },
    { name: "Lithuania", value: "LT" },
    { name: "Luxembourg", value: "LU" },
    { name: "Madagascar", value: "MG" },
    { name: "Malawi", value: "MW" },
    { name: "Malaysia", value: "MY" },
    { name: "Maldives", value: "MV" },
    { name: "Mali", value: "ML" },
    { name: "Malta", value: "MT" },
    { name: "Marshall Islands", value: "MH" },
    { name: "Mauritania", value: "MR" },
    { name: "Mauritius", value: "MU" },
    { name: "Mexico", value: "MX" },
    { name: "Micronesia", value: "FM" },
    { name: "Moldova", value: "MD" },
    { name: "Monaco", value: "MC" },
    { name: "Mongolia", value: "MN" },
    { name: "Montenegro", value: "ME" },
    { name: "Morocco", value: "MA" },
    { name: "Mozambique", value: "MZ" },
    { name: "Myanmar (formerly Burma)", value: "MM" },
    { name: "Namibia", value: "NA" },
    { name: "Nauru", value: "NR" },
    { name: "Nepal", value: "NP" },
    { name: "Netherlands", value: "NL" },
    { name: "New Zealand", value: "NZ" },
    { name: "Nicaragua", value: "NI" },
    { name: "Niger", value: "NE" },
    { name: "Nigeria", value: "NG" },
    { name: "North Korea", value: "KP" },
    { name: "North Macedonia", value: "MK" },
    { name: "Norway", value: "NO" },
    { name: "Oman", value: "OM" },
    { name: "Pakistan", value: "PK" },
    { name: "Palau", value: "PW" },
    { name: "Palestine State", value: "PS" },
    { name: "Panama", value: "PA" },
    { name: "Papua New Guinea", value: "PG" },
    { name: "Paraguay", value: "PY" },
    { name: "Peru", value: "PE" },
    { name: "Philippines", value: "PH" },
    { name: "Poland", value: "PL" },
    { name: "Portugal", value: "PT" },
    { name: "Qatar", value: "QA" },
    { name: "Romania", value: "RO" },
    { name: "Russia", value: "RU" },
    { name: "Rwanda", value: "RW" },
    { name: "Saint Kitts and Nevis", value: "KN" },
    { name: "Saint Lucia", value: "LC" },
    { name: "Saint Vincent and the Grenadines", value: "VC" },
    { name: "Samoa", value: "WS" },
    { name: "San Marino", value: "SM" },
    { name: "Sao Tome and Principe", value: "ST" },
    { name: "Saudi Arabia", value: "SA" },
    { name: "Senegal", value: "SN" },
    { name: "Serbia", value: "RS" },
    { name: "Seychelles", value: "SC" },
    { name: "Sierra Leone", value: "SL" },
    { name: "Singapore", value: "SG" },
    { name: "Slovakia", value: "SK" },
    { name: "Slovenia", value: "SI" },
    { name: "Solomon Islands", value: "SB" },
    { name: "Somalia", value: "SO" },
    { name: "South Africa", value: "ZA" },
    { name: "South Korea", value: "KR" },
    { name: "South Sudan", value: "SS" },
    { name: "Spain", value: "ES" },
    { name: "Sri Lanka", value: "LK" },
    { name: "Sudan", value: "SD" },
    { name: "Suriname", value: "SR" },
    { name: "Sweden", value: "SE" },
    { name: "Switzerland", value: "CH" },
    { name: "Syria", value: "SY" },
    { name: "Tajikistan", value: "TJ" },
    { name: "Tanzania", value: "TZ" },
    { name: "Thailand", value: "TH" },
    { name: "Timor-Leste", value: "TL" },
    { name: "Togo", value: "TG" },
    { name: "Tonga", value: "TO" },
    { name: "Trinidad and Tobago", value: "TT" },
    { name: "Tunisia", value: "TN" },
    { name: "Turkey", value: "TR" },
    { name: "Turkmenistan", value: "TM" },
    { name: "Tuvalu", value: "TV" },
    { name: "Uganda", value: "UG" },
    { name: "Ukraine", value: "UA" },
    { name: "United Arab Emirates", value: "AE" },
    { name: "United Kingdom", value: "GB" },
    { name: "United States of America", value: "US" },
    { name: "Uruguay", value: "UY" },
    { name: "Uzbekistan", value: "UZ" },
    { name: "Vanuatu", value: "VU" },
    { name: "Venezuela", value: "VE" },
    { name: "Vietnam", value: "VN" },
    { name: "Yemen", value: "YE" },
    { name: "Zambia", value: "ZM" },
    { name: "Zimbabwe", value: "ZW" },
  ];
  const handleSaveNormal = async () => {
    let requestBody = {
      first_name_eng: name,
      last_name_eng: lastName,
      first_name_thai: nameThai,
      last_name_thai: lastNameThai,
      phone: phone,
      height: height,
      weight: weight,
      sex: gender,
      position: position,
      nationality: nationality,
      description: description,
      born: date,
      address: {
        country: country,
        district: district,
        house_number: houseNumber,
        postal_code: postalCode,
        subdistrict: subdistrict,
        village: village,
      },
    };

    if (username !== originalUsername) {
      requestBody.username = username;
    }
    try {
      const res = await fetch(`http://localhost:8080/user/normalUser`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });
      if (res.status === 200) {
        alert("Save success");
        navigate("/profile");
        setName("");
        setLastName("");
        setNameThai("");
        setLastNameThai("");
        setNationality("");
        setCountry("");
        setDistrict("");
        setSubDistrict("");
        setVillage("");
        setHouseNumber("");
        setPostalCode("");
        setPhone("");
        setAge("");
        setGender("");
        setHeight("");
        setWeight("");
        setPosition("");
        setDescription("");
        setUsername("");
      }
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSaveOrganizer = async () => {};

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleNameThaiChange = (e) => {
    setNameThai(e.target.value);
  };
  const handleLastNameThaiChange = (e) => {
    setLastNameThai(e.target.value);
  };
  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };
  const handleSubDistrictChange = (e) => {
    setSubDistrict(e.target.value);
  };
  const handleVillageChange = (e) => {
    setVillage(e.target.value);
  };
  const handleHouseNumberChange = (e) => {
    setHouseNumber(e.target.value);
  };
  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };
  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setAge(dateString);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      setName(data?.user.normal_user.first_name_eng);
      setLastName(data?.user.normal_user.last_name_eng);
      setNameThai(data?.user.normal_user.first_name_thai);
      setLastNameThai(data?.user.normal_user.last_name_thai);
      setNationality(data?.user.normal_user.nationality);
      setCountry(data?.user.normal_user.address.country);
      setDistrict(data?.user.normal_user.address.district);
      setSubDistrict(data?.user.normal_user.address.subdistrict);
      setVillage(data?.user.normal_user.address.village);
      setHouseNumber(data?.user.normal_user.address.house_number);
      setPostalCode(data?.user.normal_user.address.postal_code);
      setPhone(data?.user.normal_user.phone);
      setAge(data?.user.normal_user.born);
      setGender(data?.user.normal_user.sex);
      setHeight(data?.user.normal_user.height);
      setWeight(data?.user.normal_user.weight);
      setPosition(data?.user.normal_user.position);
      setDescription(data?.user.normal_user.description);
      setUsername(data?.user.normal_user.username);
      setOriginalUsername(data?.user.normal_user.username);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
    <CssBaseline />
      <ResponsiveDrawer />
      <div className={style.main}>
      <h2 style={{ fontSize: '3rem', paddingLeft: `2rem`, paddingTop: `1rem` }}>
      Edit your profile
        </h2>
        <div className={style.container}>
          <TextField
            label={`${role === "normal" ? "First name eng" : "Name"}`}
            placeholder="First name eng"
            fullWidth
            value={name}
            onChange={handleNameChange}
          ></TextField>
          <TextField
            sx={{ display: `${role === "normal" ? "" : "none"}` }}
            label="Last name eng"
            placeholder="Last name eng"
            fullWidth
            value={lastName}
            onChange={handleLastNameChange}
          ></TextField>
          <TextField
            sx={{ display: `${role === "normal" ? "" : "none"}` }}
            label="First name thai"
            placeholder="First name thai"
            fullWidth
            value={nameThai}
            onChange={handleNameThaiChange}
          ></TextField>
          <TextField
            sx={{ display: `${role === "normal" ? "" : "none"}` }}
            label="Last name thai"
            placeholder="Last name thai"
            fullWidth
            value={lastNameThai}
            onChange={handleLastNameThaiChange}
          ></TextField>
          <TextField
            sx={{ display: `${role === "normal" ? "" : "none"}` }}
            label="Nationality"
            value={nationality}
            placeholder="Thailand"
            onChange={handleNationalityChange}
          ></TextField>
          <TextField
            label="Country"
            placeholder="Country"
            fullWidth
            value={country}
            select
            onChange={handleCountryChange}
          >
            {countries.map((country, index) => {
              return (
                <MenuItem key={index} value={country.value}>
                  {country.name}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            label="District"
            placeholder="Nonthaburi"
            value={district}
            onChange={handleDistrictChange}
          ></TextField>
          <TextField
            label="Sub district"
            placeholder="city"
            value={subdistrict}
            onChange={handleSubDistrictChange}
          ></TextField>
          <TextField
            label="Village"
            placeholder="pium suk"
            value={village}
            onChange={handleVillageChange}
          ></TextField>
          <TextField
            label="House number"
            placeholder="123/456"
            value={houseNumber}
            onChange={handleHouseNumberChange}
          ></TextField>
          <TextField
            label="Postal code"
            placeholder="11000"
            value={postalCode}
            onChange={handlePostalCodeChange}
          ></TextField>
          <TextField
            label="Phone"
            placeholder="0812345678"
            value={phone}
            onChange={handlePhoneChange}
          ></TextField>
          <DatePicker
            style={{ display: `${role === "normal" ? "" : "none"}` }}
            onChange={onChange}
            placeholder="Birth date"
            value={day}
            minDate={dayjs("2000-01-01", dateFormat)}
          />
          <TextField
            sx={{ display: `${role === "normal" ? "" : "none"}` }}
            label="Gender"
            placeholder="Male"
            select
            value={gender}
            onChange={handleGenderChange}
          >
            <MenuItem value="Unisex">Unisex</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
          <TextField
            sx={{ display: `${role === "normal" ? "" : "none"}` }}
            label="Height"
            placeholder="175"
            value={heightString}
            onChange={handleHeightChange}
          ></TextField>
          <TextField
            sx={{ display: `${role === "normal" ? "" : "none"}` }}
            label="Weight"
            placeholder="70"
            value={weightString}
            onChange={handleWeightChange}
          ></TextField>
          <TextField
            sx={{ display: `${role === "normal" ? "" : "none"}` }}
            label="Position"
            placeholder="Forward"
            value={position}
            onChange={handlePositionChange}
          ></TextField>
          <TextField
            sx={{ display: `${role === "normal" ? "" : "none"}` }}
            label="Username"
            placeholder="User1"
            value={username}
            onChange={handleUsernameChange}
          ></TextField>
        </div>
        <TextField
          sx={{ m: `2rem`, width: `80%` }}
          multiline
          rows={4}
          label="Description"
          placeholder="Welcome to my profile"
          value={description}
          onChange={handleDescriptionChange}
        ></TextField>
        <div style={{ display: `flex`, gap: `1rem` }}>
          <Button
            sx={{ width: `100px` }}
            variant="contained"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Back
          </Button>
          <Button
            sx={{ width: `100px` }}
            variant="contained"
            onClick={handleSaveNormal}
          >
            Save
          </Button>
          {/* <Button
            onClick={() => {
              console.log(currentDate);
            }}
          >
            sad
          </Button> */}
        </div>
      </div>
    </>
  );
}
