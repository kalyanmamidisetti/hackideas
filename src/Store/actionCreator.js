import axios from "axios";

export const fetchChallengesList = (
  payload,
  successCallBack,
  failureCallBack
) => {
  const url =
    "https://62ebf76555d2bd170e7a42a0.mockapi.io/hackideas/challenges";
  axios
    .get(url, payload)
    .then(function (response) {
      successCallBack(response.data);
    })
    .catch(function (error) {
      failureCallBack(error);
    });
};
