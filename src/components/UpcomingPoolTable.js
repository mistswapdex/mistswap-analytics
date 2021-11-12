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

  let rows = pairs
    .filter((row) => {
      return !PAIR_DENY.includes(row.id);
    })
    .map((pair) => {
      return {
        ...pair,
        displayName: `${pair.token0.symbol.replace(
          "WBCH",
          "BCH"
        )}-${pair.token1.symbol.replace("WBCH", "BCH")}`,
      };
    });
  rows = rows.sort((a, b) => b.allocation - a.allocation);

  return (
    <div className={classes.root}>
      <SortableTable
        title="Pools"
        // orderBy={orderBy}
        // order={order}
        columns={[
          // {
          //   key: "id",
          //   label: "#",
          // },
          {
            key: "name",
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
            key: "newAllocation",
            label: "Allocation",
            render: (row) => (
              <Typography variant="subtitle2" noWrap>
                <Percent
                  percent={Number(row.allocation / 10000000).toFixed(2)}
                  display="inline"
                />
              </Typography>
            )
          },
          {
            key: "volume",
            label: "Volume",
            render: (row) => formatCurrency(row.untrackedVolumeUSD),
          },
          {
            key: "volatility",
            label: "Volatility",
            render: (row) => formatDecimal(row.volatility),
          },
        ]}
        rows={rows}
        {...rest}
      />
    </div>
  );
}

