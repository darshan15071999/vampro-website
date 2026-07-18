import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface SignupContextType {
  hasSignedUp: boolean;
  isModalOpen: boolean;
  modalSource: string;
  openSignup: (source: string, onSuccess: () => void) => void;
  closeModal: () => void;
  markAsSignedUp: () => void;
  onSuccessCallback: (() => void) | null;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [hasSignedUp, setHasSignedUp] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalSource, setModalSource] = useState<string>('Unknown');
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    // Check local storage for previous signup status
    const signedUp = localStorage.getItem('vampro_plugin_signedup');
    if (signedUp === 'true') {
      setHasSignedUp(true);
    }
  }, []);

  const openSignup = (source: string = 'Unknown', onSuccess: () => void) => {
    if (hasSignedUp) {
      // If already signed up, just execute the action immediately
      onSuccess();
      return;
    }
    setModalSource(source);
    setOnSuccessCallback(() => onSuccess);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const markAsSignedUp = () => {
    localStorage.setItem('vampro_plugin_signedup', 'true');
    setHasSignedUp(true);
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return (
    <SignupContext.Provider
      value={{
        hasSignedUp,
        isModalOpen,
        modalSource,
        openSignup,
        closeModal,
        markAsSignedUp,
        onSuccessCallback,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};
