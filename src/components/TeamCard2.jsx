import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import { Forward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import CloseIcon from '@mui/icons-material/Close';


export default function TeamCard2(props) {
    const navigate = useNavigate();
    const { data, tourID, compatitionStatus, orgId } = props;
    const role = localStorage.getItem("role");
    const roleId = localStorage.getItem("roleID");
    // const [team, setTeam] = useState()

    // useEffect(() => {
        // setTeam(data)
    // }, [data]);

    const handleDeleteTeam = async (id) => {
        console.log(data);
        try {
            const res = await fetch(
                `http://localhost:8080/organizer/competition/${tourID}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ team_id: id }),
                }
            );
            const resJson = await res.json()
            if (res.status == 200) {
                alert(resJson.message)
                window.location.reload()
            } else {
                alert(resJson.message)
            }
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <>

            {data
                .map((item, index) => {
                    const handleClick = () => {
                        navigate("/teamInfo", { state: { id: item.id } });
                        localStorage.setItem("otherId", item.id);
                    };

                    
                    return (
                        <Card key={index} sx={{ width: 300 }}>
                            <CardHeader
                                action={
                                    <IconButton
                                        disabled={
                                            compatitionStatus == "Finished" ||
                                            compatitionStatus == "Cancelled" ||
                                            compatitionStatus == "Started"
                                        }
                                        onClick={() => handleDeleteTeam(item.id)}
                                        sx={{color: 'red'}}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                                sx={{
                                    display: `${role === "organizer" && roleId == localStorage.getItem("roleID")
                                        ? ""
                                        : "none"
                                        }`,
                                }}
                            />


                            <CardMedia
                                component="img"
                                image={`http://localhost:8080/${item.image_profile_path}`}
                                height={150}
                                sx={{ objectFit: 'contain' }}
                            />

                            <Box sx={{ height: '200px', maxHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
                                <CardContent>
                                    <Box sx={{ maxHeight: 100, overflowY: 'auto', padding: '0', margin: '0' }}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '25px' }}>
                                            {item.name === "" ? "" : item.name}
                                        </Typography>
                                        <Typography >
                                            {item.description === "" ? "" : item.description}
                                        </Typography>
                                    </Box>
                                </CardContent>

                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '22px' }}>
                                        <GroupIcon fontSize="large" sx={{ marginTop: '10px', marginRight: '10px' }} />
                                        <Typography fontSize={20}>
                                            {
                                                (item.number_of_member === ""
                                                    ? "0"
                                                    : item.number_of_member)}
                                        </Typography>
                                    </Box>
                                    <CardActions sx={{ justifyContent: `flex-end` }}>
                                        <IconButton onClick={handleClick}>
                                            <Forward />
                                        </IconButton>
                                    </CardActions>
                                </Box>
                            </Box>
                        </Card>
                    );
                })}
        </>
    );
}

// PropTypes validation
TeamCard2.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            image_profile_path: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            number_of_member: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ).isRequired,
    tourID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    compatitionStatus: PropTypes.string,
    orgId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};