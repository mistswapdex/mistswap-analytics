import getConfig from 'next/config';
import React, { useEffect, useState } from 'react'
const { serverRuntimeConfig } = getConfig();
import {
  AppShell,
  AreaChart,
  BarChart,
  BasicTable,
  KPI,
  Link,
  PageHeader,
  PairTable,
  Percent,
  TokenIcon,
  TokenDetail,
  Transactions,
} from "app/components";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import {
  formatCurrency,
  ethPriceQuery,
  getApollo,
  getOneDayBlock,
  getOneDayEthPrice,
  getToken,
  getTokenPairs,
  oneDayEthPriceQuery,
  sevenDayEthPriceQuery,
  tokenDayDatasQuery,
  tokenIdsQuery,
  tokenPairsQuery,
  tokenQuery,
  transactionsQuery,
  useInterval,
  TokenInfo,
  fetchTokenInfo,
  formatPrice,
} from "app/core";

import Head from "next/head";
import { ParentSize } from "@visx/responsive";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { toChecksumAddress } from 'web3-utils';

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    flexDirection: "column",
    // marginBottom: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: 0,
      "& > div:first-of-type": {
        marginRight: theme.spacing(1),
      },
    },
  },
  links: {
    "& > a:first-of-type": {
      marginRight: theme.spacing(4),
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  price: {
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up("sm")]: {
      margin: 0,
    },
  },
}));

