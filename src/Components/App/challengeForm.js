import React from "react";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
//LOCAL IMPORTS
import { addNewChallenge } from "../../Store/actionCreator";
import { useState } from "react";
import SnackBarAlerts from "../Shared/snackbarAlerts";
import { getDateFormat } from "../../Helpers/basic";

const useStyles = makeStyles((theme) => ({
  paperWrap: {
    borderRadius: "10px",
    padding: "20px",
    margin: "20px",
    boxShadow:
      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
  },
  titleWrap: {
    textAlign: "center",
    color: "#2e8eec",
    fontSize: "20px",
  },
  loaderWrap: {
    marginRight: "10px",
    marginTop: "5px",
  },
  itemWrap: {
    display: "flex",
    justifyContent: "flex-end",
  },
  sumBtnWrap: {
    borderRadius: "10px",
    textTransform: "none",
  },
  clsBtnWrap: {
    textTransform: "none",
  },
  textFieldWrap: {
    marginTop: "20px",
    width: "100%",
    borderRadius: "20px",
  },
}));

const challengeDefTags = [
  { title: "Tech", id: 1 },
  { title: "Feature", id: 2 },
  { title: "HTML", id: 3 },
  { title: "CSS", id: 4 },
  { title: "JavaScript", id: 5 },
  { title: "Data Science", id: 6 },
  { title: "Python", id: 7 },
  { title: "AI", id: 10 },
  { title: "Machine Learning", id: 11 },
  { title: "Deep Learning", id: 12 },
];

function AddChallengeForm(props) {
  console.log(props);
  const openedMode = props && props.mode;
  const editChallengeData =
    props &&
    props.data &&
    Object.keys(props.data) &&
    Object.keys(props.data).length
      ? props.data
      : {};
  const classes = useStyles();
  const defTitle = editChallengeData.title ? editChallengeData.title : "";
  const defDesc = editChallengeData.description
    ? editChallengeData.description
    : "";
  const defTags = editChallengeData.challenge_tags
    ? editChallengeData.challenge_tags
    : [];
  const [title, setTitle] = useState(defTitle);
  const [desc, setDesc] = useState(defDesc);
  const [selectedTags, setSelectedTags] = useState(defTags);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [formErr, setFormErr] = useState({
    type: "",
    error: false,
  });
  const [opnSnackBar, setOpnSnackBar] = useState({
    show: false,
    message: "",
    type: "",
  });

  //ON SNACKBAR CLOSE
  const onSnackClose = () => {
    setOpnSnackBar({
      show: false,
      message: "",
      type: "",
    });
  };

  //ON CLOSE FORM CLICK
  const onCloseClick = () => {
    props.closeForm();
  };

  //ON TITLE HANDLE CHANGE
  const onTitleChange = (event) => {
    setTitle(event.target.value);
    setFormErr({
      type: "title",
      error: false,
    });
  };

  //ON DESC HANDLE CHANGE
  const onDescChange = (event) => {
    setDesc(event.target.value);
    setFormErr({
      type: "desc",
      error: false,
    });
  };

  //ON TAGS CHANGE
  const onTagsChange = (event, values) => {
    setSelectedTags(values);
    setFormErr({
      type: "tags",
      error: false,
    });
  };

  //ADD CHALLENGE SUCCESS CALLBAC
  const successAddChallenge = (res) => {
    setSubmitLoader(false);
    let challengeObj = {
      title: title,
      description: desc,
      challenge_tags: selectedTags,
      created_date: getDateFormat(new Date()),
      id: res && res.id,
      upvotes: res && res.upvotes,
    };
    props.closeForm(challengeObj);
  };

  //ADD CHALLENGE FAILURE CALLBACK
  const failureAddChallenge = (err) => {
    setSubmitLoader(false);
    setOpnSnackBar({
      show: true,
      message: "Something went wrong! Please try again!",
      type: "error",
    });
  };

  //ON ADD CHALLENGE CLICK
  const onAddChallenge = () => {
    if (!title) {
      setFormErr({
        type: "title",
        error: true,
      });
      setOpnSnackBar({
        show: true,
        message: "Please add challenge title!",
        type: "warning",
      });
    } else if (!desc) {
      setFormErr({
        type: "desc",
        error: true,
      });
      setOpnSnackBar({
        show: true,
        message: "Please add challenge description!",
        type: "warning",
      });
    } else if (!selectedTags.length) {
      setFormErr({
        type: "tags",
        error: true,
      });
      setOpnSnackBar({
        show: true,
        message: "Please choose atleast one tag!",
        type: "warning",
      });
    } else {
      setFormErr({
        type: "",
        error: false,
      });
      const payload = {
        title: title,
        description: desc,
        created_date: new Date(),
        challenge_tags: selectedTags,
        challenge_id:
          editChallengeData && editChallengeData.id
            ? editChallengeData.id
            : null,
      };
      if (openedMode === "update") {
        props.onChallengeUpdate(payload);
      } else {
        setSubmitLoader(true);
        addNewChallenge(payload, successAddChallenge, failureAddChallenge);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paperWrap}>
        <Typography className={classes.titleWrap}>Add New Challenge</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              label="Challenge Title"
              required
              autoComplete="off"
              onChange={onTitleChange}
              className={classes.textFieldWrap}
              error={formErr.error && formErr.type === "title"}
              inputProps={{ "data-testid": "challenge-title-input" }}
              defaultValue={editChallengeData && editChallengeData.title}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              label="Challenge Description"
              required
              multiline
              rows={4}
              onChange={onDescChange}
              className={classes.textFieldWrap}
              error={formErr.error && formErr.type === "desc"}
              inputProps={{ "data-testid": "challenge-desc-input" }}
              defaultValue={editChallengeData && editChallengeData.description}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={challengeDefTags}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              onChange={onTagsChange}
              defaultValue={
                editChallengeData && editChallengeData.challenge_tags
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  error={formErr.error && formErr.type === "tags"}
                  label="Tags"
                  placeholder="please choose tag"
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className={classes.itemWrap}
          >
            {submitLoader ? (
              <CircularProgress size={30} className={classes.loaderWrap} />
            ) : null}
            <Button
              variant="contained"
              disabled={submitLoader}
              className={classes.sumBtnWrap}
              onClick={() => {
                onAddChallenge();
              }}
            >
              {openedMode === "update" ? "Update" : "Create"}
            </Button>
            <Button
              disabled={submitLoader}
              className={classes.clsBtnWrap}
              onClick={() => {
                onCloseClick();
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        {opnSnackBar.show ? (
          <SnackBarAlerts data={opnSnackBar} close={onSnackClose} />
        ) : null}
      </Paper>
    </Container>
  );
}

export default AddChallengeForm;
