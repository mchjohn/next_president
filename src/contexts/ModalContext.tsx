import React, { createContext, ReactNode, useContext, useState } from 'react';

type ModalProviderProps = {
  children: ReactNode;
};

type IModalContext = {
  showModal: boolean;
  showModalSignUp: boolean;

  openModal(): void;
  closeModal(): void;
  openModalSignUp(): void;
  closeModalSignUp(): void;
};

const ModalContext = createContext({} as IModalContext);

function ModalProvider({ children }: ModalProviderProps) {
  const [showModal, setShowModal] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModalSignUp = () => {
    setShowModalSignUp(true);
  };

  const closeModalSignUp = () => {
    setShowModalSignUp(false);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        showModalSignUp,

        openModal,
        closeModal,
        openModalSignUp,
        closeModalSignUp,
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
