import { StatusBar } from "expo-status-bar";
import { W3mButton, W3mConnectButton } from "@web3modal/wagmi-react-native";
import { StyleSheet, Text, View } from "react-native";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log("address", address);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {/* <Button title="Connect wallet" onPress={handleConnect} /> */}
      {/* {address} */}
      <W3mButton />

      {/* <W3mConnectButton label="Connect" /> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
