export const getLoggedInStatus = () => {
  let empToken = localStorage.getItem("emp_token");
  if (empToken) {
    return true;
  } else {
    return false;
  }
};
