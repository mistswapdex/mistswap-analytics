import {
  AppShell,
  UpcomingPoolTable,
  AlmostUpcomingPoolTable,
  UpcomingRemovedPoolTable
} from "app/components";
import {
  getApollo,
  getUpcomingFarmPairs,
  farmReweightingPairsQuery,
  formatCurrency,
  useInterval,
} from "app/core";
import { FIRST_REWEIGHT_TIME, REWEIGHTING_PERIOD } from "app/core/constants";
import currentFarms from "../../core/currentFarms";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

function UpcomingPoolsPage() {
  const {
    data
  } = useQuery(farmReweightingPairsQuery);

  console.log('pre-processed pairs', data.pairs)

  const FARM_COUNT = 30;

  const pairs1 = [...data.pairs]
    // remove pairs containing naughty tokens
    .filter((v) => {
      const blacklist = {
        "0x124559e3b63a89125cab76ca2add07a335f89d57": "", // FRDG
        "0x84e3ae3135d79536e032ee36dacc15e676400638": "", // PSN
        "0x8803805547b4b7dd1e4d9492a43bf6418447fcb0": "", // LZD
        "0x654adbec36ae3b61255368af2fbaf6302a18fcb5": "", // Akita
      };
      return ! (blacklist.hasOwnProperty(v.token0.id) || blacklist.hasOwnProperty(v.token1.id));
    })
    // sort pairs by volume
    .map((v) => ({
      ...v,
      accVolume: v.dayData.reduce((a, v) => a+Number.parseFloat(v.volumeUSD), 0),
    }))
    .sort((a, b) => b.accVolume - a.accVolume)
    // remove pairs without sufficient dayData
    .filter((v) => v.dayData.length >= 2)
    // fix for pairs with limited dayData
    .map((v) => {
      if (v.dayData.length === 2) {
        return {
          ...v,
          dayData: [
            v.dayData[0],
            v.dayData[0],
            v.dayData[1],
            v.dayData[1],
          ],
        }
      }
      return v;
    })

  const pairs2 = pairs1
    // we choose top 30 by volume pairs
    .slice(0, FARM_COUNT)
    // calculate volatility of each pair
    .map((v) => {
      // TODO maybe we should multiply reserves by tokens price in usd?
      const priceClose = v.dayData.map((k) => {
        return Number.parseFloat(k.reserve0) / Number.parseFloat(k.reserve1);
      });

      const logReturns = priceClose.slice(1).map((k, i) => k / priceClose[i]);

      function standardDeviation(a) {
       const m = a.reduce((a, v) => a + v, 0) / a.length
       return (a.map(x => (x - m) ** 2).reduce((a, v) => a + v, 0) / a.length) ** 0.5;
      }

      const dayReturnsStd = standardDeviation(logReturns);
      const volatility = (dayReturnsStd * 365) ** 0.5;

      return {
        ...v,
        volatility,
      };
    });

  const pairs3 = pairs2.map((v) => {
    const preAllocation = v.accVolume * Math.log(v.volatility);

    return {
      ...v,
      preAllocation,
    };
  });

  const MIN_ALLOCATION = 0.0025;
  const allocationSum = pairs3.map((v) => v.preAllocation).reduce((a, v) => a+v, 0) + (MIN_ALLOCATION * FARM_COUNT);

  const pairs = pairs3.map((v) => {
    const allocation = Math.floor(1000000000 * (
      MIN_ALLOCATION + (v.preAllocation / allocationSum)) / (1 + (MIN_ALLOCATION * FARM_COUNT))
    );

    return {
      ...v,
      allocation,
    }
  });

  console.log('total: ', pairs.reduce((a, v) => a + v.allocation, 0))

  const almostPairs = pairs1.filter((v) => {
    for (let o of pairs) {
	  if (o.id === v.id) {
	    return false;
	  }
	}

	return true;
  })
  .slice(0, 10)
  .map((v) => ({
    ...v,
	reason: v.accVolume === 0
	  ? `Not enough liquidity (${formatCurrency(3000 - v.reserveUSD)} more)`
	  : v.dayData < 2
	    ? `Not enough liquidity (${formatCurrency(3000 - v.reserveUSD)} minimum) for a long enough time`
		: `Not enough volume (${formatCurrency(pairs[pairs.length - 1].accVolume - v.accVolume)} more)`,
  }));
  console.log('pairs', pairs)

  const removedPairs = Object.entries(currentFarms).filter(([k, v]) => {
    for (let o of pairs) {
	  if (o.id === k) {
	    return false;
	  }
	}

	return true;
  })
  .map(([k, v]) => ({
    ...([...data.pairs].find((o) => o.id === k)),
    allocLoss: (0 - v.allocPoint) / 1000000000 * 100,
  }))
  console.log(removedPairs, 'removedPairs')

  useInterval(() => Promise.all([getUpcomingFarmPairs]), 60000);

  function getTitle() {
    const timeUntilNextReweighting = REWEIGHTING_PERIOD - ((Date.now() - FIRST_REWEIGHT_TIME) % REWEIGHTING_PERIOD)

    const days = Math.floor(timeUntilNextReweighting / (24*60*60*1000));
    const hours = Math.floor((timeUntilNextReweighting % (24*60*60*1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeUntilNextReweighting % (60*60*1000)) / (60*1000));
    const seconds = Math.floor((timeUntilNextReweighting % (60*1000)) / (1000));

    return `Upcoming Pools (Reweighting in ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds)`;
  }

  const [ title, setTitle ] = useState(getTitle());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTitle(getTitle());
    }, 1000);
  });

  return (
    <AppShell>
      <Head>
        <title>Upcoming Pools | MistSwap Analytics</title>
      </Head>
      <UpcomingPoolTable
        title={title}
        pairs={pairs}
        orderBy="allocation"
        order="desc"
        rowsPerPage={FARM_COUNT}
      />
      <AlmostUpcomingPoolTable
        title="Pairs which are close to becoming Pools"
        pairs={almostPairs}
        rowsPerPage={30}
      />
      <UpcomingRemovedPoolTable
        title="Pairs which are predicted to not remain Pools"
        pairs={removedPairs}
        rowsPerPage={30}
      />
    </AppShell>
  );
}

export async function getStaticProps() {
  const client = getApollo();
  await getUpcomingFarmPairs(client);
  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
    revalidate: 1,
  };
}

export default UpcomingPoolsPage;
