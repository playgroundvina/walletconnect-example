import { defineChain } from "viem";

const PoolsChain = defineChain({
  id: 12345,
  name: "PoolsChain Chain Testnet",
  network: "Pools testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Pools",
    symbol: "Pools",
  },
  rpcUrls: {
    default: { http: ["https://rpc-testnet.poolsmobility.com/"] },
    public: { http: ["https://rpc-testnet.poolsmobility.com/"] },
  },
  blockExplorers: {
    etherscan: { name: "BscScan", url: "https://bscscan.com" },
    default: { name: "BscScan", url: "https://bscscan.com" },
  },
  // contracts: {
  //   multicall3: {
  //     address: "0xca11bde05977b3631167028862be2a173976ca11",
  //     blockCreated: 15921452,
  //   },
  // },
});

export { PoolsChain };
