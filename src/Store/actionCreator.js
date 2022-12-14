import axios from "axios";

//FOR USER LOGIN
export const logInAuth = (payload, successCallBack, failureCallBack) => {
  const url = "https://62ebf76555d2bd170e7a42a0.mockapi.io/hackideas/login";
  axios
    .post(url, payload)
    .then(function (response) {
      successCallBack(response.data);
    })
    .catch(function (error) {
      failureCallBack(error.response);
    });
};

//FOR FETCHING THE NEW CHALLENGES LISTING
export const fetchChallengesList = (
  payload,
  successCallBack,
  failureCallBack
) => {
  const url =
    "https://62ebf76555d2bd170e7a42a0.mockapi.io/hackideas/challenges";
  axios
    .get(url, {
      params: payload,
    })
    .then(function (response) {
      successCallBack(response.data);
    })
    .catch(function (error) {
      failureCallBack(error.response);
    });
};

//FOR ADDING NEW CHALLENGE
export const addNewChallenge = (payload, successCallBack, failureCallBack) => {
  const url =
    "https://62ebf76555d2bd170e7a42a0.mockapi.io/hackideas/challenges";
  axios
    .post(url, payload)
    .then(function (response) {
      successCallBack(response.data);
    })
    .catch(function (error) {
      failureCallBack(error);
    });
};
