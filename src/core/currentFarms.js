const farms = {
  "0x674A71E69fe8D5cCff6fdcF9F1Fa4262Aa14b154": {
    farmId: 7,
    allocPoint: 300000000,
  },
  "0x80F712670d268cf2C05e7162674c7466c940eBE3": {
    farmId: 0,
    allocPoint: 1958064,
  },
  "0x24f011f12Ea45AfaDb1D4245bA15dCAB38B43D13": {
    farmId: 1,
    allocPoint: 28717021,
  },
  "0xc47B0B4B51EE06De0daF02517D78f0473B776633": {
    farmId: 9,
    allocPoint: 3031440,
  },
  "0x24615e918AD078900BfE13F4cd26876Bae64dD75": {
    farmId: 18,
    allocPoint: 68260806,
  },
  "0x0663B29E3CAa8F2DB0313eA8B3E942a0431429cf": {
    farmId: 23,
    allocPoint: 1978264,
  },
  "0x64c379ab93b859AdA71b8AbACA77BeD104a5DbCa": {
    farmId: 27,
    allocPoint: 2666389,
  },
  "0x8221D04A71FcD0Dd3d096cB3B49E22918095933F": {
    farmId: 30,
    allocPoint: 1836972,
  },
  "0x5775D98022590dc60E9c4Ae0a1c56bF1fD8fcaDC": {
    farmId: 31,
    allocPoint: 1779887,
  },
  "0x20943aD7855bdE06Dd41BB89C9D2efE05DB329EC": {
    farmId: 32,
    allocPoint: 2696116,
  },
  "0xE75Ec02F28bC0E1ca1794FbFFe8229ac1662075E": {
    farmId: 34,
    allocPoint: 8418431,
  },
  "0x49f8c72fca1f6f62411da1aa451c479e1324eb8f": {
    farmId: 39,
    allocPoint: 2348149,
  },
  "0x2ea9369daee963cebc0266ae8b98c3e015c59046": {
    farmId: 41,
    allocPoint: 4461570,
  },
  "0x7e1b9f1e286160a80ab9b04d228c02583aef90b5": {
    farmId: 44,
    allocPoint: 3014648,
  },
  "0x4fd950b3cA45d6F40E5187706D3981ee955E06b4": {
    farmId: 45,
    allocPoint: 2284360,
  },
  "0xc20a4f3012ba2df47544d4926b19604fa777fb01": {
    farmId: 46,
    allocPoint: 3162853,
  },
  "0x1d5a7bea34ee984d54af6ff355a1cb54c29eb546": {
    farmId: 47,
    allocPoint: 7811587,
  },
  "0xe1b5bc09427710bc4d886ec49654944110b58134": {
    farmId: 48,
    allocPoint: 1859417,
  },
  "0x0151b25a5acf7f2f31bb2ab4358c9fa894db2cb2": {
    farmId: 51,
    allocPoint: 2039808,
  },
  "0x7f3f57c92681c9a132660c468f9cdff456fc3fd7": {
    farmId: 52,
    allocPoint: 3343377,
  },
  "0xa993067343719c4e43de972f3f86513478cbb3cd": {
    farmId: 53,
    allocPoint: 5880778,
  },
  "0xdeb684aa667564a0fedfce9d444dee209b7e4e4a": {
    farmId: 54,
    allocPoint: 1902441,
  },
  "0x86b0fd64234a747681f0235b6cc5fe04a4d95b31": {
    farmId: 55,
    allocPoint: 2699347,
  },
  "0x27580618797a2ce02fdfbbee948388a50a823611": {
    farmId: 59,
    allocPoint: 45007185,
  },
  "0xde5d57b31cb67d5aed93c26940394796953961cb": {
    farmId: 60,
    allocPoint: 292787708,
  },
  "0xfa26d55184cb512180e4ff9e62b4c1e0327abb53": {
    farmId: 61,
    allocPoint: 5915852,
  },
  "0xf4d43d7ef48f46ee7e6989c45d0e97456e20b53b": {
    farmId: 62,
    allocPoint: 183415734,
  },
  "0xab3285456037cb7a4718a01e1711ba8d5e95a628": {
    farmId: 63,
    allocPoint: 1838818,
  },
  "0x96a47656e7c7758a69b6db74dafecd386484b9e6": {
    farmId: 64,
    allocPoint: 1734478,
  },
}

const lowercased = Object.fromEntries(
  Object.entries(farms).map(([k, v]) => [k.toLowerCase(), v])
);

export default lowercased;
