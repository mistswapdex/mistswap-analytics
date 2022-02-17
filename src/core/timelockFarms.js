const farms = {
  "0x674A71E69fe8D5cCff6fdcF9F1Fa4262Aa14b154": {
    farmId: 7,
    allocPoint: 300000000,
  },
  "0x437E444365aD9ed788e8f255c908bceAd5AEA645": {
    farmId: 8,
    allocPoint: 18895896,
  },
  "0x80F712670d268cf2C05e7162674c7466c940eBE3": {
    farmId: 0,
    allocPoint: 15532938,
  },
  "0x24f011f12Ea45AfaDb1D4245bA15dCAB38B43D13": {
    farmId: 1,
    allocPoint: 300496954,
  },
  "0x4fF52e9D7824EC9b4e0189F11B5aA0F02b459b03": {
    farmId: 2,
    allocPoint: 10921078,
  },
  "0x41075d2Ea8BEF1CAfb24D9Bd2061b620cbc05B60": {
    farmId: 6,
    allocPoint: 9144225,
  },
  "0xc47B0B4B51EE06De0daF02517D78f0473B776633": {
    farmId: 9,
    allocPoint: 66660671,
  },
  "0xD6EcaDB40b35D17f739Ec27285759d0ca119e3A1": {
    farmId: 10,
    allocPoint: 9508994,
  },
  "0xCabdb1321CEAb169935a0c9d4c856250766C3df7": {
    farmId: 14,
    allocPoint: 15930397,
  },
  "0xbE48dC2353a460668A5D859C66e4472661581998": {
    farmId: 15,
    allocPoint: 3895864,
  },
  "0x24615e918AD078900BfE13F4cd26876Bae64dD75": {
    farmId: 18,
    allocPoint: 8496585,
  },
  "0x64c379ab93b859AdA71b8AbACA77BeD104a5DbCa": {
    farmId: 27,
    allocPoint: 25590307,
  },
  "0x8221D04A71FcD0Dd3d096cB3B49E22918095933F": {
    farmId: 30,
    allocPoint: 5724322,
  },
  "0x5775D98022590dc60E9c4Ae0a1c56bF1fD8fcaDC": {
    farmId: 31,
    allocPoint: 14925656,
  },
  "0xB02A135992478a485D9DD771092CdD8B4487594A": {
    farmId: 33,
    allocPoint: 11304180,
  },
  "0xE75Ec02F28bC0E1ca1794FbFFe8229ac1662075E": {
    farmId: 34,
    allocPoint: 7553514,
  },
  "0x99057a0cb475d1c4d950d552e77e9e68cddb8261": {
    farmId: 35,
    allocPoint: 9703179,
  },
  "0x1f354956de4a7ed71308225de94a27b35a84ea57": {
    farmId: 36,
    allocPoint: 10091644,
  },
  "0xbe8c7c35103c443844ef234cffd73a491df6f503": {
    farmId: 37,
    allocPoint: 15401755,
  },
  "0x49f8c72fca1f6f62411da1aa451c479e1324eb8f": {
    farmId: 39,
    allocPoint: 16458210,
  },
  "0xea5038043364830c489d7fd8f95efe35eae6f4ff": {
    farmId: 40,
    allocPoint: 10053255,
  },
  "0x2ea9369daee963cebc0266ae8b98c3e015c59046": {
    farmId: 41,
    allocPoint: 7704190,
  },
  "0x800632afc31225813b06185ea8be8ed571820a50": {
    farmId: 42,
    allocPoint: 8094038,
  },
  "0x7e1b9f1e286160a80ab9b04d228c02583aef90b5": {
    farmId: 44,
    allocPoint: 9154285,
  },
  "0xc20a4f3012ba2df47544d4926b19604fa777fb01": {
    farmId: 46,
    allocPoint: 33935881,
  },
  "0x1d5a7bea34ee984d54af6ff355a1cb54c29eb546": {
    farmId: 47,
    allocPoint: 16930892,
  },
  "0xe1b5bc09427710bc4d886ec49654944110b58134": {
    farmId: 48,
    allocPoint: 12184556,
  },
  "0x380094357328488781a0fb31c271a13db7357c1e": {
    farmId: 49,
    allocPoint: 10226248,
  },
  "0x8c14d399f3e12b702effd16cf27337637b38c84a": {
    farmId: 50,
    allocPoint: 10861373,
  },
  "0x0151b25a5acf7f2f31bb2ab4358c9fa894db2cb2": {
    farmId: 51,
    allocPoint: 4618896,
  },
}

const lowercased = Object.fromEntries(
  Object.entries(farms).map(([k, v]) => [k.toLowerCase(), v])
);

export default lowercased;
