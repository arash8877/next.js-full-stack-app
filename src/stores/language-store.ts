import { create } from "zustand";
import axios from "axios";

//--- interface ---
interface iLanguageStore {
  selectedLang: string;
  langData: Record<string, string> | null;
  setSelectedLang: (lang: string) => void;
  fetchLanguage: () => Promise<void>;
  l: (key: string) => string | undefined;
}
//---------------------- main function ----------------------
const useLanguageStore = create<iLanguageStore>((set, get) => ({
  selectedLang: "en",
  langData: null,
 
  setSelectedLang: (lang) => {
    set({ selectedLang: lang });
    get().fetchLanguage(); // Fetch language data after changing selectedLang
  },

  // Function to fetch language data from the API
  fetchLanguage: async () => {
    const selectedLang =
      localStorage.getItem("languageLocalStorage") || get().selectedLang;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/language/${selectedLang}`
      );
      set({ langData: res.data });

    } catch (error) {
      console.error("Error fetching language data", error);
      set({ langData: null }); // Clear language data on error
    }
  },

  // Get specific translation
  l: (key) => {
    const langData = get().langData;
    if (!langData || !langData[key]) {
      // console.warn(`Missing translation for key: ${key}`);
    }
    return langData ? langData[key] : undefined;
  },
}));

// Custom hook to use the getLang function
export const useLanguage = (key: string) => {
  const getLang = useLanguageStore((state) => state.l);
  return getLang(key);
};

export default useLanguageStore;
