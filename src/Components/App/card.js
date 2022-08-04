import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardWrap: {
    marginTop: "20px",
  },
  titleWrap: {
    color: "#2e8eec",
    fontSize: "20px",
    fontWeight: "bold",
  },
  dateWrap: {
    fontSize: "16px",
    color: "#707070",
  },
  descWrap: {
    fontSize: "15px",
    marginTop: "10px",
    color: "#707070",
  },
}));

function ChallengeCard(props) {
  const classes = useStyles();
  const { challenge } = props;

  const getDateFormat = (date) => {
    console.log(date);
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formatedDate = new Date(date).toLocaleDateString("en-US", options);
    return formatedDate;
  };

  return (
    <Card className={classes.cardWrap}>
      <CardContent sx={{ flex: 1 }}>
        <Typography className={classes.titleWrap}>
          {challenge && challenge.title ? challenge.title : "NA"}
        </Typography>
        <Typography className={classes.dateWrap}>
          {challenge && challenge.created_date
            ? getDateFormat(challenge.created_date)
            : "NA"}
        </Typography>
        <Typography className={classes.descWrap}>
          {challenge && challenge.description ? challenge.description : "NA"}
        </Typography>
      </CardContent>
    </Card>
  );
}

ChallengeCard.propTypes = {
  challenge: PropTypes.shape({
    created_date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    challenge_tags: PropTypes.array.isRequired,
  }).isRequired,
};

export default ChallengeCard;
