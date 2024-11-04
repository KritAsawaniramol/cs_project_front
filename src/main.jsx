import App from './components/App.jsx'
import { createRoot } from 'react-dom/client'
import OtherProfile from './components/OtherProfile.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TournamentInfo from './components/TournamentInfo.jsx';
import React from "react";
import "./main.css"
import FindPerson from './components/FindPerson.jsx';
import FindTeam from './components/FindTeam.jsx';
import TeamInfo from './components/TeamInfo.jsx';
import Login from './components/Login.jsx';
import NextMatch from './components/NextMatch.jsx';
import FindOrganizer from './components/FindOrganizer.jsx';
import OtherOrganizer from './components/OtherOrganizer.jsx';
import Request from './components/Request.jsx';
import MyTeam from './components/MyTeam.jsx';
import CreateTeam from './components/createTeam.jsx';
import MyTournament from './components/MyTournament.jsx';
import EditTournament from './components/myTournament/EditTournament.jsx';
import RegisterNormal from './components/RegisterNormal.jsx';
import RegisterOrganizer from './components/RegisterOrganizer.jsx';
import Profile from './components/Profile.jsx';
import CreateTournament from './components/CreateTournament.jsx';
import MatchesForm from './components/myTournament/MatchesForm.jsx';
import EditOrganizer from './components/EditOrganizer.jsx';
import EditProfile from './components/EditProfile.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registerNormal",
    element: <RegisterNormal />,
  },

  {
    path: "/registerOrganizer",
    element: <RegisterOrganizer />,
  },
  {
    path: "/findTeam",
    element: <FindTeam />,
  },
  {
    path: "/myTournament",
    element: <MyTournament />,
  },
  {
    path: "/createTournament",
    element: <CreateTournament />,
  },

  {
    path: "/tournamentInfo",
    element: <TournamentInfo />,
  },
  {
    path: "editTournament",
    element: <EditTournament />,
  },
  {
    path: "/matchesForm",
    element: <MatchesForm />,
  },
  {
    path: "/nextMatch",
    element: <NextMatch />,
  },
  { path: "/findOrganizer", element: <FindOrganizer /> },
  { path: "/otherOrganizer", element: <OtherOrganizer /> },
  { path: "/editOrganizer", element: <EditOrganizer /> },
  // ]);
  // },

  {
    path: "/profile",
    element: <Profile />,
  },
  { path: "/myTeam", element: <MyTeam /> },
  {
    path: "/request",
    element: <Request />,
  },
  {
    path: "/createTeam",
    element: <CreateTeam />,
  },
  {
    path: "/teamInfo",
    element: <TeamInfo />,
  },
  {
    path: "/editProfile",
    element: <EditProfile />,
  },
  {
    path: "/findPerson",
    element: <FindPerson />,
  },
  {
    path: "/otherProfile",
    element: <OtherProfile />,
  },
  // {
  //   path: "/bracket",
  //   element: <Bracket />,
  // },
  // 
]);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
  </React.StrictMode>
)
