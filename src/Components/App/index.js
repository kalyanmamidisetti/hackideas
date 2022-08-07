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
import { CustomHeader } from "./header";
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

  //FOR VOTES FILTER
  const [showSortingOpt, setShowSortingOpt] = useState(false);
  const opnSortingOpt = Boolean(showSortingOpt);
  const handleMenuClick = (event) => {
    setShowSortingOpt(event.currentTarget);
  };
  const handleMenuClose = () => {
    setShowSortingOpt(null);
  };
  //FOR SROTING THE SELECTED VOTES FILTER TYPE
  const [selectedVotesSortType, setSelectedVotesSortType] = useState("");

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
    setSelectedVotesSortType("");
  };

  const closeAddChallengeForm = (data) => {
    if (data && Object.keys(data) && Object.keys(data).length) {
      const challengObj = {
        ...data,
        id: challengesData && challengesData.length + 1,
      };
      console.log(challengObj);
      let newChallenge = [...challengesData, challengObj];
      setChallengesData(newChallenge);
    }
    setShowAddForm(false);
  };

  //ON UPVOTES SORTING APPLY CLICK
  const onVoteSortingClick = (type) => {
    let challenData = [...challengesData];
    let sortedData = [];
    if (type === "Low-High") {
      sortedData = challenData.sort(
        (a, b) => parseFloat(a.upvotes) - parseFloat(b.upvotes)
      );
    } else {
      sortedData = challenData.sort(
        (a, b) => parseFloat(b.upvotes) - parseFloat(a.upvotes)
      );
    }
    setChallengesData(sortedData);
    setSelectedVotesSortType(type);
    handleMenuClose();
  };

  const renderUpvoteSorting = () => {
    return (
      <React.Fragment>
        <Button
          id="upvotesorting"
          variant="outlined"
          onClick={handleMenuClick}
          endIcon={
            selectedVotesSortType === "Low-High" ? (
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
          <span className={classes.sortTitleWrap}>Sort by Upvotes:</span>
          &nbsp;&nbsp;
          {selectedVotesSortType}
        </Button>
        <Menu
          id="empProfileMenu"
          anchorEl={showSortingOpt}
          open={opnSortingOpt}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "employee profile menus",
          }}
          className={classes.menuWrap}
        >
          <MenuItem
            onClick={() => {
              onVoteSortingClick("High-Low");
            }}
            className={
              selectedVotesSortType === "High-Low"
                ? classes.votesFilWrapSelected
                : classes.votesFilWrap
            }
          >
            Upvotes: High-Low
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              onVoteSortingClick("Low-High");
            }}
            className={
              selectedVotesSortType === "Low-High"
                ? classes.votesFilWrapSelected
                : classes.votesFilWrap
            }
          >
            Upvotes: Low-Hight
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <CustomHeader />
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
                    {renderUpvoteSorting()}
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
