import {create} from 'zustand';

interface EmailStateProps {
  email: string;
  setEmail: (email: string) => void;
}

const useEmailStore = create<EmailStateProps>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
}));

export default useEmailStore;