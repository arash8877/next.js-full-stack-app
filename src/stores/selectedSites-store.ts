import {create} from 'zustand';
import { SiteFormValues } from '@/types';

interface iSelectedSitesStoreProps {
  selectedSites: SiteFormValues[];
  setSelectedSites: (sites: SiteFormValues[]) => void;
  setTrialSelectedSites: (sites: SiteFormValues[]) => void;
}

const useSelectedSitesStore = create<iSelectedSitesStoreProps>((set) => ({
  selectedSites: [],
  setSelectedSites: (sites) => set({ selectedSites: sites }),
  setTrialSelectedSites: (sites) => set({ selectedSites: sites }),
}));

export default useSelectedSitesStore;


