const farms = {
  "0x674A71E69fe8D5cCff6fdcF9F1Fa4262Aa14b154": {
    farmId: 7,
    allocPoint: 237920395,
  },
  "0x437E444365aD9ed788e8f255c908bceAd5AEA645": {
    farmId: 8,
    allocPoint: 26657186,
  },
  "0x80F712670d268cf2C05e7162674c7466c940eBE3": {
    farmId: 0,
    allocPoint: 25093564,
  },
  "0x24f011f12Ea45AfaDb1D4245bA15dCAB38B43D13": {
    farmId: 1,
    allocPoint: 243043661,
  },
  "0x4fF52e9D7824EC9b4e0189F11B5aA0F02b459b03": {
    farmId: 2,
    allocPoint: 14875963,
  },
  "0x1EE39F93450d80981c169E59C8A641a3bC853A09": {
    farmId: 3,
    allocPoint: 5510936,
  },
  "0x41075d2Ea8BEF1CAfb24D9Bd2061b620cbc05B60": {
    farmId: 6,
    allocPoint: 6282703,
  },
  "0xc47B0B4B51EE06De0daF02517D78f0473B776633": {
    farmId: 9,
    allocPoint: 77570410,
  },
  "0xD6EcaDB40b35D17f739Ec27285759d0ca119e3A1": {
    farmId: 10,
    allocPoint: 27633378,
  },
  "0xCFcBC90e617a3996355761b52dF2830B7b6718d0": {
    farmId: 12,
    allocPoint: 9128453,
  },
  "0xf9D33ABfaF59fd19077f44399A8971621Cd2eA55": {
    farmId: 13,
    allocPoint: 5095820,
  },
  "0xbE48dC2353a460668A5D859C66e4472661581998": {
    farmId: 15,
    allocPoint: 12964068,
  },
  "0x24615e918AD078900BfE13F4cd26876Bae64dD75": {
    farmId: 18,
    allocPoint: 11887857,
  },
  "0xa331430473ABA2337698fD95a7c2fCf376DEbFb1": {
    farmId: 19,
    allocPoint: 5275048,
  },
  "0x0663B29E3CAa8F2DB0313eA8B3E942a0431429cf": {
    farmId: 23,
    allocPoint: 4818246,
  },
  "0x64c379ab93b859AdA71b8AbACA77BeD104a5DbCa": {
    farmId: 27,
    allocPoint: 30605515,
  },
  "0x8221D04A71FcD0Dd3d096cB3B49E22918095933F": {
    farmId: 30,
    allocPoint: 17930897,
  },
  "0x5775D98022590dc60E9c4Ae0a1c56bF1fD8fcaDC": {
    farmId: 31,
    allocPoint: 40393879,
  },
  "0xB02A135992478a485D9DD771092CdD8B4487594A": {
    farmId: 33,
    allocPoint: 20467117,
  },
  "0xE75Ec02F28bC0E1ca1794FbFFe8229ac1662075E": {
    farmId: 34,
    allocPoint: 7160695,
  },
  "0x99057a0cb475d1c4d950d552e77e9e68cddb8261": {
    farmId: 35,
    allocPoint: 32129423,
  },
  "0x1f354956de4a7ed71308225de94a27b35a84ea57": {
    farmId: 36,
    allocPoint: 12674312,
  },
  "0xbe8c7c35103c443844ef234cffd73a491df6f503": {
    farmId: 37,
    allocPoint: 28877513,
  },
  "0x49f8c72fca1f6f62411da1aa451c479e1324eb8f": {
    farmId: 39,
    allocPoint: 21922370,
  },
  "0xea5038043364830c489d7fd8f95efe35eae6f4ff": {
    farmId: 40,
    allocPoint: 8511556,
  },
  "0x2ea9369daee963cebc0266ae8b98c3e015c59046": {
    farmId: 41,
    allocPoint: 24485367,
  },
  "0x800632afc31225813b06185ea8be8ed571820a50": {
    farmId: 42,
    allocPoint: 14061365,
  },
  "0x5e937a1e35e1d931febb70e2b061ed38c8e43336": {
    farmId: 43,
    allocPoint: 10922329,
  },
  "0x7e1b9f1e286160a80ab9b04d228c02583aef90b5": {
    farmId: 44,
    allocPoint: 10271271,
  },
  "0x4fd950b3ca45d6f40e5187706d3981ee955e06b4": {
    farmId: 45,
    allocPoint: 5828683,
  },
}

const lowercased = Object.fromEntries(
  Object.entries(farms).map(([k, v]) => [k.toLowerCase(), v])
);

export default lowercased;
