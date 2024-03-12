import { useToast } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from "react";

import { MAX_INPUT_VALUE, MIN_INPUT_VALUE } from "../const";

const BinanceWebSocketUrl = "wss://stream.binance.com:9443/ws/ethusdt@ticker";

type ReturnType = {
  price: number;
  cryptoName: string;
  isBuying: boolean;
  amount: string | number;
  isLoading: boolean;
  handleToggleChange: (value: boolean) => void;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: FormEventHandler<HTMLDivElement>;
  totalValue: number;
};

export const useCryptoExchanger = (): ReturnType => {
  const [price, setPrice] = useState<number>(0);
  const [cryptoName, setCryptoName] = useState("");
  const [isBuying, setIsBuying] = useState(false);
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
    if (isNaN(value)) {
      setAmount("");
      return;
    }
    if (value <= MIN_INPUT_VALUE) {
      setAmount(0);
      return;
    }
    if (value >= MAX_INPUT_VALUE) {
      setAmount(MAX_INPUT_VALUE);
      return;
    }
    setAmount(value);
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAmount("");
      toast({
        position: "top",
        title: "Operation processed successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 2000);
  };

  const totalValue = typeof amount === "number" ? (amount * price).toFixed(2) : 0;

  return {
    price,
    cryptoName,
    isBuying,
    amount,
    isLoading,
    handleToggleChange,
    handleAmountChange,
    handleSubmit,
    totalValue,
  };
};
