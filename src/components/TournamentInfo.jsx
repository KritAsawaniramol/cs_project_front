import React, { useEffect, useState } from "react";
import style from "./TournamentInfo.module.css";
import ResponsiveDrawer from './ResponsiveDrawer';
import Card from './card/Card';
import Table from "./tournamentInfo/Table";
import Score from "./tournamentInfo/Score";
import Bracket from "./tournamentInfo/Bracket";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from '@mui/material/Grid';

import { CssBaseline, MenuItem, TextField } from "@mui/material";
// import Status from "./Status";
// import dayjs from "dayjs";
import Info from "./tournamentInfo/Info";
// import BasicTable from "./BasicTable";
import Place from "./tournamentInfo/Place";
import TournamentInfoCard from "./tournamentInfo/TournamentInfoCard";
import TeamCard2 from "./TeamCard2";

const styled = {
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

export default function TournamentInfo() {
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [join, setJoin] = useState(false);
    const role = localStorage.getItem("role");
    const roleId = localStorage.getItem("roleID");
    const id = localStorage.getItem("id");
    const [isJoinCode, setIsJoinCode] = useState();
    const [number, setNumber] = useState("");
    const [code, setCode] = useState();
    const [banner, setBanner] = useState("");

    const navigate = useNavigate();
    const { state } = useLocation();
    const [team, setTeam] = useState([]);
    const [teamID, setTeamID] = useState(team?.id);

    useEffect(() => {
        fetchData();
        if (role !== "organizer") {
        fetchTeam();
        }
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
            setData(data.compatition);
            console.log("compatition: ", data);
        } catch (e) {
            console.log(e);
        }
    };

        const fetchTeam = async () => {
            try {
                const res = await fetch(`http://localhost:8080/user/teams`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await res.json();
                setTeam(data.teams);
    
                console.log("Team: ", data.teams);
            } catch (e) {
                console.log(e);
            }
        };
    
    
    const handleEdit = () => {
        navigate("/editTournament", { state: { id: state.id } });
    };

    const handleTeamID = (e) => {
        setTeamID(e.target.value);
    };
    const handleJoinOpen = () => {
        setJoin(true);
    };
    const handleJoinClose = () => {
        setJoin(false);
    };
    const handleJoin = async () => {
        if (data?.application_type === "free") {
            const res = await fetch(`http://localhost:8080/user/competition/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    compatition_id: state.id,
                    team_id: teamID,
                }),
            });
            alert("Join success");
            handleJoinClose();
            window.location.reload();
        } else {
            if (code === "") {
                alert("Error: Code cannot be empty");
                return;
            }
            const res = await fetch(`http://localhost:8080/user/competition/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    compatition_id: state.id,
                    team_id: teamID,
                    code: code,
                }),
            });
            const data = await res.json();
            const message = data["message"];
            if (res.status === "200") {
                alert("Join success");
            } else {
                console.log("res: ", res);
                alert(message ? message : "Join failed")
            }
            window.location.reload();
            setCode("");
            handleJoinClose();
        }
    };
 
    const handleUpdateMatch = () => {
        navigate("/matchesForm", { state: { id: data?.Matchs[0].id } });
    };
    const updateStatusStart = async () => {
        try {
            const res = await fetch(
                `http://localhost:8080/organizer/competition/start/${state.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            if (res.status === 200) {
                alert("Update success");
                window.location.reload();
            }
            const data = await res.json();
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };
    const updateStatusOpen = async () => {
        try {
            const res = await fetch(
                `http://localhost:8080/organizer/competition/open/${state.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                alert("Update success");
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateStatusFinish = async () => {
        try {
            const res = await fetch(
                `http://localhost:8080/organizer/competition/finish/${state.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                alert("Update success");
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };
    const updateStatusCancel = async () => {
        try {
            const res = await fetch(
                `http://localhost:8080/organizer/competition/cancel/${state.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                alert("Update success");
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };

    // const handleJoinCodeOpen = () => {
    //     setIsJoinCode(true);
    // };
    // const handleJoinCodeClose = () => {
    //     setIsJoinCode(false);
    // };
    const handleNumber = (e) => {
        setNumber(e.target.value);
        console.log(number);
    };
    const handleCode = (e) => {
        setCode(e.target.value);
        console.log(code);
    };

    const handleJoinCode = async () => {
        try {
            if (number > 0 && number <= 64) {
                const res = await fetch(
                    `http://localhost:8080/organizer/competition/joinCode/add/${state.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            number: parseInt(number),
                        }),
                    }
                );
                setNumber("");
                window.location.reload();
            } else {
                alert("Number must be between 1 and 64");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const isValidUrl = urlString => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }

    const openInNewTab = () => {
        console.log("video_url: " + data?.Contact);
        if (isValidUrl(data?.Contact)) {
            const newWindow = window.open(
                data?.Contact,
                "_blank",
                "noopener,noreferrer"
            );
            if (newWindow) newWindow.opener = null;
        }
    };
    const [openApplicationModal, setOpenApplicationModal] = React.useState(false);
    const handleOpenApplicationModal = () => setOpenApplicationModal(true);
    const handleCloseApplicationModal = () => setOpenApplicationModal(false);
    const [openFinishModal, setOpenFinishModal] = React.useState(false);
    const handleOpenFinishModal = () => setOpenFinishModal(true);
    const handleCloseFinishModal = () => setOpenFinishModal(false);



    return (
        <>
            <CssBaseline />
            <Modal
                open={openFinishModal}
                onClose={handleCloseFinishModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styled}>
                    <Typography
                        sx={{ mb: 1 }}
                        id="modal-modal-title"
                        variant="h7"
                        component="h2"
                    >
                        Finish your compatition
                    </Typography>

                    {/* <Typography
            sx={{
              mb: 1,
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            If you open application, You will no longer be able to edit information about application. 
          </Typography> */}

                    <Box sx={{ display: `flex`, justifyContent: `flex-end`, mt: 2 }}>
                        {/* <Button variant="contained" onClick={handleJoin}> */}
                        <Button variant="contained" onClick={updateStatusFinish}>
                            OK
                        </Button>
                        <Button variant="contained" onClick={handleCloseFinishModal} style={{ marginLeft: '10px' }}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={openApplicationModal}
                onClose={handleCloseApplicationModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styled}>
                    <Typography
                        sx={{ mb: 1 }}
                        id="modal-modal-title"
                        variant="h7"
                        component="h2"
                    >
                        Open application of your compatition
                    </Typography>

                    <Typography
                        sx={{
                            mb: 1,
                        }}
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        If you open application, You will no longer be able to edit information about application.
                    </Typography>

                    <Box sx={{ display: `flex`, justifyContent: `flex-end`, mt: 2 }}>
                        {/* <Button variant="contained" onClick={handleJoin}> */}
                        <Button variant="contained" onClick={updateStatusOpen}>
                            OK
                        </Button>
                        <Button variant="contained" onClick={handleCloseFinishModal} style={{ marginLeft: '10px' }}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>


            <Modal
                open={join}
                onClose={handleJoinClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styled}>
                    <Typography
                        sx={{ mb: 1 }}
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Choose team you want to join
                    </Typography>
                    <TextField
                        sx={{ mb: 2 }}
                        fullWidth
                        select
                        value={teamID}
                        onChange={handleTeamID}
                    >
                        {team?.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            );
                        })}
                    </TextField>
                    <Typography
                        sx={{
                            mb: 1,
                            display: `${data?.application_type === "free" ? "none" : ""}`,
                        }}
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Enter code
                    </Typography>
                    <TextField
                        sx={{
                            display: `${data?.application_type === "free" ? "none" : ""}`,
                        }}
                        fullWidth
                        value={code}
                        onChange={handleCode}
                    ></TextField>
                    <Box sx={{ display: `flex`, justifyContent: `flex-end`, mt: 2 }}>
                        <Button variant="contained" onClick={handleJoin}>
                            OK
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <ResponsiveDrawer />
            <div className={style.main}>
                <div className={style.header}>
                    <img className={style.img} src="src/assets/image/stadium.jpeg"></img>
                    <div className={style.textheader}>
                        <div>{data?.name}</div>
                    </div>
                    <button
                        disabled={data?.status !== "Coming soon"}
                        className={style.button}
                        style={{
                            display: `${role === "organizer" && roleId == state.orgId ? "" : "none"
                                }`,
                        }}
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        className={style.button2}
                        style={{
                            display: `${role === "normal" && data?.status === "Applications opening"
                                ? ""
                                : "none"
                                }`,
                        }}
                        onClick={handleJoinOpen}
                    >
                        Join
                    </button>
                </div>
                <div className={style.content}>
                    <div style={{ display: `flex`, gap: 10 }}>
                        <Button
                            variant="contained"
                            // onClick={updateStatusOpen}
                            onClick={handleOpenApplicationModal}
                            color="success"
                            disabled={
                                data?.status === "Applications opening" ||
                                data?.status === "Started" ||
                                data?.status === "Finished" ||
                                data?.status === "Cancelled"
                            }
                            style={{
                                display: `${role === "organizer" && roleId == data?.organizer_info.id
                                    ? ""
                                    : "none"
                                    }`,
                            }}
                        >
                            Applicantion Opening
                        </Button>
                        <Button
                            variant="contained"
                            onClick={updateStatusStart}
                            color="primary"
                            disabled={
                                data?.status !== "Applications opening"
                                // data?.status === "Started" ||
                                // data?.status === "Finished" ||
                                // data?.status === "Cancelled"
                            }
                            style={{
                                display: `${role === "organizer" && roleId == data?.organizer_info.id
                                    ? ""
                                    : "none"
                                    }`,
                            }}
                        >
                            Start
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleOpenFinishModal}
                            color="warning"
                            disabled={
                                // data?.status === "Finished" 
                                // || data?.status === "Cancelled"
                                data?.status !== "Started"
                            }
                            style={{
                                display: `${role === "organizer" && roleId == data?.organizer_info.id
                                    ? ""
                                    : "none"
                                    }`,
                            }}
                        >
                            Finish
                        </Button>
                        <Button
                            variant="contained"
                            onClick={updateStatusCancel}
                            color="error"
                            disabled={data?.status == "Finished" || data?.status == "Cancelled"}
                            style={{
                                display: `${role === "organizer" && roleId == data?.organizer_info.id
                                    ? ""
                                    : "none"
                                    }`,
                            }}
                        >
                            Cancel
                        </Button>

                    </div>

                    <div
                        className={style.section}
                        style={{
                            display: `${role === "organizer" &&
                                roleId == data?.organizer_info.id &&
                                data?.application_type !== "free"
                                ? ""
                                : "none"
                                }`,
                        }}
                    >
                        <div
                            style={{
                                display: `flex`,
                                alignItems: `center`,
                                marginBottom: `1rem`,
                                justifyContent: `space-between`,
                            }}
                        >
                            {" "}
                            <h2 style={{ paddingRight: `0.5rem` }}>Join Code: </h2>
                            <div style={{ display: `flex`, alignItems: `center` }}>
                                <TextField
                                    type="number"
                                    placeholder="Number of code 1-64"
                                    sx={{ mr: 2 }}
                                    value={number}
                                    onChange={handleNumber}
                                ></TextField>
                                <h4>Join Code</h4>
                                <Button
                                    disabled={data?.status == "Finished" || data?.status == "Cancelled" || data?.status == "Started"}
                                    sx={{ ml: 2 }}
                                    variant="contained"
                                    onClick={handleJoinCode}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>

                        {data?.join_code.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{ display: `flex`, justifyContent: `space-between` }}
                                >
                                    {item?.code}
                                    <span
                                        style={{
                                            color: `${item?.status === "not used" ? "green" : "red"}`,
                                        }}
                                    >
                                        {item?.status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div
                        style={{
                            width: `100%`,
                            height: `auto`,
                            display: `flex`,
                            justifyContent: `center`,
                            alignItems: `center`,
                        }}
                    >
                        <img
                            style={{

                                height: `60vh`,
                                objectFit: `cover`,
                            }}
                            src={
                                banner !== ""
                                    ? banner
                                    : `http://localhost:8080/${data?.image_banner}`
                            }
                        ></img>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={6}>
                            <div className={style.section}>
                                <h2 style={{ paddingRight: `0.5rem` }}>Description: </h2>
                                <p> {data?.description}</p>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={6}>
                            <div className={style.section}>
                                <h2 style={{ paddingRight: `0.5rem` }}>Rule: </h2>
                                <p>{data?.rule}</p>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={6}>
                            <div className={style.section}>
                                <h2 style={{ paddingRight: `0.5rem` }}>Prize: </h2>
                                <p>
                                    {data?.prize}
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={6}>
                            <div className={style.section}>

                                <Info data={data} />

                            </div>
                        </Grid>
                        <Grid item xs={4} md={6}>
                            <div className={style.section}>
                                <h2>Organizer info</h2>
                                <div>
                                    Name:{" "}
                                    {data?.organizer_info.name !== ""
                                        ? data?.organizer_info.name
                                        : "Organizer name"}
                                </div>
                                <span>
                                    Address:
                                    {data?.organizer_info.address.house_number &&
                                        data?.organizer_info.address.village &&
                                        data?.organizer_info.address.district &&
                                        data?.organizer_info.address.subdistrict &&
                                        data?.organizer_info.address.postal_code &&
                                        data?.organizer_info.address.country !== ""
                                        ? " " +
                                        data?.organizer_info.address.house_number +
                                        " " +
                                        data?.organizer_info.address.village +
                                        " " +
                                        data?.organizer_info.address.district +
                                        " " +
                                        data?.organizer_info.address.subdistrict +
                                        " " +
                                        data?.organizer_info.address.postal_code +
                                        " " +
                                        data?.organizer_info.address.country
                                        : " -"}
                                </span>
                                <div>
                                    {data?.organizer_info.phone !== ""
                                        ? "Phone: " + data?.organizer_info.phone
                                        : "Phone: -"}
                                </div>
                                <span>
                                    {"Contact: "}
                                    <span
                                    >
                                        {" "}
                                        <a
                                            style={{ color: `blue`, textDecoration: `underline` }}
                                            onClick={openInNewTab}
                                        >
                                            {data?.Contact_type.toUpperCase()}
                                        </a>
                                    </span>
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={6}></Grid>
                    </Grid>


                </div>
                <div className={style.textParticipant}>
                    <div>
                        {"Team participants " +
                            data?.teams.length +
                            " / " +
                            data?.number_of_team}
                    </div>
                </div>
                <div className={style.cardContainer}>
                    <TeamCard2 data={data?.teams || []} tourID={data?.id} compatitionStatus={data?.status} orgId={data?.id} />

                    {/* <TournamentInfoCard
                        tourID={state.id}
                        compatitionStatus={data?.status}
                    /> */}
                </div>

                <div className={style.textParticipant}>
                    <div>Team place</div>
                </div>
                <div className={style.cardContainer}>
                    <Place teams={data?.teams}
                        type={data?.type} />
                </div>
                <div className={style.textParticipant}>
                    <div>Matches</div>
                </div>
                <div className={style.cardContainer}>
                    <Score id={state.id} update={handleUpdateMatch} />
                </div>
                <div className={style.textParticipant}>
                    {data?.type === "Round Robin" ? (
                        <p>Round Robin</p>
                    ) : data?.type === "Tournament" ? (
                        <p>Playoffs</p>
                    ) : (
                        ""
                    )}
                </div>
                <div className={style.cardContainer}>
                    {data?.type === "Round Robin" ? (
                        <Table id={state.id} />
                    ) : (
                        <Bracket id={state.id} />
                    )}
                </div>
            </div>
        </>
    );
}
