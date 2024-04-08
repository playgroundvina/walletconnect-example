import { useEffect, useMemo, useState } from "react";
import { Text, Button, TextInput, StyleSheet } from "react-native";
import { Address, formatEther, parseEther } from "viem";
import { useAccount, useBalance, useSendTransaction } from "wagmi";

const ModalSendToken = () => {
  const { isLoading, sendTransactionAsync } = useSendTransaction();
  const { address } = useAccount();

  const [params, setParams] = useState<{
    to: Address;
    value: string;
    token: Address;
  }>({
    to: "0xa1c2f6d5129ad18Df5DdEDFF45D8E57A6489C44c",
    token: "0xca22Bd467030520c74004a53Cd93b8d7a7D04bc1",
    value: "0",
  });

  const balance = useBalance({
    address: address,
    token: params.token,
    watch: true,
  });

  const handleSend = async () => {
    try {
      const data = await sendTransactionAsync({
        to: params.to,
        value: parseEther(params.value),
      });

      console.log("---------------data-----------------", data);
    } catch (error) {
      console.log("---------------error--------------", error);
    }
  };

  const text = useMemo(() => (isLoading ? "Loading ..." : "Send"), [isLoading]);

  return (
    <>
      <Text>Input Address:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(e) => setParams({ ...params, to: e as Address })}
        value={params.to}
      />

      <Text>Input Token:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(e) => setParams({ ...params, token: e as Address })}
        value={params.token}
      />
      <Text>
        Balance: {balance.data ? formatEther(balance?.data?.value) : 0}
      </Text>

      <Text>Input Value: </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(e) => setParams({ ...params, value: e })}
        value={params.value}
        placeholder="Value"
      />
      <Button
        disabled={+params.value <= 0 || isLoading}
        title={text + (isLoading ? "..." : "")}
        onPress={handleSend}
      />
    </>
  );
};

export default ModalSendToken;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
