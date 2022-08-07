import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBarAlerts(props) {
  const snackBarData = props && props.data;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={snackBarData.show}
      autoHideDuration={2000}
      onClose={props.close}
    >
      <Alert severity={snackBarData.type} sx={{ width: "100%" }}>
        {snackBarData.message}
      </Alert>
    </Snackbar>
  );
}
export default SnackBarAlerts;
