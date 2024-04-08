import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { bsc } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";
import Home from "./src/screens/home/home";

const projectId = "61308cbd741604ec945e0cef115985f8";

// 2. Create config
const metadata = {
  name: "Web3Modal RN NFT Minting",
  description: "Web3Modal RN NFT Minting Tutorial",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "walletconnectexample://",
  },
};

const chains = [bsc];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "badac6b72f6a4599d4f6c06af60f99884c71be6bed90f5ddb24f339bc799fb4b",
    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
  ],
});

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Home />
      <Web3Modal />
    </WagmiConfig>
  );
}
