import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles((theme) => ({
  headTitleWrap: {
    color: "#2e8eec",
    fontWeight: "bold",
    flex: 1,
    fontSize: "23px",
    textAlign: "center",
  },
}));

function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("emp_token");
  const [showEmpMenu, setShowEmpMenu] = useState(false);
  const openEmpMenu = Boolean(showEmpMenu);
  const handleMenuClick = (event) => {
    setShowEmpMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setShowEmpMenu(null);
  };

  //ON LOGOUT CLICK
  const onLogoutClick = () => {
    localStorage.removeItem("emp_token");
    navigate("/");
  };

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Typography className={classes.headTitleWrap}>Hack Ideas</Typography>
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
        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
      </Menu>
    </Toolbar>
  );
}

export default React.memo(Header);
