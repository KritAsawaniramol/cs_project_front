import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import style from "./EditOrganizer.module.css";
import { Button, CssBaseline, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default function EditOrganizer() {
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const roleId = localStorage.getItem("roleID");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");





  const [description, setDescription] = useState("");



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
  const handleSaveOrganizer = async () => {
    let requestBody = {
      name: name,
      phone: phone,
      description: description,
      address: {
        country: country,
        district: district,
        house_number: houseNumber,
        postal_code: postalCode,
        subdistrict: subdistrict,
        village: village,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/organizer`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );
      if (res.status === 200) {
        alert("Save success");
        navigate("/profile");
        setName("");
        setCountry("");
        setDistrict("");
        setSubDistrict("");
        setVillage("");
        setHouseNumber("");
        setPostalCode("");
        setPhone("");
        setDescription("");
      }
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(name)
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    console.log(country)
  };
  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    console.log(district)
  };
  const handleSubDistrictChange = (e) => {
    setSubDistrict(e.target.value);
    console.log(subdistrict)
  };
  const handleVillageChange = (e) => {
    setVillage(e.target.value);
    console.log(village)
  };
  const handleHouseNumberChange = (e) => {
    setHouseNumber(e.target.value);
    console.log(houseNumber)
  };
  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
    console.log(postalCode)
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    console.log(phone)
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    console.log(description)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/view/organizer/${roleId}`,
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

      setName(data.organizer.name);
      setCountry(data.organizer.address.country);
      setDistrict(data.organizer.address.district);
      setSubDistrict(data.organizer.address.subdistrict);
      setVillage(data.organizer.address.village);
      setHouseNumber(data.organizer.address.house_number);
      setPostalCode(data.organizer.address.postal_code);
      setPhone(data.organizer.phone);
      setDescription(data.organizer.description);
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
            placeholder="Name"
            fullWidth
            value={name}
            onChange={handleNameChange}
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
            placeholder="District"
            value={district}
            onChange={handleDistrictChange}
          ></TextField>
          <TextField
            label="Sub district"
            placeholder="Sub district"
            value={subdistrict}
            onChange={handleSubDistrictChange}
          ></TextField>
          <TextField
            label="Village"
            placeholder="Village"
            value={village}
            onChange={handleVillageChange}
          ></TextField>
          <TextField
            label="House number"
            placeholder="House number"
            value={houseNumber}
            onChange={handleHouseNumberChange}
          ></TextField>
          <TextField
            label="Postal code"
            placeholder="Postal code"
            value={postalCode}
            onChange={handlePostalCodeChange}
          ></TextField>
          <TextField
            label="Phone"
            placeholder="Phone"
            value={phone}
            onChange={handlePhoneChange}
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
            onClick={handleSaveOrganizer}
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
