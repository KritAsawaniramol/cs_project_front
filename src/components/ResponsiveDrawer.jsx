import * as React from 'react';
import {  useEffect } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { Link, useNavigate, useLocation } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Stack from '@mui/material/Stack';
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import style from './ResponsiveDrawer.module.css';

function ResponsiveDrawer() {
  const drawerWidth = 220;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerItems, setDrawerItems] = React.useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    setDrawer();
  }, []);
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const navigate = useNavigate();

  const drawerItemBeforeLogin = [
    {
      title: "Find Tournaments",
      icon: <EditCalendarIcon />,
      link: "/",
    },
    {
      title: "Find Persons",
      icon: <PeopleAltIcon />,
      link: "/findPerson",
    },
    {
      title: "Find Teams",
      icon: <GroupsIcon />,
      link: "/findTeam",
    },
  ];
  const drawerItemsNormal = [
    {
      title: "Next Match",
      icon: <AssignmentIcon />,
      link: "/nextMatch",
    },
    {
      title: "Find Tournaments",
      icon: <ContentPasteSearchIcon />,
      link: "/",
    },
    {
      title: "Find Persons",
      icon: <PersonSearchIcon />,
      link: "/findPerson",
    },
    {
      title: "Find Teams",
      icon: <Diversity3Icon />,
      link: "/findTeam",
    },
    {
      title: "Find Organizer",
      icon: <WorkIcon />,
      link: "/findOrganizer",
    },
    {
      title: "Request",
      icon: <EmailIcon />,
      link: "/request",
    },
    {
      title: "My Team",
      icon: <GroupsIcon />,
      link: "/myTeam",
    },
  ];
  const drawerItemsOrg = [
    { title: "Find Tournaments", icon: <ContentPasteSearchIcon />, link: "/" },
    { title: "Find Persons", icon: <PersonSearchIcon />, link: "/findPerson" },
    {
      title: "My Tournaments",
      icon: <ContentPasteIcon />,
      link: "/myTournament",
    },
    {
      title: "Find Teams",
      icon: <Diversity3Icon />,
      link: "/findTeam",
    },
    {
      title: "Find Organizer",
      icon: <WorkIcon />,
      link: "/findOrganizer",
    },
  ];

  const handleRegisterNormal = () => {
    navigate("/registerNormal");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };



  function setDrawer() {
    const role = localStorage.getItem("role")
    console.log("role: ", role);
    if (role === null) {
      setDrawerItems(drawerItemBeforeLogin)
    } else if (role === "organizer") {
      setDrawerItems(drawerItemsOrg)
    } else if (role === "normal") {
      setDrawerItems(drawerItemsNormal)
    }
  }

  const drawer = (
    <div>
      <Box
        sx={{
          height: '100vh',
        }}
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
          height={'98%'}
        >
          {/* banner */}
          <Box
            height={70}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ marginY: '20px' }}
            >
              <SportsSoccerIcon
                style={{ fontSize: 50 }}
                className={style.logo}
              />
              <Typography
                fontSize={30}>
                Kick-Off
              </Typography>
            </Stack>

            <Divider />

            <List>
              {drawerItems.map((item, index) => (
                <Link to={item.link} key={index}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItem key={index} disablePadding >
                    <ListItemButton
                      selected={item.link === pathname} >
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title ? item.title : " "}
                        sx={{ textDecoration: `none` }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>

          <Divider />

          <Box
         
          >


            {localStorage.getItem("role") != null ? (
              <div>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleProfile}
                  sx={{ mb: 1 }}
                >
                  <AccountCircleIcon sx={{ pr: 1, fontSize: 30 }} />
                  My profile
                </Button>
                <Button variant="contained" fullWidth
                onClick={handleLogout}
                >
                  <LoginIcon sx={{ pr: 1 }} />
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleRegisterNormal}
                  sx={{ mb: 1 }}
                >
                  <PersonAddIcon sx={{ pr: 1 }} />
                  Sign Up
                </Button>
                <Link to={"/login"}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Button variant="contained" fullWidth
                  >
                    <LoginIcon sx={{ pr: 1 }} />
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </Box>

        </Stack>
      </Box>

    </div >
  );

  return (
    <>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}

export default ResponsiveDrawer