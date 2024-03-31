import getPlaylist from "@/app/server-actions/get-playlist";
import getSongsByTitle from "@/app/server-actions/get-song-by-title";
import getUserPlaylists from "@/app/server-actions/get-user-playlists";
import HeaderWrapper from "@/components/header-wrapper";
import PlaylistPageBody from "@/components/playlist/playlist-page-body";
import PlaylistPageHeader from "@/components/playlist/playlist-page-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";

interface PlaylistIdPageProps {
    searchParams: {
        title: string
    }
    params: {
        playlistId: string
    }
}

// TODO: Add page loaders / skeletons
export default async function PlaylistIdPage({ searchParams, params }: PlaylistIdPageProps) {

    const playlist = await getPlaylist(params.playlistId)
    const songs = await getSongsByTitle(searchParams.title)
    const playlists = await getUserPlaylists()

    if (!playlist) {
        return redirect('/')
    }

    return (
        <ScrollArea className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
            <HeaderWrapper className="bg-gradient-to-b from-violet-700 ">
                <PlaylistPageHeader playlist={playlist}></PlaylistPageHeader>
            </HeaderWrapper>
            <PlaylistPageBody params={params} playlist={playlist} playlists={playlists!} songs={songs}></PlaylistPageBody>
        </ScrollArea >
    )
}