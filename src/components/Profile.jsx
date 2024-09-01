import React, { useEffect, useRef, useState } from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import style from "./Profile.module.css";
import About from "./profile/About";
import Stat from "./profile/Stat";
import { Button, CssBaseline } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Compatition from "./profile/Compatition";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Profile() {
  const [profile, setProfile] = useState("");
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [cover, setCover] = useState("");
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const roleId = localStorage.getItem("roleID");
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [about, setAbout] = useState(true);
  const [stat, setStat] = useState(false);
  const fileInputRef = useRef();
  const coverInputRef = useRef();

  const handleCoverFileClick = () => {
    coverInputRef.current.click();
  };

  const handleCoverFileChange = (e) => {
    const file = e.target.files[0];
    try {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result;
          setCover(base64String);
          console.log(base64String.length);

          // Convert base64String to a Blob
          const blob = dataURItoBlob(base64String);

          const formData = new FormData();
          formData.append("image", blob);

          const res = await fetch(`http://localhost:8080/image/cover`, {
            method: "PATCH",
            body: formData,
            credentials: "include",
          });

          const data = await res.json();
          if (res.ok) {
            alert("update image success");
            handleCloseModal2();
          } else {
            alert(data.message);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleCoverFileDelete = async () => {
    const res = await fetch(`http://localhost:8080/image/cover`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      alert("delete image success");
      handleCloseModal2();
      window.location.reload();
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    try {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result;
          setProfile(base64String);
          console.log(base64String.length);

          // Convert base64String to a Blob
          const blob = dataURItoBlob(base64String);

          const formData = new FormData();
          formData.append("image", blob);

          const res = await fetch(`http://localhost:8080/image/profile`, {
            method: "PATCH",
            body: formData,
            credentials: "include",
          });

          const data = await res.json();
          if (res.ok) {
            console.log("data" + data);
            alert("update image success");
            handleCloseModal1();
          } else {
            alert(data.message);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleFileDelete = async () => {
    const res = await fetch(`http://localhost:8080/image/profile`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      alert("delete image success");
      handleCloseModal1();
      window.location.reload();
    }
  };
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    fetchData();
    fetchOrganizer();
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
      setData(data.user);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchOrganizer = async () => {
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
      setData2(data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleAbout = () => {
    setAbout(true);
    setStat(false);
  };
  const handleStat = () => {
    setAbout(false);
    setStat(true);
  };
  const handleOpenModal1 = () => {
    setModal1(true);
  };

  const handleCloseModal1 = () => {
    setModal1(false);
  };
  const handleOpenModal2 = () => {
    setModal2(true);
  };

  const handleCloseModal2 = () => {
    setModal2(false);
  };

  return (
    <>
    <CssBaseline />
      <ResponsiveDrawer />
      <div className={style.main}>
        {/* <button onClick={()=>{console.log(profile)}}>sad</button> */}
        <Modal
          open={modal1}
          onClose={handleCloseModal1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload your profile <br />
              ( .png or .jpeg only ) 
            </Typography>
            <Box sx={{ mt: 1, display: `flex`, gap: 1 }}>
              {" "}
              <Button variant="contained" onClick={handleCloseModal1}>
                Back
              </Button>
              <Button variant="contained" onClick={handleFileDelete}>
                set as default
              </Button>
              <Button variant="contained" onClick={handleFileClick}>
                upload
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={modal2}
          onClose={handleCloseModal2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload your cover <br />
                ( .png or .jpeg only ) 
            </Typography>
            <Box sx={{ mt: 1, display: `flex`, gap: 1 }}>
              {" "}
              <Button variant="contained" onClick={handleCloseModal2}>
                Back
              </Button>
              <Button variant="contained" onClick={handleCoverFileDelete}>
                set as default
              </Button>
              <Button variant="contained" onClick={handleCoverFileClick}>
                upload
              </Button>
            </Box>
          </Box>
        </Modal>
        <div className={style.header}>
          {" "}
          <img
            className={style.img}
            alt="cover image"
            src={`${
              cover !== ""
                ? cover
                : `http://localhost:8080/${data?.image_cover_path}`
            }`}
          ></img>
          <button
            type="button"
            className={style.coverCamera}
            onClick={handleOpenModal2}
          >
            <CameraAltIcon sx={{ cursor: `pointer` }}></CameraAltIcon>
          </button>
          <input
            type="file"
            ref={coverInputRef}
            style={{ display: `none` }}
            onChange={handleCoverFileChange}
          ></input>
          <div className={style.profileContainer}>
            <img
              alt="profile image"
              src={
                profile !== ""
                  ? profile
                  : `http://localhost:8080/${data?.image_profile_path}`
              }
              className={style.img}
            ></img>
            <button
              type="button"
              className={style.camera}
              onClick={handleOpenModal1}
            >
              <CameraAltIcon sx={{ cursor: `pointer` }}></CameraAltIcon>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: `none` }}
              onChange={handleFileChange}
            ></input>
          </div>
          <div className={style.textHeader}>
            {role === "normal"
              ? data?.normal_user.first_name_eng &&
                data?.normal_user.last_name_eng !== ""
                ? data?.normal_user.first_name_eng +
                  " " +
                  data?.normal_user.last_name_eng
                : "First name " + "Last name"
              : data2?.organizer.name !== ""
              ? data2?.organizer.name
              : "Name"}
          </div>
          <div className={style.textDescription}>
            <p style={{overflowY: 'auto', maxHeight: "80px"}}> 
            {role === "normal"
              ? data?.normal_user.description !== ""
                ? data?.normal_user.description
                : "Description"
              : data2?.organizer.description !== ""
              ? data2?.organizer.description
              : "Description"}
            </p>
           
          </div>
        </div>
        <div className={style.tabs}>
          <div
            className={style.button}
            style={{ borderBottom: `${about ? "1px solid black" : ""}` }}
            onClick={handleAbout}
          >
            About
          </div>
          <div
            className={style.button}
            style={{ borderBottom: `${stat ? "1px solid black" : ""}` }}
            onClick={handleStat}
          >
            {role === "normal" ? "Stat" : "Compatition"}
          </div>
        </div>
        <div className={style.content}>
          {about ? <About /> : role === "normal" ? <Stat /> : <Compatition />}
        </div>
      </div>
    </>
  );
}
