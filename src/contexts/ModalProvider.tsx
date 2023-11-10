import React, { createContext, useContext, useState, ReactNode } from "react";
import { Box, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, useDisclosure } from "@chakra-ui/react";

interface PropsInterface {
  children: ReactNode;
}

interface ModalContextProps {
  parametters: {
    title: string;
    size: string;
  };
  updateParametters: (target: string, value: any) => void;
}

const ModalContext = createContext<ModalContextProps>({
  parametters: {
    title: "",
    size: "full",
  },
  updateParametters: () => {},
});

export const ModalProvider: React.FC<PropsInterface> = ({ children }) => {
  const { isOpen = false, onOpen, onClose } = useDisclosure();

  const [parametters, setParametters] = useState({
    title: "",
    size: "full",
  });

  const updateParametters = (target: string, value: any) => {
    const object : any = { ...parametters };
    object[target] = value;
    setParametters(object);
  };

  return (
    <ModalContext.Provider value={{ parametters, updateParametters }}>
      <Modal size={parametters.size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>{parametters.title}</ModalHeader>
          <Divider />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
