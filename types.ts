export type AUTH_MODAL_SOCIALS = 'github' | 'google'

export interface UserDetails {
    id: string;
    first_name: string
    last_name: string
    full_name?: string
    avatar_url?: string
}

export interface Song {
    id: string
    user_id: string
    author: string
    title: string
    song_path: string
    image_path: string
}