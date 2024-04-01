import { Song } from "@prisma/client"
import { create } from "zustand"

interface AudioPlayerStore {
    songs: Song[]
    activeSong?: Song
    setActiveSong: (id: Song) => void
    setAllSongs: (ids: Song[]) => void
    resetSongs: () => void
}

const useAudioPlayer = create<AudioPlayerStore>((set) => ({
    songs: [],
    activeSong: undefined,
    setActiveSong: (activeSong: Song) => set({ activeSong: activeSong }),
    setAllSongs: (songs: Song[]) => set({ songs: songs }),
    resetSongs: () => set({ songs: [], activeSong: undefined }),
}))

export default useAudioPlayer;