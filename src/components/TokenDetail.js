import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";

import React from "react";
import clsx from "clsx";
import { formatCurrency, TokenInfo } from "app/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    // textAlign: "center",
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  title: {
    fontWeight: 500,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

function TokenDetail({
  className,
  title = "",
  value = "",
  format = "none",
  ...rest
}) {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          gutterBottom
          noWrap
          className={classes.title}
        >
          { title }
        </Typography>
        <div className={classes.content}>
          { value }
        </div>
      </CardContent>
    </Card>
  );
}

export default TokenDetail;
