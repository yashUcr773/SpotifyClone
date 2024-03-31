import { Playlist, Song, User } from "@prisma/client";

export type AUTH_MODAL_SOCIALS = 'github' | 'google'

export type PlaylistWithSongs = Playlist & {
    songs: Song[],
}

export type PlaylistWithSongsAndUsers = Playlist & {
    songs: Song[],
    user: User
}