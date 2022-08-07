import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
//LOCAL IMPORTS
import { getDateFormat } from "../../Helpers/basic";

const useStyles = makeStyles((theme) => ({
  cardWrap: {
    marginTop: "20px",
    borderRadius: "10px",
    boxShadow:
      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
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
    marginBottom: "15px",
  },
  upvoteWrap: {
    fontSize: "18px",
    float: "right",
    color: "#2e8eec",
  },
  tagWrap: {
    marginRight: "20px",
  },
}));

function ChallengeCard(props) {
  const classes = useStyles();
  const { challenge } = props;

  const onUpvoteClick = (id) => {
    props.onUpvoteclick(id);
  };

  return (
    <Card className={classes.cardWrap}>
      <CardContent sx={{ flex: 1 }}>
        <Typography className={classes.titleWrap}>
          {`${challenge && challenge.id}. ${
            challenge && challenge.title ? challenge.title : "NA"
          }`}
        </Typography>
        <Typography className={classes.dateWrap}>
          {challenge && challenge.created_date
            ? getDateFormat(challenge.created_date)
            : "NA"}
        </Typography>
        <Typography className={classes.descWrap}>
          {challenge && challenge.description ? challenge.description : "NA"}
        </Typography>
        {challenge &&
        challenge.challenge_tags &&
        challenge.challenge_tags.length ? (
          <React.Fragment>
            {challenge.challenge_tags.map((tag, index) => {
              return (
                <span key={index} className={classes.tagWrap}>{`#${
                  tag && tag.title
                }`}</span>
              );
            })}
          </React.Fragment>
        ) : null}
        <Tooltip title="Upvote">
          <IconButton
            className={classes.upvoteWrap}
            onClick={() => {
              onUpvoteClick(challenge.id);
            }}
          >
            <i className="fa fa-chevron-up fa-1" aria-hidden="true">
              <div>{challenge.upvotes}</div>
            </i>
          </IconButton>
        </Tooltip>
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
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ChallengeCard;
