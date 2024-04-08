import { Button, StyleSheet, Text, View } from "react-native";
import { Address, useBalance } from "wagmi";

const Balance = ({ account }: { account: Address }) => {
  const { data } = useBalance({
    address: account,
  });

  console.log("balance", data);
  return (
    <Text>
      Balance:{data?.formatted} {data?.symbol}
    </Text>
  );
};

export default Balance;
