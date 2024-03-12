import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

type Props = {
  title: string;
  price: string | number;
};

export const ResultCard = (props: Props) => {
  const { title, price } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={"accentColor"}
      rounded={"lg"}
      width={"200px"}
    >
      <StatLabel fontWeight={"medium"} isTruncated textAlign="center">
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"} textAlign="center">
        {price}
      </StatNumber>
      <StatLabel fontWeight={"small"} isTruncated textAlign="center">
        usdt
      </StatLabel>
    </Stat>
  );
};
