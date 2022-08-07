import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
//LOCAL IMPORTS
import { logInAuth } from "../../Store/actionCreator";
import SnackBarAlerts from "../Shared/snackbarAlerts";

const useStyles = makeStyles((theme) => ({
  mainTitleWrap: {
    color: "#2e8eec",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
  btnWrap: {
    marginTop: "10px",
  },
  paperWrap: {
    borderRadius: "10px",
    padding: "20px",
    margin: "20px",
    boxShadow:
      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
  },
  loadWrap: {
    color: "#2e8eec",
    marginRight: "10px",
  },
}));

function LoginPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [emptyErr, setEmptyErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inProgress, setInProgress] = useState(false);
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

  //ON ID HANDLE CHANGE
  const onEmpIdChange = (event) => {
    setEmployeeId(event.target.value);
    setEmptyErr(false);
  };

  const successAuthCB = (res) => {
    localStorage.setItem("emp_token", employeeId);
    navigate("/app");
    setInProgress(false);
  };
  const failureAuthCB = (err) => {
    setInProgress(false);
    setOpnSnackBar({
      show: true,
      message: "Something went wrong! Please try again!",
      type: "error",
    });
  };

  //ON LOGIN IN CLICK
  const onHandleSubmit = (event) => {
    event.preventDefault();
    const employeePassword =
      document.getElementById("password") &&
      document.getElementById("password").value;
    if (!employeeId) {
      setEmptyErr(true);
      setOpnSnackBar({
        show: true,
        message: "Please add employee id!",
        type: "warning",
      });
    } else {
      const payload = {
        emp_id: employeeId,
        password: employeePassword,
      };
      setInProgress(true);
      logInAuth(payload, successAuthCB, failureAuthCB);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="xs">
      <Grid
        container
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper className={classes.paperWrap}>
          <Typography className={classes.mainTitleWrap}>Hack Ideas</Typography>
          <Box component="form" onSubmit={onHandleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="empId"
              label="Employee ID"
              name="empid"
              autoComplete="off"
              autoFocus
              error={emptyErr}
              onChange={onEmpIdChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <i className="fa fa-eye fa-3" aria-hidden="true"></i>
                      ) : (
                        <i
                          className="fa fa-eye-slash fa-3"
                          aria-hidden="true"
                        ></i>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              onClick={onHandleSubmit}
              type="submit"
              fullWidth
              id="login"
              variant="contained"
              disabled={inProgress}
              className={classes.btnWrap}
            >
              {inProgress ? (
                <CircularProgress size={20} className={classes.loadWrap} />
              ) : null}
              Login
            </Button>
          </Box>
        </Paper>
      </Grid>
      {opnSnackBar.show ? (
        <SnackBarAlerts data={opnSnackBar} close={onSnackClose} />
      ) : null}
    </Container>
  );
}

export default LoginPage;