function TokenPage() {
  const router = useRouter();

  if (router.isFallback) {
    return <AppShell />;
  }

  const classes = useStyles();

  const [tokens, setTokens] = useState({...TokenInfo})

  useEffect(() => {
    const fetchData = async () => {
      const tokens = await fetchTokenInfo()
      setTokens(tokens)
    }
    fetchData()
  }, [])

  const id = router.query.id.toLowerCase();

  const {
    data: { token },
  } = useQuery(tokenQuery, {
    variables: { id },
  });

  const {
    data: { bundles },
  } = useQuery(ethPriceQuery, {
    pollInterval: 60000,
  });

  const { data: oneDayEthPriceData } = useQuery(oneDayEthPriceQuery);

  useInterval(async () => {
    await getToken(id);
    await getOneDayEthPrice();
  }, 60000);

  const {
    data: { tokenDayDatas },
  } = useQuery(tokenDayDatasQuery, {
    variables: {
      tokens: [id],
    },
    pollInterval: 60000,
  });

  const {
    data: { pairs0, pairs1 },
  } = useQuery(tokenPairsQuery, {
    variables: { id },
  });

  const pairs = [...pairs0, ...pairs1];

  const { data: transactions } = useQuery(transactionsQuery, {
    variables: {
      pairAddresses: pairs.map((pair) => pair.id).sort(),
    },
    pollInterval: 60000,
  });

  const chartDatas = tokenDayDatas.reduce(
    (previousValue, currentValue) => {
      previousValue["liquidity"].unshift({
        date: currentValue.date,
        value: parseFloat(currentValue.liquidityUSD),
      });
      previousValue["volume"].unshift({
        date: currentValue.date,
        value: parseFloat(currentValue.volumeUSD),
      });
      previousValue["price"].unshift({
        date: currentValue.date,
        value: parseFloat(currentValue.priceUSD),
      });
      return previousValue;
    },
    { liquidity: [], volume: [], price: [] }
  );

  const totalLiquidityUSD =
    parseFloat(token?.liquidity) *
    parseFloat(token?.derivedETH) *
    parseFloat(bundles[0].ethPrice);

  const totalLiquidityUSDYesterday =
    parseFloat(token.oneDay?.liquidity) *
    parseFloat(token.oneDay?.derivedETH) *
    parseFloat(oneDayEthPriceData?.ethPrice);

  const price = parseFloat(token?.derivedETH) * parseFloat(bundles[0].ethPrice);

  const priceYesterday =
    parseFloat(token.oneDay?.derivedETH) *
    parseFloat(oneDayEthPriceData?.ethPrice);

  const priceChange = ((price - priceYesterday) / priceYesterday) * 100;

  const volume = token?.volumeUSD - token?.oneDay?.volumeUSD;
  const volumeYesterday = token?.oneDay?.volumeUSD - token?.twoDay?.volumeUSD;

  const txCount = token?.txCount - token?.oneDay?.txCount;
  const txCountYesterday = token?.oneDay?.txCount - token?.twoDay?.txCount;

  const fees = volume * 0.003;
  const feesYesterday = volumeYesterday * 0.003;

  return (
    <AppShell>
      <Head>
        <title>
          {formatPrice(price || 0)} | {token.symbol} | MistSwap
          Analytics
        </title>
      </Head>
      <PageHeader>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm="auto" className={classes.title}>
            <Box display="flex" alignItems="center">
              <TokenIcon id={token.id} />
              <Typography variant="h5" component="h1" noWrap>
                {token.name} ({token.symbol}){" "}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" className={classes.price}>
              <Typography variant="h6" component="div">
                {formatPrice(price || 0)}
              </Typography>
              <Percent percent={priceChange} ml={1} />
            </Box>
          </Grid>
          <Grid item xs={12} sm="auto" className={classes.links}>
            <Link
              href={`https://app.mistswap.fi/#/add/${token.id}/ETH`}
              target="_blank"
              variant="body1"
            >
              Add Liquidity
            </Link>
            <Link
              href={`https://app.mistswap.fi/#/swap?inputCurrency=${token.id}`}
              target="_blank"
              variant="body1"
            >
              Trade
            </Link>
          </Grid>
        </Grid>
      </PageHeader>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Paper
            variant="outlined"
            style={{ height: 300, position: "relative" }}
          >
            <ParentSize>
              {({ width, height }) => (
                <AreaChart
                  title="Price"
                  data={chartDatas.price}
                  width={width}
                  height={height}
                  margin={{ top: 125, right: 0, bottom: 0, left: 0 }}
                  tooltipDisabled
                  overlayEnabled
                  priceFormat
                />
              )}
            </ParentSize>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper
            variant="outlined"
            style={{ height: 300, position: "relative" }}
          >
            <ParentSize>
              {({ width, height }) => (
                <AreaChart
                  title="Liquidity"
                  data={chartDatas.liquidity}
                  width={width}
                  height={height}
                  margin={{ top: 125, right: 0, bottom: 0, left: 0 }}
                  tooltipDisabled
                  overlayEnabled
                />
              )}
            </ParentSize>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper
            variant="outlined"
            style={{ height: 300, position: "relative" }}
          >
            <ParentSize>
              {({ width, height }) => (
                <BarChart
                  title="Volume"
                  data={chartDatas.volume}
                  width={width}
                  height={height}
                  margin={{ top: 125, right: 0, bottom: 0, left: 0 }}
                  tooltipDisabled
                  overlayEnabled
                />
              )}
            </ParentSize>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Grid item xs={12} md={12}>
            <KPI
              title="Price (24h)"
              value={formatPrice(price || 0)}
              difference={priceChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <KPI
              title="Liquidity (24h)"
              value={formatCurrency(totalLiquidityUSD || 0)}
              difference={
                ((totalLiquidityUSD - totalLiquidityUSDYesterday) /
                  totalLiquidityUSDYesterday) *
                100
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <KPI
              title="Volume (24h)"
              value={formatCurrency(volume || 0)}
              difference={((volume - volumeYesterday) / volumeYesterday) * 100}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <KPI
              title="Fees (24h)"
              value={formatCurrency(fees)}
              difference={((fees - feesYesterday) / feesYesterday) * 100}
            />
          </Grid>
        </Grid>
      </Grid>

      <Box my={4}>
        <BasicTable
          title="Information"
          headCells={[
            { key: "name", label: "Name" },
            { key: "symbol", label: "Symbol" },
            { key: "address", label: "Address" },
            { key: "sonar", label: "Sonar", align: "right" },
          ]}
          bodyCells={[
            token.name,
            token.symbol,
            toChecksumAddress(token.id),
            <Link href={`https://sonar.cash/address/${token.id}`}>View</Link>,
          ]}
        />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={12}>
            <Grid item xs={12} md={12}>
              <TokenDetail
                title="Description"
                value={
                  (tokens[token.id] || {})['description']
                    ? tokens[token.id]['description']
                    : (
                      <div>
                        No description exists yet for this token. Please go 
                        <Link
                          href={`https://github.com/mistswapdex/mistswap-analytics`}
                          target="_blank"
                          variant="body1"
                        >
                        {' '}here{' '}
                        </Link>
                        to update information about a token.
                      </div>
                    )
                }
              />
            </Grid>
            { tokens[token.id] && tokens[token.id].discord && (
              <Grid item xs={12} md={12}>
                <TokenDetail
                  title="Discord"
                  value=<Link
                    href={tokens[token.id]['discord']}
                    target="_blank"
                    variant="body1"
                  >
                    { tokens[token.id]['discord'] }
                  </Link>
                />
              </Grid>
            ) }
            { tokens[token.id] && tokens[token.id].telegram && (
              <Grid item xs={12} md={12}>
                <TokenDetail
                  title="Telegram"
                  value=<Link
                    href={tokens[token.id]['telegram']}
                    target="_blank"
                    variant="body1"
                  >
                    { tokens[token.id]['telegram'] }
                  </Link>
                />
              </Grid>
            ) }
            { tokens[token.id] && tokens[token.id].twitter && (
              <Grid item xs={12} md={12}>
                <TokenDetail
                  title="Twitter"
                  value=<Link
                    href={tokens[token.id]['twitter']}
                    target="_blank"
                    variant="body1"
                  >
                    { tokens[token.id]['twitter'] }
                  </Link>
                />
              </Grid>
            ) }
            { tokens[token.id] && tokens[token.id].website && (
              <Grid item xs={12} md={12}>
                <TokenDetail
                  title="Website"
                  value=<Link
                    href={tokens[token.id]['website']}
                    target="_blank"
                    variant="body1"
                  >
                    { tokens[token.id]['website'] }
                  </Link>
                />
              </Grid>
            ) }
            { tokens[token.id] && tokens[token.id].docs && (
              <Grid item xs={12} md={12}>
                <TokenDetail
                  title="Docs"
                  value=<Link
                    href={tokens[token.id]['docs']}
                    target="_blank"
                    variant="body1"
                  >
                    { tokens[token.id]['docs'] }
                  </Link>
                />
              </Grid>
            ) }
            { tokens[token.id] && tokens[token.id].whitepaper && (
              <Grid item xs={12} md={12}>
                <TokenDetail
                  title="White Paper"
                  value=<Link
                    href={tokens[token.id]['whitepaper']}
                    target="_blank"
                    variant="body1"
                  >
                    { tokens[token.id]['whitepaper'] }
                  </Link>
                />
              </Grid>
            ) }
            { tokens[token.id] && tokens[token.id].github && (
              <Grid item xs={12} md={12}>
                <TokenDetail
                  title="Github"
                  value=<Link
                    href={tokens[token.id]['github']}
                    target="_blank"
                    variant="body1"
                  >
                    { tokens[token.id]['github'] }
                  </Link>
                />
              </Grid>
            ) }
            { tokens[token.id] && tokens[token.id].gitlab && (
              <Grid item xs={12} md={12}>
                <TokenDetail
                  title="Github"
                  value=<Link
                    href={tokens[token.id]['gitlab']}
                    target="_blank"
                    variant="body1"
                  >
                    { tokens[token.id]['gitlab'] }
                  </Link>
                />
              </Grid>
            ) }
          </Grid>
        </Grid>
      </Box>

      <PairTable title="Pairs" pairs={pairs} />

      <Transactions transactions={transactions} txCount={token.txCount} />
    </AppShell>
  );
}

export async function getStaticProps({ params }) {
  const client = getApollo();

  const id = params.id.toLowerCase();

  await client.query({
    query: ethPriceQuery,
  });

  await getToken(id, client);

  await client.query({
    query: tokenDayDatasQuery,
    variables: {
      tokens: [id],
    },
  });

  const { pairs0, pairs1 } = await getTokenPairs(id, client);

  const pairAddresses = [
    ...pairs0.map((pair) => pair.id),
    ...pairs1.map((pair) => pair.id),
  ].sort();

  // Transactions
  await client.query({
    query: transactionsQuery,
    variables: {
      pairAddresses,
    },
  });

  await getOneDayEthPrice(client);

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
    revalidate: serverRuntimeConfig.revalidateTime,
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  // const apollo = getApollo();

  // const { data } = await apollo.query({
  //   query: tokenIdsQuery,
  // });

  // const paths = data.tokens.map(({ id }) => ({
  //   params: { id },
  // }));

  return { paths: [], fallback: true };
}

export default TokenPage;
