import React, { createContext, ReactNode, useContext, useState } from 'react';

type ModalProviderProps = {
  children: ReactNode;
};

type IModalContext = {
  showModal: boolean;
  showGlobalButton: boolean;

  openModal(): void;
  closeModal(): void;
  openGlobalButton(): void;
  closeGlobalButton(): void;
};

const ModalContext = createContext({} as IModalContext);

function ModalProvider({ children }: ModalProviderProps) {
  const [showModal, setShowModal] = useState(false);
  const [showGlobalButton, setShowGlobalButton] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openGlobalButton = () => {
    setShowGlobalButton(true);
  };

  const closeGlobalButton = () => {
    setShowGlobalButton(false);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        showGlobalButton,

        openModal,
        closeModal,
        openGlobalButton,
        closeGlobalButton,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);

  return context;
}

export { ModalProvider, useModal };
