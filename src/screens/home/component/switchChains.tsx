import { Text } from "react-native";
import { useChainId } from "wagmi";

const SwitchChains = () => {
  const data = useChainId();
  return <Text>ChainId: {data}</Text>;
};

export default SwitchChains;
