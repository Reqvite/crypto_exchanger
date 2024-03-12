import { Flex, Switch, Text } from "@chakra-ui/react";

type Props = {
  isBuying: boolean;
  onChange: (isBuying: boolean) => void;
};

export const ToggleBuySell = (props: Props) => {
  const { isBuying = true, onChange } = props;

  const handleToggle = () => {
    onChange(!isBuying);
  };

  return (
    <Flex align="center">
      <Text fontSize="lg" marginRight="2">
        Buy
      </Text>
      <Switch colorScheme="teal" size="lg" isChecked={isBuying} onChange={handleToggle} />
      <Text fontSize="lg" marginLeft="2">
        Sell
      </Text>
    </Flex>
  );
};
