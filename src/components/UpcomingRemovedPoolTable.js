import { Box, Divider, Typography } from "@material-ui/core";
import { formatCurrency, formatDecimal } from "app/core";

import Link from "./Link";
import { PAIR_DENY } from "app/core/constants";
import PairIcon from "./PairIcon";
import Percent from "./Percent";
import React from "react";
import SortableTable from "./SortableTable";
import TokenIcon from "./TokenIcon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  lost: {
    color: theme.palette.negative.main,
  },
}));

export default function UpcomingRemovedPoolTable({ pairs, ...rest }) {
  const classes = useStyles();

  const rows = pairs
    .filter((row) => {
      return !PAIR_DENY.includes(row.id);
    })
    .map((pair, idx) => {
      return {
        ...pair,
        idx,
        displayName: `${pair.token0.symbol.replace(
          "WBCH",
          "BCH"
        )}-${pair.token1.symbol.replace("WBCH", "BCH")}`,
      };
    });

  return (
    <div className={classes.root}>
      <SortableTable
        title="Pairs which are predicted to not remain Pools"
        orderBy="allocLoss"
        order="asc"
        columns={[
          // {
          //   key: "id",
          //   label: "#",
          // },
          {
            key: "displayName",
            label: "Name",
            render: (row, index) => {
              return (
                <Box display="flex" alignItems="center">
                  <PairIcon
                    base={row.token0.id}
                    quote={row.token1.id}
                  />
                  <Link href={`/pairs/${row.id}`} variant="body2" noWrap>
                    {row.displayName}
                  </Link>
                </Box>
              );
            },
          },
          {
            key: "allocLoss",
            label: "Allocation Loss",
            render: (row) => (
              <Typography variant="subtitle2" noWrap>
                <Percent
                  className={classes.lost}
                  percent={Number(row.allocLoss).toFixed(2)}
                  display="inline"
                />
              </Typography>
            )
          },
        ]}
        rows={rows}
        {...rest}
      />
    </div>
  );
}

