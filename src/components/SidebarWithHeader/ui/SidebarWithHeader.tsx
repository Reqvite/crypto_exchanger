import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { ReactNode } from "react";

import { MobileNav } from "./MobileNav";
import { SidebarContent } from "./SidebarContent";

type Props = {
  children: ReactNode;
};

export const SidebarWithHeader = ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};
