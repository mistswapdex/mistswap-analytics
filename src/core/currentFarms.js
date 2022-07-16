const farms = {
  "0x674A71E69fe8D5cCff6fdcF9F1Fa4262Aa14b154": {
    farmId: 7,
    allocPoint: 300000000,
  },
  "0x437E444365aD9ed788e8f255c908bceAd5AEA645": {
    farmId: 8,
    allocPoint: 2149627,
  },
  "0x80F712670d268cf2C05e7162674c7466c940eBE3": {
    farmId: 0,
    allocPoint: 3426884,
  },
  "0x24f011f12Ea45AfaDb1D4245bA15dCAB38B43D13": {
    farmId: 1,
    allocPoint: 270541741,
  },
  "0x4fF52e9D7824EC9b4e0189F11B5aA0F02b459b03": {
    farmId: 2,
    allocPoint: 8741155,
  },
  "0xc47B0B4B51EE06De0daF02517D78f0473B776633": {
    farmId: 9,
    allocPoint: 3959002,
  },
  "0xD6EcaDB40b35D17f739Ec27285759d0ca119e3A1": {
    farmId: 10,
    allocPoint: 1994653,
  },
  "0x24615e918AD078900BfE13F4cd26876Bae64dD75": {
    farmId: 18,
    allocPoint: 12864307,
  },
  "0x64c379ab93b859AdA71b8AbACA77BeD104a5DbCa": {
    farmId: 27,
    allocPoint: 5954517,
  },
  "0x20943aD7855bdE06Dd41BB89C9D2efE05DB329EC": {
    farmId: 32,
    allocPoint: 14441171,
  },
  "0xE75Ec02F28bC0E1ca1794FbFFe8229ac1662075E": {
    farmId: 34,
    allocPoint: 3809350,
  },
  "0x99057a0cB475D1c4d950d552E77e9E68CdDb8261": {
    farmId: 35,
    allocPoint: 2068192,
  },
  "0x1f354956de4a7ed71308225de94a27b35a84ea57": {
    farmId: 36,
    allocPoint: 1970842,
  },
  "0xbe8c7c35103c443844ef234cffd73a491df6f503": {
    farmId: 37,
    allocPoint: 1969483,
  },
  "0x49f8c72fca1f6f62411da1aa451c479e1324eb8f": {
    farmId: 39,
    allocPoint: 5189068,
  },
  "0x2ea9369daee963cebc0266ae8b98c3e015c59046": {
    farmId: 41,
    allocPoint: 25272536,
  },
  "0x7e1b9f1e286160a80ab9b04d228c02583aef90b5": {
    farmId: 44,
    allocPoint: 2410431,
  },
  "0x4fd950b3cA45d6F40E5187706D3981ee955E06b4": {
    farmId: 45,
    allocPoint: 2157265,
  },
  "0xc20a4f3012ba2df47544d4926b19604fa777fb01": {
    farmId: 46,
    allocPoint: 7014622,
  },
  "0x1d5a7bea34ee984d54af6ff355a1cb54c29eb546": {
    farmId: 47,
    allocPoint: 5010741,
  },
  "0xe1b5bc09427710bc4d886ec49654944110b58134": {
    farmId: 48,
    allocPoint: 9069975,
  },
  "0x0151b25a5acf7f2f31bb2ab4358c9fa894db2cb2": {
    farmId: 51,
    allocPoint: 2762685,
  },
  "0x7f3f57c92681c9a132660c468f9cdff456fc3fd7": {
    farmId: 52,
    allocPoint: 4044538,
  },
  "0xa993067343719c4e43de972f3f86513478cbb3cd": {
    farmId: 53,
    allocPoint: 3003476,
  },
  "0xdeb684aa667564a0fedfce9d444dee209b7e4e4a": {
    farmId: 54,
    allocPoint: 2701183,
  },
  "0x86b0fd64234a747681f0235b6cc5fe04a4d95b31": {
    farmId: 55,
    allocPoint: 3898462,
  },
  "0x1326e072b412fdf591562807657d48300ca21b1f": {
    farmId: 57,
    allocPoint: 2675728,
  },
  "0x27580618797a2ce02fdfbbee948388a50a823611": {
    farmId: 59,
    allocPoint: 133430347,
  },
  "0xde5d57b31cb67d5aed93c26940394796953961cb": {
    farmId: 60,
    allocPoint: 149178517,
  },
  "0xfa26d55184cb512180e4ff9e62b4c1e0327abb53": {
    farmId: 61,
    allocPoint: 8289486,
  },
}

const lowercased = Object.fromEntries(
  Object.entries(farms).map(([k, v]) => [k.toLowerCase(), v])
);

export default lowercased;
