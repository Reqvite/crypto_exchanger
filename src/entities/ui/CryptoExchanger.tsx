import { Button, Flex, Heading, Spinner, Stack } from "@chakra-ui/react";

import { Input } from "@/shared/ui";

import { MAX_INPUT_VALUE, MIN_INPUT_VALUE } from "../model/const";
import { useCryptoExchanger } from "../model/hooks/useCryptoExchanger";
import { ResultCard } from "./ResultCard";
import { ToggleBuySell } from "./ToggleBuySell";

export const CryptoExchanger = () => {
  const {
    price,
    cryptoName,
    isBuying,
    amount,
    isLoading,
    handleToggleChange,
    handleAmountChange,
    handleSubmit,
  } = useCryptoExchanger();

  const totalValue = typeof amount === "number" ? (amount * price).toFixed(2) : 0;
  return (
    <Flex as="main" justifyContent="center" alignItems="center" height="calc(100vh - 120px)">
      {price ? (
        <Stack as="form" gap={10} alignItems={"center"} onSubmit={handleSubmit}>
          <Heading>{cryptoName} pair selected</Heading>
          <ToggleBuySell isBuying={isBuying} onChange={handleToggleChange} />
          <Input
            value={amount}
            onChange={handleAmountChange}
            type="number"
            autoFocus
            isRequired
            variant={"primary"}
            min={MIN_INPUT_VALUE}
            max={MAX_INPUT_VALUE}
            label={`Crypto amount to ${isBuying ? "sell" : "buy"}`}
          />
          <ResultCard title="You will receive:" price={totalValue} />
          <Button width={120} variant={"primary"} type="submit" isLoading={isLoading}>
            {isBuying ? "Sell" : "Buy"} crypto
          </Button>
        </Stack>
      ) : (
        <Spinner />
      )}
    </Flex>
  );
};
