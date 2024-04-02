import { Playlist, Song } from '@prisma/client';
import { create } from 'zustand';

export type ModalType = 'signup' | 'signin' | 'editPlaylist' | 'deletePlaylist' | 'editSong' | 'deleteSong';

interface ModalData {
    playlist?: Playlist
    song?: Song
}

interface ModalStore {
    type: ModalType | null
    data: ModalData
    isOpen: boolean,
    openModal: (type: ModalType, data?: ModalData) => void
    closeModal: () => void
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    openModal: ((type, data = {}) => set({ isOpen: true, type, data })),
    closeModal: (() => set({ isOpen: false, type: null })),
}))