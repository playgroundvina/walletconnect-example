import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import Balance from "./component/balance";
import SwitchChains from "./component/switchChains";
import ModalSendToken from "./component/send";

export default function Home() {
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnectAsync, isLoading } = useDisconnect();

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
    } catch (error) {}
  };

  const { chain } = useNetwork();

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>

      {isLoading && <Text>Loading...</Text>}

      {address ? (
        <>
          <Button title="Disconnect" onPress={() => handleDisconnect()} />
          <Button
            disabled={isLoading}
            title={"Switch network"}
            onPress={() => {
              open({ view: "Networks" });
            }}
          />

          {/* {chains.map((x) => ( */}
          {/*   <Button */}
          {/*     disabled={!switchNetwork || x.id === chain?.id} */}
          {/*     title={x.name} */}
          {/*     onPress={() => { */}
          {/*       () => switchNetwork?.(x.id); */}
          {/*     }} */}
          {/*   /> */}
          {/* ))} */}
        </>
      ) : (
        <Button title="Connect Wallet" onPress={() => open()} />
      )}

      {address && chain?.id === 12345 && (
        <>
          <SwitchChains />
          <Text>Address: {address}</Text>
          <Balance account={address} />

          <ModalSendToken />
        </>
      )}

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
