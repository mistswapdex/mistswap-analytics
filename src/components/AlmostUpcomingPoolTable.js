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
}));

export default function UpcomingPoolTable({ pairs, ...rest }) {
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
        title="Almost Pools"
        // orderBy={orderBy}
        // order={order}
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
            key: "accVolume",
            label: "Volume",
            render: (row) => formatCurrency(row.accVolume),
          },
          {
            key: "reason",
            label: "Reason",
            render: (row) => row.reason,
          },
        ]}
        rows={rows}
        {...rest}
      />
    </div>
  );
}

