import { useEffect, useMemo, useState } from "react";
import { Text, Button, TextInput, StyleSheet } from "react-native";
import { Address, formatEther, parseEther } from "viem";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

const ModalSendToken = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [params, setParams] = useState<{
    to: Address;
    value: string;
    token: Address;
  }>({
    to: "0xa1c2f6d5129ad18Df5DdEDFF45D8E57A6489C44c",
    token: "0xca22Bd467030520c74004a53Cd93b8d7a7D04bc1",
    value: "0",
  });

  // const { writeAsync, isLoading } = useContractWrite({
  //   abi,
  //   address: address,
  //   functionName: "transfer",
  //   args: [params.to, parseEther(params.value)],
  // });

  const { writeAsync } = useSendTransaction({
    tokenAddress: params.token,
    to: params.to,
    value: parseEther(params.value),
  });

  const balance = useBalance({
    address: address,
    token: params.token,
    watch: true,
  });

  const handleSend = async () => {
    try {
      setIsLoading(true);
      await writeAsync?.();
    } catch (error) {
      console.log("---------------error--------------", error);
    } finally {
      setIsLoading(false);
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

const useSendTransaction = ({
  tokenAddress,
  to,
  value,
}: {
  tokenAddress: Address;
  to: Address;
  value: bigint;
}) => {
  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: "transfer",
    args: [to, value],
  });
  return useContractWrite(config);
};
