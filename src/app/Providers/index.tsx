import { ReactElement, ReactNode } from "react";

import { ChakraProvider } from "./ChakraProvider/chakra-provider";

type Props = {
  children: ReactNode;
};

export const Providers = (props: Props): ReactElement => {
  const { children } = props;
  return <ChakraProvider>{children}</ChakraProvider>;
};
