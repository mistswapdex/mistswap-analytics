import { AppShell, UpcomingPoolTable } from "app/components";
import {
  getApollo,
  getPairs,
  getPools,
  pairsQuery,
  useInterval,
} from "app/core";
import { FIRST_REWEIGHT_TIME, REWEIGHTING_PERIOD } from "app/core/constants";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

function UpcomingPoolsPage() {
  const {
    data: { pairs },
  } = useQuery(pairsQuery);
  useInterval(() => Promise.all([getPools]), 60000);

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
        <title>Upcoming Pools | MISTswap Analytics</title>
      </Head>
      <UpcomingPoolTable
        title={title}
        pairs={pairs}
        orderBy="timestamp"
        order="desc"
        rowsPerPage={30}
      />
    </AppShell>
  );
}

export async function getStaticProps() {
  const client = getApollo();
  await getPairs(client);
  await getPools(client);
  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
    revalidate: 1,
  };
}

export default UpcomingPoolsPage;
