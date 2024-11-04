import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./TeamInfo.module.css";
import ResponsiveDrawer from "./ResponsiveDrawer";
import Invite from "./teamInfo/Invite";
import Member from "./teamInfo/Member";
import Overview from "./teamInfo/Overview";
import Compatition from "./teamInfo/Compatition";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  Box,
  Button,
  Modal,
  Typography,
} from "@mui/material";


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

export default function TeamInfo() {
  const { state } = useLocation();
  const [profile, setProfile] = useState("");
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [cover, setCover] = useState("");
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isOverview, setIsOverview] = useState(true);
  const [isCompatition, setIsCompatition] = useState(false);
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const ownerId = localStorage.getItem("ownerTeamId");
  const fileInputRef = useRef();
  const coverInputRef = useRef();

  const handleCoverFileClick = () => {
    coverInputRef.current.click();
  };
  const handleFileClick = () => {
    fileInputRef.current.click();
  };
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

          const res = await fetch(
            `http://localhost:8080/image/team/profile/${state.id}`,
            {
              method: "PATCH",
              body: formData,
              credentials: "include",
            }
          );

          if (res.ok) {
            const data = await res.json();
            console.log("data" + data);
            alert("upload image success");
            handleCloseModal1();
            window.location.reload();
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error(err);
    }
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

          const res = await fetch(
            `http://localhost:8080/image/team/cover/${state.id}`,
            {
              method: "PATCH",
              body: formData,
              credentials: "include",
            }
          );

          if (res.ok) {
            const data = await res.json();
            console.log("data" + data);
            alert("upload image success");
            handleCloseModal2();
            window.location.reload();
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

  const handleMemberTab = () => {
    setIsMember(true);
    setIsOverview(false);
    setIsCompatition(false);
  };

  const handleOverviewTab = () => {
    setIsMember(false);
    setIsOverview(true);
    setIsCompatition(false);
  };
  const handleCompatitionTab = () => {
    setIsMember(false);
    setIsOverview(false);
    setIsCompatition(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
  const handleFileDelete = async () => {
    const res = await fetch(`http://localhost:8080/image/team/profile/${state.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      alert("delete image success");
      handleCloseModal1();
      window.location.reload();
    }
  };
  const handleCoverFileDelete = async () => {
    const res = await fetch(`http://localhost:8080/image/team/cover/${state.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      alert("delete image success");
      handleCloseModal2();
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/teams/${state?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log("teams: ",data.teams);
      setData(data.teams);
      localStorage.setItem("teamId", state.id);
      localStorage.setItem("ownerTeamId", data?.teams.owner_id);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
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
      <ResponsiveDrawer />
      <div className={style.main}>
        <div className={style.header}>
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
            style={{ display: `${id == ownerId ? "" : "none"}` }}
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
          <div className={style.textHeader}>{data?.name}</div>
          <div className={style.textDescription}>{data?.description}</div>
          <button
            className={style.inviteButton}
            style={{
              display: `${
                role === "normal" && data?.owner_id == id ? "" : "none"
              }`,
            }}
            onClick={handleOpen}
          >
            Invite member
          </button>
          <Invite open={open} close={handleClose} id={state?.id} />
          <div className={style.profileContainer}>
            <img
              alt="profile image"
              src={`${
                profile !== ""
                  ? profile
                  : `http://localhost:8080/${data?.image_profile_path}`
              }`}
              className={style.img}
            ></img>
            <button
              style={{ display: `${id == ownerId ? "" : "none"}` }}
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
        </div>
        <div className={style.container}>
          <div className={style.tabs}>
            <div
              style={{ borderBottom: `${isOverview ? "1px solid black" : ""}` }}
              className={style.button}
              onClick={handleOverviewTab}
            >
              Overview
            </div>
            <div
              style={{ borderBottom: `${isMember ? "1px solid black" : ""}` }}
              className={style.button}
              onClick={handleMemberTab}
            >
              Member
            </div>
            <div
              style={{
                borderBottom: `${isCompatition ? "1px solid black" : ""}`,
              }}
              className={style.button}
              onClick={handleCompatitionTab}
            >
              Compatitions
            </div>
          </div>
          <div className={style.content}>
            {isMember ? (
              <Member teamID={data.ID}/>
            ) : isOverview ? (
              <Overview data={data} />
            ) : (
              <Compatition compatitions={data.compatitions} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
