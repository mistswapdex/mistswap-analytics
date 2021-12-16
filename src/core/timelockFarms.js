const farms = {
  "0x674A71E69fe8D5cCff6fdcF9F1Fa4262Aa14b154": {
    farmId: 7,
    allocPoint: 314847489,
  },
  "0x437E444365aD9ed788e8f255c908bceAd5AEA645": {
    farmId: 8,
    allocPoint: 57663568,
  },
  "0x80F712670d268cf2C05e7162674c7466c940eBE3": {
    farmId: 0,
    allocPoint: 56352041,
  },
  "0x24f011f12Ea45AfaDb1D4245bA15dCAB38B43D13": {
    farmId: 1,
    allocPoint: 234573255,
  },
  "0x4fF52e9D7824EC9b4e0189F11B5aA0F02b459b03": {
    farmId: 2,
    allocPoint: 17931430,
  },
  "0x1EE39F93450d80981c169E59C8A641a3bC853A09": {
    farmId: 3,
    allocPoint: 6753233,
  },
  "0x41075d2Ea8BEF1CAfb24D9Bd2061b620cbc05B60": {
    farmId: 6,
    allocPoint: 6004967,
  },
  "0xc47B0B4B51EE06De0daF02517D78f0473B776633": {
    farmId: 9,
    allocPoint: 75190888,
  },
  "0xD6EcaDB40b35D17f739Ec27285759d0ca119e3A1": {
    farmId: 10,
    allocPoint: 15083142,
  },
  "0xFCf26E0EB200692B3002f941eea0486d2E901aA9": {
    farmId: 11,
    allocPoint: 5866148,
  },
  "0xCFcBC90e617a3996355761b52dF2830B7b6718d0": {
    farmId: 12,
    allocPoint: 6496708,
  },
  "0xf9D33ABfaF59fd19077f44399A8971621Cd2eA55": {
    farmId: 13,
    allocPoint: 11069949,
  },
  "0xbE48dC2353a460668A5D859C66e4472661581998": {
    farmId: 15,
    allocPoint: 6887140,
  },
  "0x12E03015A85A0c2c1eca69486147608ABB0b801c": {
    farmId: 16,
    allocPoint: 5801194,
  },
  "0x24615e918AD078900BfE13F4cd26876Bae64dD75": {
    farmId: 18,
    allocPoint: 6720317,
  },
  "0xa331430473ABA2337698fD95a7c2fCf376DEbFb1": {
    farmId: 19,
    allocPoint: 5923315,
  },
  "0x0663B29E3CAa8F2DB0313eA8B3E942a0431429cf": {
    farmId: 23,
    allocPoint: 6841696,
  },
  "0x64c379ab93b859AdA71b8AbACA77BeD104a5DbCa": {
    farmId: 27,
    allocPoint: 8519902,
  },
  "0x8221D04A71FcD0Dd3d096cB3B49E22918095933F": {
    farmId: 30,
    allocPoint: 20997939,
  },
  "0x5775D98022590dc60E9c4Ae0a1c56bF1fD8fcaDC": {
    farmId: 31,
    allocPoint: 36376150,
  },
  "0x20943aD7855bdE06Dd41BB89C9D2efE05DB329EC": {
    farmId: 32,
    allocPoint: 6015684,
  },
  "0xB02A135992478a485D9DD771092CdD8B4487594A": {
    farmId: 33,
    allocPoint: 14323756,
  },
  "0xE75Ec02F28bC0E1ca1794FbFFe8229ac1662075E": {
    farmId: 34,
    allocPoint: 5804058,
  },
  "0x99057a0cb475d1c4d950d552e77e9e68cddb8261": {
    farmId: 35,
    allocPoint: 30856981,
  },
  "0x1f354956de4a7ed71308225de94a27b35a84ea57": {
    farmId: 36,
    allocPoint: 22679554,
  },
  "0xbe8c7c35103c443844ef234cffd73a491df6f503": {
    farmId: 37,
    allocPoint: 12342954,
  },
  "0xb31f44e525cc07037e55bd448004cff66f1fa878": {
    farmId: 38,
    allocPoint: 8893292,
  },
  "0x49f8c72fca1f6f62411da1aa451c479e1324eb8f": {
    farmId: 39,
    allocPoint: 5992823,
  },
  "0xea5038043364830c489d7fd8f95efe35eae6f4ff": {
    farmId: 40,
    allocPoint: 6925466,
  },
  "0x2ea9369daee963cebc0266ae8b98c3e015c59046": {
    farmId: 41,
    allocPoint: 5599258,
  },
}

const lowercased = Object.fromEntries(
  Object.entries(farms).map(([k, v]) => [k.toLowerCase(), v])
);

export default lowercased;
