import axios from "axios";

export const fetchChallengesList = (
  payload,
  successCallBack,
  failureCallBack
) => {
  const url = "https://run.mocky.io/v3/8898d851-22f8-4111-af3d-dac46af3c68a";
  axios
    .get(url, payload)
    .then(function (response) {
      successCallBack(response.data);
    })
    .catch(function (error) {
      failureCallBack(error);
    });
};
