import { Box, Divider, Typography } from "@material-ui/core";
import { formatCurrency, formatDecimal } from "app/core";

import timelockFarms from "../core/timelockFarms";
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
  gained: {
    color: theme.palette.positive.main,
  },
}));

export default function UpcomingTimelockPoolTable({ pairs, ...rest }) {
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
        allocChangePercent: timelockFarms.hasOwnProperty(pair.id)
          ? ((pair.allocation - timelockFarms[pair.id].allocPoint) / timelockFarms[pair.id].allocPoint) * 100
          : 0, // new farm
      };
    });

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
            key: "allocation",
            label: "Allocation",
            render: (row) => (
              <Typography variant="subtitle2" noWrap>
                <Percent
                  percent={Number(row.allocation / 10000000).toFixed(2)}
                  display="inline"
                />
                {' '} / {' '}
                {formatDecimal(row.allocation / 1000000000 * 1568400)} MIST per day
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


