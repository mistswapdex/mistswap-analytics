const farms = {
  "0x674A71E69fe8D5cCff6fdcF9F1Fa4262Aa14b154": {
    farmId: 7,
    allocPoint: 300000000,
  },
  "0x437E444365aD9ed788e8f255c908bceAd5AEA645": {
    farmId: 8,
    allocPoint: 6523103,
  },
  "0x80F712670d268cf2C05e7162674c7466c940eBE3": {
    farmId: 0,
    allocPoint: 3270269,
  },
  "0x24f011f12Ea45AfaDb1D4245bA15dCAB38B43D13": {
    farmId: 1,
    allocPoint: 482836948,
  },
  "0x4fF52e9D7824EC9b4e0189F11B5aA0F02b459b03": {
    farmId: 2,
    allocPoint: 4505158,
  },
  "0x287a276401caDBe50d5C0398137490E6d45830Dd": {
    farmId: 5,
    allocPoint: 1822245,
  },
  "0x41075d2Ea8BEF1CAfb24D9Bd2061b620cbc05B60": {
    farmId: 6,
    allocPoint: 1798341,
  },
  "0xc47B0B4B51EE06De0daF02517D78f0473B776633": {
    farmId: 9,
    allocPoint: 4922415,
  },
  "0xD6EcaDB40b35D17f739Ec27285759d0ca119e3A1": {
    farmId: 10,
    allocPoint: 1926021,
  },
  "0x24615e918AD078900BfE13F4cd26876Bae64dD75": {
    farmId: 18,
    allocPoint: 5005896,
  },
  "0x64c379ab93b859AdA71b8AbACA77BeD104a5DbCa": {
    farmId: 27,
    allocPoint: 35065372,
  },
  "0x8221D04A71FcD0Dd3d096cB3B49E22918095933F": {
    farmId: 30,
    allocPoint: 1827796,
  },
  "0x20943aD7855bdE06Dd41BB89C9D2efE05DB329EC": {
    farmId: 32,
    allocPoint: 22490541,
  },
  "0xE75Ec02F28bC0E1ca1794FbFFe8229ac1662075E": {
    farmId: 34,
    allocPoint: 6169056,
  },
  "0x1f354956de4a7ed71308225de94a27b35a84ea57": {
    farmId: 36,
    allocPoint: 1831066,
  },
  "0x49f8c72fca1f6f62411da1aa451c479e1324eb8f": {
    farmId: 39,
    allocPoint: 24538871,
  },
  "0xea5038043364830c489d7fd8f95efe35eae6f4ff": {
    farmId: 40,
    allocPoint: 2763660,
  },
  "0x2ea9369daee963cebc0266ae8b98c3e015c59046": {
    farmId: 41,
    allocPoint: 27336028,
  },
  "0x7e1b9f1e286160a80ab9b04d228c02583aef90b5": {
    farmId: 44,
    allocPoint: 2289728,
  },
  "0xc20a4f3012ba2df47544d4926b19604fa777fb01": {
    farmId: 46,
    allocPoint: 5649682,
  },
  "0x1d5a7bea34ee984d54af6ff355a1cb54c29eb546": {
    farmId: 47,
    allocPoint: 5540632,
  },
  "0xe1b5bc09427710bc4d886ec49654944110b58134": {
    farmId: 48,
    allocPoint: 21326718,
  },
  "0x0151b25a5acf7f2f31bb2ab4358c9fa894db2cb2": {
    farmId: 51,
    allocPoint: 3132188,
  },
  "0x7f3f57c92681c9a132660c468f9cdff456fc3fd7": {
    farmId: 52,
    allocPoint: 2469700,
  },
  "0xa993067343719c4e43de972f3f86513478cbb3cd": {
    farmId: 53,
    allocPoint: 5820379,
  },
  "0xdeb684aa667564a0fedfce9d444dee209b7e4e4a": {
    farmId: 54,
    allocPoint: 7389299,
  },
  "0x86b0fd64234a747681f0235b6cc5fe04a4d95b31": {
    farmId: 55,
    allocPoint: 3036328,
  },
  "0xd45d971c09d966adbc7064e4ca05e2edaa3721c1": {
    farmId: 56,
    allocPoint: 4025884,
  },
  "0x1326e072b412fdf591562807657d48300ca21b1f": {
    farmId: 57,
    allocPoint: 2843068,
  },
  "0xaaceda629026fe99a13600d1b6eb7f00185061f1": {
    farmId: 58,
    allocPoint: 1843591,
  },
}

const lowercased = Object.fromEntries(
  Object.entries(farms).map(([k, v]) => [k.toLowerCase(), v])
);

export default lowercased;
