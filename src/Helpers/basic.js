//FOR GETTING THE LOGGED IN STATUS OF USER
export const getLoggedInStatus = () => {
  let empToken = localStorage.getItem("emp_token");
  if (empToken) {
    return true;
  } else {
    return false;
  }
};

//FOR FORMATTING THE DATE
export const getDateFormat = (date) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatedDate = new Date(date).toLocaleDateString("en-US", options);
  return formatedDate;
};
