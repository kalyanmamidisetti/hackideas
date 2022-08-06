import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
//LOCAL IMPORTS
import { fetchChallengesList } from "../../Store/actionCreator";
import ChallengeCard from "./card";
import AddChallengeForm from "./challengeForm";

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
  menuWrap: {
    width: "200px",
  },
  sortBtnWrap: {
    float: "right",
  },
}));

function LandingPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("emp_token");
  const [challengesData, setChallengesData] = useState([]);
  const [listingLoader, setListingLoader] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  //FOR USER PROFILE MENU
  const [showEmpMenu, setShowEmpMenu] = useState(false);
  const openEmpMenu = Boolean(showEmpMenu);
  const handleMenuClick = (event) => {
    setShowEmpMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setShowEmpMenu(null);
  };

  //LISTING SUCCESSCALLBACK
  const successListData = (res) => {
    setChallengesData(res && res.results && res.results);
    setListingLoader(false);
  };
  //LISTING FAILURECALLBACK
  const failureListData = (err) => {
    setChallengesData([]);
    setListingLoader(false);
  };

  useEffect(() => {
    setListingLoader(true);
    fetchChallengesList({}, successListData, failureListData);
  }, []);

  //ON LOGOUT CLICK
  const onLogoutClick = () => {
    localStorage.removeItem("emp_token");
    navigate("/");
  };

  //ON ADD NEW IDEA CLICK
  const addNewChallengeClick = () => {
    setShowAddForm(true);
  };
  const closeAddChallengeForm = () => {
    setShowAddForm(false);
  };

  //ON SORTING APPLY CLICK
  const onSortingClick = () => {
    let challenData = [...challengesData];
    let sortedData = challenData.sort(
      (a, b) => parseFloat(a.upvotes) - parseFloat(b.upvotes)
    );
    setChallengesData(sortedData);
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography className={classes.headTitleWrap}>
          Hack Challenges
        </Typography>
        <IconButton
          onClick={(event) => {
            handleMenuClick(event);
          }}
        >
          <i
            className="fa fa-user-circle-o fa-lg"
            aria-hidden="true"
            style={{ color: "#2e8eec" }}
          ></i>
        </IconButton>
        <Menu
          id="empProfileMenu"
          anchorEl={showEmpMenu}
          open={openEmpMenu}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "employee profile menus",
          }}
          className={classes.menuWrap}
        >
          <MenuItem onClick={handleMenuClose}>{employeeId}</MenuItem>
          <Divider />
          <MenuItem onClick={onLogoutClick}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
      {showAddForm ? (
        <AddChallengeForm closeForm={closeAddChallengeForm} />
      ) : (
        <React.Fragment>
          {!listingLoader ? (
            <Button
              variant="outlined"
              startIcon={
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
              }
              className={classes.btnWrap}
              onClick={() => {
                addNewChallengeClick();
              }}
            >
              New Challenge
            </Button>
          ) : null}
          <Container maxWidth="md">
            {listingLoader ? (
              <div className={classes.loaderWrap}>
                <CircularProgress />
              </div>
            ) : (
              <React.Fragment>
                {challengesData && challengesData.length ? (
                  <React.Fragment>
                    <IconButton
                      className={classes.sortBtnWrap}
                      onClick={() => {
                        onSortingClick();
                      }}
                    >
                      <i
                        className="fa fa-sort-numeric-desc"
                        aria-hidden="true"
                        style={{ color: "#2e8eec" }}
                      ></i>
                    </IconButton>
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
                  </React.Fragment>
                ) : (
                  <Typography className={classes.noDataWrap}>
                    No new challenges found!
                  </Typography>
                )}
              </React.Fragment>
            )}
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default LandingPage;
