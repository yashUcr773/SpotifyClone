import getPlaylist from "@/app/server-actions/get-playlist";
import getSongsByTitle from "@/app/server-actions/get-song-by-title";
import HeaderWrapper from "@/components/header-wrapper";
import MediaItem from "@/components/media-item";
import PlaylistPageHeader from "@/components/playlist/playlist-page-header";
import SearchContent from "@/components/search/search-content";
import SearchInput from "@/components/search/search-input";
import { PlusCircle } from "lucide-react";

interface PlaylistIdPageProps {
    searchParams: {
        title: string
    }
    params: {
        playlistId: string
    }
}

export default async function PlaylistIdPage({ searchParams, params }: PlaylistIdPageProps) {

    const playlist = await getPlaylist(params.playlistId)
    const songs = await getSongsByTitle(searchParams.title)

    if (!playlist) {
        return null
    }

    return (
        <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
            <HeaderWrapper className="bg-gradient-to-b from-violet-700 ">
                <PlaylistPageHeader playlist={playlist}></PlaylistPageHeader>
            </HeaderWrapper>
            {
                playlist.songs.length > 0 ? (
                    playlist.songs.map((song) => (
                        <MediaItem data={song} key={song.id}></MediaItem>
                    ))
                ) : (
                    <div className="w-full text-white flex flex-col gap-y-4 p-4">
                        <span className="text-2xl font font-semibold tracking-wide">Let's find something for your playlist</span>
                        <div className="w-11/12 flex flex-col gap-y-2 max-w-2xl">
                            <SearchInput apiUrl={`/playlist/${params.playlistId}`} placeholder="Search for songs"></SearchInput>
                            <SearchContent songs={songs} className="bg-neutral-800 rounded-lg py-4"></SearchContent>
                        </div>
                    </div>
                )
            }
        </div >
    )
}