import { create } from 'zustand';

interface Channel {
  id: string;
  name: string;
  logo: string;
  streamUrl: string;
  category: string;
  verified: boolean;
}

interface Program {
  id: string;
  channel: string;
  title: string;
  description: string;
  start: string;
  end: string;
  category: string;
  rating: number;
  year: number;
}

interface Store {
  channels: Channel[];
  selectedChannel: Channel | null;
  programs: Program[];
  selectedYear: number;
  searchQuery: string;
  isDarkMode: boolean;
  favorites: string[];

  setChannels: (channels: Channel[]) => void;
  selectChannel: (channel: Channel) => void;
  setPrograms: (programs: Program[]) => void;
  setSelectedYear: (year: number) => void;
  setSearchQuery: (query: string) => void;
  toggleDarkMode: () => void;
  toggleFavorite: (channelId: string) => void;
}

const useStore = create<Store>((set) => ({
  channels: [],
  selectedChannel: null,
  programs: [],
  selectedYear: new Date().getFullYear(),
  searchQuery: '',
  isDarkMode: true,
  favorites: [],

  setChannels: (channels) => set({ channels }),
  selectChannel: (channel) => set({ selectedChannel: channel }),
  setPrograms: (programs) => set({ programs }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleFavorite: (channelId) =>
    set((state) => ({
      favorites: state.favorites.includes(channelId)
        ? state.favorites.filter((id) => id !== channelId)
        : [...state.favorites, channelId],
    })),
}));

export default useStore;
