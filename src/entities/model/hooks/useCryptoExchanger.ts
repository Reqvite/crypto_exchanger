import { useToast } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { MAX_INPUT_VALUE, MIN_INPUT_VALUE } from "../const";

const BinanceWebSocketUrl = "wss://stream.binance.com:9443/ws/ethusdt@ticker";

export const useCryptoExchanger = () => {
  const [price, setPrice] = useState<number>(0);
  const [cryptoName, setCryptoName] = useState("");
  const [isBuying, setIsBuying] = useState(true);
  const [amount, setAmount] = useState<string | number>("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const ws = new WebSocket(BinanceWebSocketUrl);
    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data && data.c) {
        setPrice(parseFloat(data.c));
        setCryptoName(data.s);
      }
    };

    ws.onerror = error => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleToggleChange = (value: boolean) => {
    setIsBuying(value);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (typeof value === "number") {
      if (value <= MIN_INPUT_VALUE || isNaN(value)) {
        setAmount("");
        return;
      }
      if (value >= MAX_INPUT_VALUE) {
        setAmount(MAX_INPUT_VALUE);
        return;
      }
      setAmount(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        position: "top",
        title: "Operation processed successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 2000);
  };

  return {
    price,
    cryptoName,
    isBuying,
    amount,
    isLoading,
    handleToggleChange,
    handleAmountChange,
    handleSubmit,
  };
};
