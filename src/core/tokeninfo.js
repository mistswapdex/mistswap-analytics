export const TokenInfo = {
  "COPY_THIS_AND_REPLACE_WITH_LOWERCASE_CONTRACT_ADDRESS": {
    description: 'Copy this entire section and add to end of list, keeping the trailing comma. Any unused fields may be set to null. Do not leave any example values.',
    discord: 'tokenchat',
    docs: 'https://docs.token.com',
    github: 'tokendev',
    gitlab: 'tokendev',
    telegram: 'tokenchat',
    twitter: 'token_news',
    website: 'https://token.com',
    whitepaper: 'https://token.com/whitepaper.pdf',
  },
  "0x5fa664f69c2a4a3ec94fac3cbf7049bd9ca73129": {
    description: 'Mist is the native token of the MistSwap protocol.',
    discord: 'mistswapdex',
    docs: 'https://docs.mistswap.fi',
    github: 'mistswapdex',
    gitlab: null,
    telegram: 'MistSwapOfficial',
    twitter: 'mistswapdex',
    website: 'https://mistswap.fi',
    whitepaper: null,
  },
  "0x3743ec0673453e5009310c727ba4eaf7b3a1cc04": {
    description: 'Wrapped BCH is an utility token allowing to swap BCH with other SEP20 compatible tokens.',
    discord: null,
    docs: null,
    github: null,
    gitlab: null,
    telegram: null,
    twitter: null,
    website: null,
    whitepaper: null,
  },
}

export function fetchTokenInfo() {
  return fetch(`https://raw.githubusercontent.com/MarketCap-Cash/SmartBCH-Token-List/main/tokens.json`)
    .then((res) => res.json())
    .then((data) => {
      let info = { ...TokenInfo }

      for (let [key, value] of Object.entries(data)) {
        value.address = (value.address || "").toLowerCase()
        if (info[value.address])
          continue;

        info[value.address] = {
          name: value.name,
          description: value.desc,
          address: value.address,
          symbol: value.symbol,
          telegram: value.telegram,
          twitter: value.twitter,
          discord: value.discord,
          website: (value.websites || [])[0],
          whitepaper: value.whitepaper
        }
      }

      return info
  })
}