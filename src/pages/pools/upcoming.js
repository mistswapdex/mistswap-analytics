import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import {
  AppShell,
  UpcomingPoolTable,
  UpcomingTimelockPoolTable,
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
import {
  FIRST_REWEIGHT_TIME,
  REWEIGHTING_PERIOD,
  TIMELOCK_PERIOD,
} from "app/core/constants";
import currentFarms from "../../core/currentFarms";
import timelockFarms from "../../core/timelockFarms";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

const showTimelock = false;

function UpcomingPoolsPage() {
  const {
    data
  } = useQuery(farmReweightingPairsQuery);

  console.log('pre-processed pairs', data.pairs)

  const FARM_COUNT = 30;

  let pairs = [];
  let almostPairs = [];
  let removedPairs = [];
  if (! showTimelock) {
    const pairs1 = [...data.pairs]
      // remove pairs containing naughty tokens
      .filter((v) => {
        const blacklist = {
          "0x124559e3b63a89125cab76ca2add07a335f89d57": "", // FRDG
          "0x84e3ae3135d79536e032ee36dacc15e676400638": "", // PSN
          "0x8803805547b4b7dd1e4d9492a43bf6418447fcb0": "", // LZD
          "0x654adbec36ae3b61255368af2fbaf6302a18fcb5": "", // Akita
          "0xb952907d7b55789209c32353269bab3f9316925b": "", // GEM
          "0xbd53a8febe9bdceaccefaa45dc714ba718151c6b": "", // FARM
          "0x2f0c5f437297f155492e711fc8d2d91f8735f255": "", // WEB
          "0x741746c2cf4117730d7f087e8492df595b4fd283": "", // DOGE
          "0x7ebeadb95724a006afaf2f1f051b13f4ebebf711": "", // KITTEN
          "0x8358758d3952a0146560f3584d3b219ed631e1ea": "", // CAO
          "0xe5643aaf41ed9e5a56c3d5d1a049b43ac69950b2": "", // BCHDAO
          "0x291361e2619cd0fbfd880be3c02926cfdd3c6a9f": "", // SUNCASHDAO
          "0x7b82a3b1417cd21e67f745917a80cc0f53277b8c": "", // EVE
          "0x4592b88618119e55e37ffcb28ede02bef6f3c5ba": "", // FRN
          "0xafacb0004a91267b58e720e13df570dc6863c854": "", // STO
          "0x0ce452619a3b3aa4b648760fac97e1896534bcad": "", // BCHTOWN
        };
        return ! (blacklist.hasOwnProperty(v.token0.id) || blacklist.hasOwnProperty(v.token1.id));
      })
      // sort pairs by volume
      .map((v) => ({
        ...v,
        accVolume: v.dayData.reduce((a, v) => a+Number.parseFloat(v.volumeUSD), 0),
      }))
      .sort((a, b) => b.accVolume - a.accVolume)
      // remove dayData with no volume
      .map((v) => ({
        ...v,
        dayData: v.dayData.filter((v) => v.volumeUSD !== '0'),
      }))
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

    const MISTBCHPAIRID = '0x674a71e69fe8d5ccff6fdcf9f1fa4262aa14b154';
    const MISTBCHPAIRALLOC = 300000000;

    const mistbchpair = pairs1
      .filter((v) => v.id === MISTBCHPAIRID)
      .map((v) => {
        // make same format as pairs2
        const volatility = 1;
        return {
          ...v,
          volatility,
        };
      });

    const pairs2 = pairs1
      // mist/bch is treated special
      .filter((v) => v.id !== MISTBCHPAIRID)
      // we choose top 30 by volume pairs (removing mist/bch as it is treated special)
      .slice(0, FARM_COUNT - 1)
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
      const preAllocation = v.accVolume * Math.log(Math.max(Math.E, v.volatility));

      return {
        ...v,
        preAllocation,
      };
    });

    const MIN_ALLOCATION = 0.0025;
    const allocationSum = pairs3.map((v) => v.preAllocation).reduce((a, v) => a+v, 0) + (MIN_ALLOCATION * (FARM_COUNT - 1));

    pairs = [
      ...mistbchpair.map((v) => {
        const allocation = MISTBCHPAIRALLOC; // mist/bch is set to 30%

        return {
          ...v,
          allocation,
        };
      }),
      ...pairs3.map((v) => {
        const allocation = Math.floor((1000000000 - MISTBCHPAIRALLOC) * (
          MIN_ALLOCATION + (v.preAllocation / allocationSum)) / (1 + (MIN_ALLOCATION * (FARM_COUNT - 1)))
        );

        return {
          ...v,
          allocation,
        };
      }),
    ];

    console.log('totalAlloc', pairs.reduce((a, v) => a+v.allocation, 0));

    almostPairs = pairs1.filter((v) => {
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

    removedPairs = Object.entries(currentFarms).filter(([k, v]) => {
      if (v.allocPoint == 0) {
        return false;
      }

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

    console.log(`update info`, {
      removedFarms: removedPairs.map((v) => ({
        id: v.id,
        pid: currentFarms[v.id].farmId,
      })),
      newFarms: pairs.filter((v) => ! currentFarms.hasOwnProperty(v.id)).map((v) => ({
        id: v.id,
        allocPoint: v.allocation,
      })),
      updateFarms: pairs.filter((v) => currentFarms.hasOwnProperty(v.id)).map((v) => ({
        id: v.id,
        pid: currentFarms[v.id].farmId,
        allocPoint: v.allocation,
      })),
    });
  }

  const timelockPairs = [...data.pairs]
    .filter((v) => {
      return timelockFarms.hasOwnProperty(v.id);
    })
    .map((v) => ({
      ...v,
      allocation: timelockFarms[v.id].allocPoint,
    }));


  useInterval(() => Promise.all([getUpcomingFarmPairs]), 60000);

  function getTitleForPools() {
    const timeUntil = (REWEIGHTING_PERIOD - (24*60*60*1000)) - ((Date.now() - FIRST_REWEIGHT_TIME) % REWEIGHTING_PERIOD)

    const days = Math.floor(timeUntil / (24*60*60*1000));
    const hours = Math.floor((timeUntil % (24*60*60*1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeUntil % (60*60*1000)) / (60*1000));
    const seconds = Math.floor((timeUntil % (60*1000)) / (1000));

    return `Upcoming Pools (Reweighting in ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds)`;
  }

  function getTitleForTimelockPools() {
    const timeUntil = ((1657983025+(30*60)) * 1000) - Date.now();

    const days = Math.floor(timeUntil / (24*60*60*1000));
    const hours = Math.floor((timeUntil % (24*60*60*1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeUntil % (60*60*1000)) / (60*1000));
    const seconds = Math.floor((timeUntil % (60*1000)) / (1000));

    return `Pools in Timelock (Farms go live in ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds)`;
  }

  const [ titleForPools, setTitleForPools ] = useState(getTitleForPools());
  const [ titleForTimelockPools, setTitleForTimelockPools ] = useState(getTitleForTimelockPools());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleForPools(getTitleForPools());
      setTitleForTimelockPools(getTitleForTimelockPools());
    }, 1000);
  });

  return (
    <AppShell>
      <Head>
        <title>Upcoming Pools | MistSwap Analytics</title>
      </Head>
      { showTimelock ? (
        <UpcomingTimelockPoolTable
          title={titleForTimelockPools}
          pairs={timelockPairs}
          orderBy="allocation"
          order="desc"
          rowsPerPage={FARM_COUNT}
        />
       ) : (
        <>
          <UpcomingPoolTable
            title={titleForPools}
            showTimelock={showTimelock}
            pairs={pairs}
            orderBy="allocation"
            order="desc"
            rowsPerPage={FARM_COUNT}
          />
          <AlmostUpcomingPoolTable
            title="Pairs which are close to being in pool selection"
            pairs={almostPairs}
            rowsPerPage={30}
          />
          <UpcomingRemovedPoolTable
            title="Current pools which are predicted to fall out of ranking"
            pairs={removedPairs}
            rowsPerPage={30}
          />
        </>
       ) }
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
    revalidate: serverRuntimeConfig.revalidateTime,
  };
}

export default UpcomingPoolsPage;
