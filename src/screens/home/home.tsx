import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import Balance from "./component/balance";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { open, close } = useWeb3Modal();
  const { disconnectAsync, isLoading } = useDisconnect();

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>

      {isLoading && <Text>Loading...</Text>}

      {address ? (
        <Button title="Disconnect" onPress={() => handleDisconnect()} />
      ) : (
        <Button title="Connect Wallet" onPress={() => open()} />
      )}

      {address && <Balance account={address} />}

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
