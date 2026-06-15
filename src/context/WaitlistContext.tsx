import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface WaitlistContextType {
  waitlistCount: number | null;
  hasJoined: boolean;
  isModalOpen: boolean;
  modalSource: string;
  openModal: (source?: string) => void;
  closeModal: () => void;
  markAsJoined: (newCount?: number) => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export const WaitlistProvider = ({ children }: { children: ReactNode }) => {
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalSource, setModalSource] = useState<string>('Unknown');

  useEffect(() => {
    // Check local storage for previous join status
    const joined = localStorage.getItem('vampro_waitlist_joined');
    if (joined === 'true') {
      setHasJoined(true);
    }

    // Fetch initial count
    fetch('/api/waitlist')
      .then(res => res.json())
      .then(data => {
        if (data.count) {
          setWaitlistCount(data.count);
        }
      })
      .catch(err => {
        console.error('Failed to fetch waitlist count', err);
        setWaitlistCount(25); // Fallback starting value
      });
  }, []);

  const openModal = (source: string = 'Unknown') => {
    if (hasJoined) return; // Prevent opening if already joined
    setModalSource(source);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const markAsJoined = (newCount?: number) => {
    localStorage.setItem('vampro_waitlist_joined', 'true');
    setHasJoined(true);
    if (newCount) {
      setWaitlistCount(newCount);
    } else if (waitlistCount !== null) {
      setWaitlistCount(waitlistCount + 1);
    }
  };

  return (
    <WaitlistContext.Provider
      value={{
        waitlistCount,
        hasJoined,
        isModalOpen,
        modalSource,
        openModal,
        closeModal,
        markAsJoined,
      }}
    >
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
};
