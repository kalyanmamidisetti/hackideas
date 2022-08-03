import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
//LOCAL IMPORTS
import { fetchChallengesList } from "../../Store/actionCreator";

const useStyles = makeStyles((theme) => ({
  headTitleWrap: {
    color: "#2e8eec",
    flex: 1,
    fontSize: "20px",
    textAlign: "center",
  },
}));

function LandingPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [challengesData, setChallengesData] = useState([]);

  const successListData = (res) => {
    setChallengesData(res && res.results && res.results);
  };
  const failureListData = (err) => {
    setChallengesData([]);
  };

  useEffect(() => {
    fetchChallengesList({}, successListData, failureListData);
  }, []);

  const onLogoutClick = () => {
    localStorage.removeItem("emp_token");
    navigate("/");
  };

  console.log(challengesData);
  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
      <i
        className="fa fa-user-circle-o fa-2x"
        aria-hidden="true"
        style={{ color: "#2e8eec" }}
      ></i>
      <Typography className={classes.headTitleWrap}>Hack Challenges</Typography>
      <Tooltip title="Sign out">
        <IconButton
          aria-label="Logout"
          onClick={() => {
            onLogoutClick();
          }}
        >
          <i
            className="fa fa-sign-out fa-1x"
            aria-hidden="true"
            style={{ color: "#707070" }}
          ></i>
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default LandingPage;
