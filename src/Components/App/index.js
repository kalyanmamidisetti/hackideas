import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
//LOCAL IMPORTS
import { fetchChallengesList } from "../../Store/actionCreator";
import ChallengeCard from "./card";

const useStyles = makeStyles((theme) => ({
  headTitleWrap: {
    color: "#2e8eec",
    fontWeight: "bold",
    flex: 1,
    fontSize: "23px",
    textAlign: "center",
  },
  gridWrap: {
    marginBottom: "20px",
  },
  noDataWrap: {
    textAlign: "center",
    fontSize: "20px",
    marginTop: "20px",
  },
  btnWrap: {
    float: "right",
    margin: "15px",
    borderRadius: "10px",
    textTransform: "none",
  },
  loaderWrap: {
    textAlign: "center",
    marginTop: "20px",
  },
}));

function LandingPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [challengesData, setChallengesData] = useState([]);
  const [listingLoader, setListingLoader] = useState(true);

  const successListData = (res) => {
    setChallengesData(res && res.results && res.results);
    setListingLoader(false);
  };
  const failureListData = (err) => {
    setChallengesData([]);
    setListingLoader(false);
  };

  useEffect(() => {
    fetchChallengesList({}, successListData, failureListData);
  }, []);

  const onLogoutClick = () => {
    localStorage.removeItem("emp_token");
    navigate("/");
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <i
          className="fa fa-user-circle-o fa-2x"
          aria-hidden="true"
          style={{ color: "#2e8eec" }}
        ></i>
        <Typography className={classes.headTitleWrap}>
          Hack Challenges
        </Typography>
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
      <Button
        variant="contained"
        startIcon={<i class="fa fa-plus-circle" aria-hidden="true"></i>}
        className={classes.btnWrap}
        disabled={listingLoader}
      >
        New Idea
      </Button>
      <Container maxWidth="md">
        {listingLoader ? (
          <div className={classes.loaderWrap}>
            <CircularProgress className={classes.loaderWrap} />
          </div>
        ) : (
          <React.Fragment>
            {challengesData && challengesData.length ? (
              <Grid container spacing={2} className={classes.gridWrap}>
                {challengesData.map((data, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      key={index}
                    >
                      <ChallengeCard challenge={data} />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Typography className={classes.noDataWrap}>
                No new challenges found!
              </Typography>
            )}
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
}

export default LandingPage;
