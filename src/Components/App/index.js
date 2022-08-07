import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
//LOCAL IMPORTS
import Header from "./header";
import { fetchChallengesList } from "../../Store/actionCreator";
import ChallengeCard from "./card";
import AddChallengeForm from "./challengeForm";

const useStyles = makeStyles((theme) => ({
  gridWrap: {
    marginBottom: "20px",
  },
  noDataWrap: {
    textAlign: "center",
    fontSize: "20px",
    marginTop: "20px",
  },
  loaderWrap: {
    textAlign: "center",
    marginTop: "20px",
  },
  menuWrap: {
    width: "200px",
  },
  upvotesSortBtn: {
    textTransform: "none",
    marginTop: "20px",
    borderRadius: "13px",
    float: "right",
  },
  votesFilWrap: {
    borderRadius: "6px",
    fontWeight: 400,
    "& hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  votesFilWrapSelected: {
    color: "#2e8eec",
  },
  sortTitleWrap: {
    fontWeight: "bold",
    color: "#000000",
  },
  btnWrap: {
    float: "left",
    marginTop: "20px",
    borderRadius: "13px",
    textTransform: "none",
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [challengesData, setChallengesData] = useState([]);
  const [listingLoader, setListingLoader] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  //FOR SORTING
  const [showSortingOpt, setShowSortingOpt] = useState(false);
  const openSortingMenus = Boolean(showSortingOpt);
  const [selectedSortingType, setSelectedSortingType] = useState("");

  //FOR SORTING MENU OPEN
  const handleSortingMenuClick = (event) => {
    setShowSortingOpt(event.currentTarget);
  };
  //FOR SORTING MENU CLOSE
  const handleSortingMenuClose = () => {
    setShowSortingOpt(null);
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

  //ON UPVOTE CLICK
  const onUpvoteClick = (id) => {
    const dataIndex = challengesData.findIndex((entry) => entry.id === id);
    if (dataIndex > -1) {
      challengesData[dataIndex].upvotes += 1;
    }
    let filteredData = [...challengesData];
    setChallengesData(filteredData);
  };

  //ON ADD NEW IDEA CLICK
  const addNewChallengeClick = () => {
    setShowAddForm(true);
    setSelectedSortingType("");
  };

  //ON CLOSE ADD CHALLENGE FORM
  const closeAddChallengeForm = (data) => {
    if (data && Object.keys(data) && Object.keys(data).length) {
      const challengObj = {
        ...data,
        id: challengesData && challengesData.length + 1,
      };
      let newChallenge = [...challengesData, challengObj];
      setChallengesData(newChallenge);
    }
    setShowAddForm(false);
  };

  //ON SORTING APPLY CLICK
  const onSortingClick = (type) => {
    let challenData = [...challengesData];
    let sortedData = [];
    if (type === "Upvotes Low-High") {
      sortedData = challenData.sort(
        (a, b) => parseFloat(a.upvotes) - parseFloat(b.upvotes)
      );
    } else if (type === "Upvotes High-Low") {
      sortedData = challenData.sort(
        (a, b) => parseFloat(b.upvotes) - parseFloat(a.upvotes)
      );
    } else if (type === "Date Old-New") {
      sortedData = challenData.sort(
        (a, b) => new Date(a.created_date) - new Date(b.created_date)
      );
    } else if (type === "Date New-Old") {
      sortedData = challenData.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );
    }
    setChallengesData(sortedData);
    setSelectedSortingType(type);
    handleSortingMenuClose();
  };

  const renderSortingUi = () => {
    return (
      <React.Fragment>
        <Button
          id="sorting"
          variant="outlined"
          onClick={handleSortingMenuClick}
          endIcon={
            selectedSortingType === "Upvotes Low-High" ? (
              <i
                className="fa fa-chevron-down fa-1"
                aria-hidden="true"
                style={{ fontSize: "18px", marginTop: "-2px" }}
              ></i>
            ) : (
              <i
                className="fa fa-chevron-up fa-1"
                aria-hidden="true"
                style={{ fontSize: "18px", marginTop: "-3px" }}
              ></i>
            )
          }
          className={classes.upvotesSortBtn}
        >
          <span className={classes.sortTitleWrap}>Sort by:</span>
          &nbsp;&nbsp;
          {selectedSortingType}
        </Button>
        <Menu
          id="empProfileMenu"
          anchorEl={showSortingOpt}
          open={openSortingMenus}
          onClose={handleSortingMenuClose}
          MenuListProps={{
            "aria-labelledby": "Sorting menus",
          }}
          className={classes.menuWrap}
        >
          <MenuItem
            onClick={() => {
              onSortingClick("Upvotes High-Low");
            }}
            className={
              selectedSortingType === "Upvotes High-Low"
                ? classes.votesFilWrapSelected
                : classes.votesFilWrap
            }
          >
            Upvotes: High-Low
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              onSortingClick("Upvotes Low-High");
            }}
            className={
              selectedSortingType === "Upvotes Low-High"
                ? classes.votesFilWrapSelected
                : classes.votesFilWrap
            }
          >
            Upvotes: Low-High
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              onSortingClick("Date New-Old");
            }}
            className={
              selectedSortingType === "Date New-Old"
                ? classes.votesFilWrapSelected
                : classes.votesFilWrap
            }
          >
            Date: New-Old
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              onSortingClick("Date Old-New");
            }}
            className={
              selectedSortingType === "Date Old-New"
                ? classes.votesFilWrapSelected
                : classes.votesFilWrap
            }
          >
            Date: Old-New
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Header />
      {showAddForm ? (
        <AddChallengeForm closeForm={closeAddChallengeForm} />
      ) : (
        <React.Fragment>
          <Container maxWidth="md">
            {listingLoader ? (
              <div className={classes.loaderWrap}>
                <CircularProgress />
              </div>
            ) : (
              <React.Fragment>
                {challengesData && challengesData.length ? (
                  <React.Fragment>
                    <Button
                      variant="outlined"
                      startIcon={
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      }
                      className={classes.btnWrap}
                      onClick={addNewChallengeClick}
                    >
                      Challenge
                    </Button>
                    {renderSortingUi()}
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
                            <ChallengeCard
                              challenge={data}
                              onUpvoteclick={onUpvoteClick}
                            />
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
