const farms = {
  "0x674A71E69fe8D5cCff6fdcF9F1Fa4262Aa14b154": {
    farmId: 7,
    allocPoint: 361916384,
  },
  "0x437E444365aD9ed788e8f255c908bceAd5AEA645": {
    farmId: 8,
    allocPoint: 86288234,
  },
  "0x80F712670d268cf2C05e7162674c7466c940eBE3": {
    farmId: 0,
    allocPoint: 213339573,
  },
  "0x24f011f12Ea45AfaDb1D4245bA15dCAB38B43D13": {
    farmId: 1,
    allocPoint: 219428219,
  },
  "0x4fF52e9D7824EC9b4e0189F11B5aA0F02b459b03": {
    farmId: 2,
    allocPoint: 10438301,
  },
  "0x1EE39F93450d80981c169E59C8A641a3bC853A09": {
    farmId: 3,
    allocPoint: 7452498,
  },
  "0xc98552Ad7DFC5daabAd2660DF378e0070ca75Efc": {
    farmId: 4,
    allocPoint: 11337587,
  },
  "0x287a276401caDBe50d5C0398137490E6d45830Dd": {
    farmId: 5,
    allocPoint: 5359412,
  },
  "0x41075d2Ea8BEF1CAfb24D9Bd2061b620cbc05B60": {
    farmId: 6,
    allocPoint: 5231764,
  },
  "0xc47B0B4B51EE06De0daF02517D78f0473B776633": {
    farmId: 9,
    allocPoint: 13828619,
  },
  "0xD6EcaDB40b35D17f739Ec27285759d0ca119e3A1": {
    farmId: 10,
    allocPoint: 8850010,
  },
  "0xFCf26E0EB200692B3002f941eea0486d2E901aA9": {
    farmId: 11,
    allocPoint: 5519864,
  },
  "0xCFcBC90e617a3996355761b52dF2830B7b6718d0": {
    farmId: 12,
    allocPoint: 4639249,
  },
  "0xf9D33ABfaF59fd19077f44399A8971621Cd2eA55": {
    farmId: 13,
    allocPoint: 3871740,
  },
  "0xCabdb1321CEAb169935a0c9d4c856250766C3df7": {
    farmId: 14,
    allocPoint: 3279854,
  },
  "0xbE48dC2353a460668A5D859C66e4472661581998": {
    farmId: 15,
    allocPoint: 3150102,
  },
  "0x12E03015A85A0c2c1eca69486147608ABB0b801c": {
    farmId: 16,
    allocPoint: 2859362,
  },
  "0x6B68f5D7d0531207a01e9AC16cfCd223D2139D28": {
    farmId: 17,
    allocPoint: 2806248,
  },
  "0x24615e918AD078900BfE13F4cd26876Bae64dD75": {
    farmId: 18,
    allocPoint: 2603255,
  },
  "0xa331430473ABA2337698fD95a7c2fCf376DEbFb1": {
    farmId: 19,
    allocPoint: 2579629,
  },
  "0x1c47c2a72e86B9B488f436F7aC76ACc61e531926": {
    farmId: 20,
    allocPoint: 2551975,
  },
  "0xA32B73445dBc075dA5054503171362D790164dC9": {
    farmId: 21,
    allocPoint: 2539125,
  },
  "0xE3e155c22685F7ceAB3F429CA60f302bCFb13616": {
    farmId: 22,
    allocPoint: 2537287,
  },
  "0x0663B29E3CAa8F2DB0313eA8B3E942a0431429cf": {
    farmId: 23,
    allocPoint: 2516289,
  },
  "0x211c0d74b1213A40Bdfd61490A9893353544ea46": {
    farmId: 24,
    allocPoint: 2514742,
  },
  "0x8e5EdB62775c1Cd003804Ec2a8242E5E0393876b": {
    farmId: 25,
    allocPoint: 2509731,
  },
  "0x49260567a5610414954a1D8F0E7774104FC5CAED": {
    farmId: 26,
    allocPoint: 2503518,
  },
  "0x64c379ab93b859AdA71b8AbACA77BeD104a5DbCa": {
    farmId: 27,
    allocPoint: 2499024,
  },
  "0xFEC4202E22d0cd950aFC52622114e787FFFa0F53": {
    farmId: 28,
    allocPoint: 2499024,
  },
  "0x98A03761Fe62b9A1FD7888D86f70E94a40ACD511": {
    farmId: 29,
    allocPoint: 2499024,
  },
};

const lowercased = Object.fromEntries(
  Object.entries(farms).map(([k, v]) => [k.toLowerCase(), v])
);

export default lowercased;
