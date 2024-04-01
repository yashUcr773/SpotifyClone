import { PlaylistWithSongsAndUsers } from "@/types"
import { Song } from "@prisma/client"
import { create } from "zustand"

interface AudioPlayerStore {
    songs: Song[]
    activeSong?: Song
    activePlaylist?: PlaylistWithSongsAndUsers
    setActivePlaylist: (playlist: PlaylistWithSongsAndUsers) => void
    setActiveSong: (id: Song) => void
    setAllSongs: (ids: Song[]) => void
    resetSongs: () => void
}

const useAudioPlayer = create<AudioPlayerStore>((set) => ({
    songs: [],
    activeSong: undefined,
    activePlaylist: undefined,
    setActiveSong: (activeSong: Song) => set({ activeSong: activeSong }),
    setActivePlaylist: (playlist: PlaylistWithSongsAndUsers) => set({ activePlaylist: playlist }),
    setAllSongs: (songs: Song[]) => set({ songs: songs }),
    resetSongs: () => set({ songs: [], activeSong: undefined, activePlaylist: undefined }),
}))

export default useAudioPlayer;