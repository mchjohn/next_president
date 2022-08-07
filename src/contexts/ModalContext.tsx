import React, { createContext, ReactNode, useContext, useState } from 'react';

type ModalProviderProps = {
  children: ReactNode;
};

type IModalContext = {
  showModal: boolean;
  showModalSignUp: boolean;
  showModalComment: boolean;
  showGlobalButton: boolean;

  openModal(): void;
  closeModal(): void;
  openModalSignUp(): void;
  closeModalSignUp(): void;
  openModalComment(): void;
  closeModalComment(): void;
  openGlobalButton(): void;
  closeGlobalButton(): void;
};

const ModalContext = createContext({} as IModalContext);

function ModalProvider({ children }: ModalProviderProps) {
  const [showModal, setShowModal] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);
  const [showGlobalButton, setShowGlobalButton] = useState(false);
  const [showModalComment, setShowModalComment] = useState(false);

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

  const openModalComment = () => {
    setShowModalComment(true);
  };

  const closeModalComment = () => {
    setShowModalComment(false);
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
        showModalSignUp,
        showModalComment,
        showGlobalButton,

        openModal,
        closeModal,
        openModalSignUp,
        closeModalSignUp,
        openModalComment,
        openGlobalButton,
        closeGlobalButton,
        closeModalComment,
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
