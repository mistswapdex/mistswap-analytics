const farms = {
  "0x674A71E69fe8D5cCff6fdcF9F1Fa4262Aa14b154": {
    farmId: 7,
    allocPoint: 300000000,
  },
  "0x437E444365aD9ed788e8f255c908bceAd5AEA645": {
    farmId: 8,
    allocPoint: 8239379,
  },
  "0x80F712670d268cf2C05e7162674c7466c940eBE3": {
    farmId: 0,
    allocPoint: 3966976,
  },
  "0x24f011f12Ea45AfaDb1D4245bA15dCAB38B43D13": {
    farmId: 1,
    allocPoint: 303886746,
  },
  "0x4fF52e9D7824EC9b4e0189F11B5aA0F02b459b03": {
    farmId: 2,
    allocPoint: 4713203,
  },
  "0x287a276401caDBe50d5C0398137490E6d45830Dd": {
    farmId: 5,
    allocPoint: 2705770,
  },
  "0x41075d2Ea8BEF1CAfb24D9Bd2061b620cbc05B60": {
    farmId: 6,
    allocPoint: 3532617,
  },
  "0xc47B0B4B51EE06De0daF02517D78f0473B776633": {
    farmId: 9,
    allocPoint: 10671829,
  },
  "0xD6EcaDB40b35D17f739Ec27285759d0ca119e3A1": {
    farmId: 10,
    allocPoint: 3025947,
  },
  "0xCabdb1321CEAb169935a0c9d4c856250766C3df7": {
    farmId: 14,
    allocPoint: 21359862,
  },
  "0x24615e918AD078900BfE13F4cd26876Bae64dD75": {
    farmId: 18,
    allocPoint: 6019927,
  },
  "0x0663B29E3CAa8F2DB0313eA8B3E942a0431429cf": {
    farmId: 23,
    allocPoint: 3330164,
  },
  "0x64c379ab93b859AdA71b8AbACA77BeD104a5DbCa": {
    farmId: 27,
    allocPoint: 45423022,
  },
  "0x5775D98022590dc60E9c4Ae0a1c56bF1fD8fcaDC": {
    farmId: 31,
    allocPoint: 2494058,
  },
  "0x20943aD7855bdE06Dd41BB89C9D2efE05DB329EC": {
    farmId: 32,
    allocPoint: 119130270,
  },
  "0xE75Ec02F28bC0E1ca1794FbFFe8229ac1662075E": {
    farmId: 34,
    allocPoint: 11140809,
  },
  "0x99057a0cb475d1c4d950d552e77e9e68cddb8261": {
    farmId: 35,
    allocPoint: 4710210,
  },
  "0xbe8c7c35103c443844ef234cffd73a491df6f503": {
    farmId: 37,
    allocPoint: 11439840,
  },
  "0x49f8c72fca1f6f62411da1aa451c479e1324eb8f": {
    farmId: 39,
    allocPoint: 26250344,
  },
  "0xea5038043364830c489d7fd8f95efe35eae6f4ff": {
    farmId: 40,
    allocPoint: 2843160,
  },
  "0x2ea9369daee963cebc0266ae8b98c3e015c59046": {
    farmId: 41,
    allocPoint: 21696256,
  },
  "0x7e1b9f1e286160a80ab9b04d228c02583aef90b5": {
    farmId: 44,
    allocPoint: 7459511,
  },
  "0xc20a4f3012ba2df47544d4926b19604fa777fb01": {
    farmId: 46,
    allocPoint: 9785667,
  },
  "0x1d5a7bea34ee984d54af6ff355a1cb54c29eb546": {
    farmId: 47,
    allocPoint: 18087370,
  },
  "0xe1b5bc09427710bc4d886ec49654944110b58134": {
    farmId: 48,
    allocPoint: 9156623,
  },
  "0x0151b25a5acf7f2f31bb2ab4358c9fa894db2cb2": {
    farmId: 51,
    allocPoint: 6377636,
  },
  "0x7f3f57c92681c9a132660c468f9cdff456fc3fd7": {
    farmId: 52,
    allocPoint: 20529375,
  },
  "0xa993067343719c4e43de972f3f86513478cbb3cd": {
    farmId: 53,
    allocPoint: 5107580,
  },
  "0xdeb684aa667564a0fedfce9d444dee209b7e4e4a": {
    farmId: 54,
    allocPoint: 3976135,
  },
  "0x86b0fd64234a747681f0235b6cc5fe04a4d95b31": {
    farmId: 55,
    allocPoint: 2939698,
  },
}

const lowercased = Object.fromEntries(
  Object.entries(farms).map(([k, v]) => [k.toLowerCase(), v])
);

export default lowercased;
