import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface SignupModalConfig {
  product: string; // e.g. 'Universal Paste' or 'Voice Generator'
  source: string;  // e.g. 'Top Yellow Bar', 'Hero Callout', 'Bottom CTA', 'Windows App', 'Adobe Extension'
  title?: string;
  subtitle?: string;
  buttonText?: string;
  successTitle?: string;
  successMessage?: string;
  onSuccess?: () => void;
  alwaysShow?: boolean;
}

const DEFAULT_CONFIG: SignupModalConfig = {
  product: 'Voice Generator',
  source: 'Unknown',
  title: 'Sign up to download',
  subtitle: 'Join the ecosystem of professional creators.',
  buttonText: 'Sign Up',
  successTitle: 'Redirecting...',
  successMessage: 'Thank you for signing up!',
};

interface SignupContextType {
  hasSignedUp: boolean;
  isModalOpen: boolean;
  modalConfig: SignupModalConfig;
  openSignup: (
    sourceOrConfig: string | SignupModalConfig,
    onSuccess?: () => void
  ) => void;
  closeModal: () => void;
  markAsSignedUp: () => void;
  hasSignedUpForProduct: (product: string) => boolean;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [hasSignedUp, setHasSignedUp] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<SignupModalConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    // Check local storage for previous legacy signup status
    const signedUp = localStorage.getItem('vampro_plugin_signedup');
    if (signedUp === 'true') {
      setHasSignedUp(true);
    }
  }, []);

  const getProductStorageKey = (product: string) => {
    return `vampro_signup_${product.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
  };

  const hasSignedUpForProduct = (product: string) => {
    const key = getProductStorageKey(product);
    return localStorage.getItem(key) === 'true';
  };

  const openSignup = (
    sourceOrConfig: string | SignupModalConfig,
    onSuccess?: () => void
  ) => {
    if (typeof sourceOrConfig === 'string') {
      // Legacy signature for Voice Generator download buttons:
      // openSignup('Windows App', () => window.open(...))
      const product = 'Voice Generator';
      const isProductSignedUp = hasSignedUpForProduct(product) || hasSignedUp;

      if (isProductSignedUp && onSuccess) {
        onSuccess();
        return;
      }

      setModalConfig({
        product,
        source: sourceOrConfig,
        title: 'Sign up to download',
        subtitle: 'Join the ecosystem of professional creators.',
        buttonText: 'Sign Up',
        successTitle: 'Redirecting...',
        successMessage: 'Thank you for signing up!',
        onSuccess,
      });
      setIsModalOpen(true);
    } else {
      // Modern signature for Universal Paste and dynamic pages:
      const product = sourceOrConfig.product || 'Universal Paste';
      const isProductSignedUp = hasSignedUpForProduct(product);

      // If alwaysShow is not false, allow opening modal so users can join/re-verify
      if (!sourceOrConfig.alwaysShow && isProductSignedUp && sourceOrConfig.onSuccess) {
        sourceOrConfig.onSuccess();
        return;
      }

      setModalConfig({
        product,
        source: sourceOrConfig.source || 'General',
        title: sourceOrConfig.title || (product === 'Universal Paste' ? 'Join Universal Paste Waitlist' : 'Sign up to download'),
        subtitle: sourceOrConfig.subtitle || (product === 'Universal Paste' ? 'Be the first to paste web media directly into Adobe Premiere Pro.' : 'Join the ecosystem of professional creators.'),
        buttonText: sourceOrConfig.buttonText || (product === 'Universal Paste' ? 'Join Waitlist' : 'Sign Up'),
        successTitle: sourceOrConfig.successTitle || (product === 'Universal Paste' ? "You're on the list!" : 'Redirecting...'),
        successMessage: sourceOrConfig.successMessage || (product === 'Universal Paste' ? 'Thank you for joining the Universal Paste waitlist. We will notify you when early access opens.' : 'Thank you for signing up!'),
        onSuccess: sourceOrConfig.onSuccess || onSuccess,
        alwaysShow: sourceOrConfig.alwaysShow,
      });
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const markAsSignedUp = () => {
    const productKey = getProductStorageKey(modalConfig.product);
    localStorage.setItem(productKey, 'true');
    if (modalConfig.product === 'Voice Generator') {
      localStorage.setItem('vampro_plugin_signedup', 'true');
      setHasSignedUp(true);
    }

    if (modalConfig.onSuccess) {
      modalConfig.onSuccess();
    }
  };

  return (
    <SignupContext.Provider
      value={{
        hasSignedUp,
        isModalOpen,
        modalConfig,
        openSignup,
        closeModal,
        markAsSignedUp,
        hasSignedUpForProduct,
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
