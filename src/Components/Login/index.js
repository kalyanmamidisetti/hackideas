import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const useStyles = makeStyles((theme) => ({
  mainTitleWrap: {
    color: "#2e8eec",
    fontSize: "20px",
  },
  btnWrap: {
    marginTop: "10px",
  },
}));

function LoginPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [emptyErr, setEmptyErr] = useState(false);

  const onHandleSubmit = (event) => {
    event.preventDefault();
    const employeeId = document.getElementById("empId").value;
    if (!employeeId) {
      setEmptyErr(true);
    } else {
      localStorage.setItem("emp_token", employeeId);
      navigate("/app");
    }
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
        <Typography className={classes.mainTitleWrap}>
          Welcome to Hack Ideas
        </Typography>
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
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            onClick={onHandleSubmit}
            type="submit"
            fullWidth
            id="login"
            variant="contained"
            className={classes.btnWrap}
          >
            Login
          </Button>
        </Box>
      </Grid>
    </Container>
  );
}

export default LoginPage;
