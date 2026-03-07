import getPlaylist from "@/app/server-actions/get-playlist";
import getSongsByTitle from "@/app/server-actions/get-song-by-title";
import getUserPlaylists from "@/app/server-actions/get-user-playlists";
import HeaderWrapper from "@/components/header-wrapper";
import PlaylistPageBody from "@/components/playlist/playlist-page-body";
import PlaylistPageHeader from "@/components/playlist/playlist-page-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";

interface PlaylistIdPageProps {
    searchParams: Promise<{
        title?: string;
    }>;
    params: Promise<{
        playlistId: string;
    }>;
}

// TODO: Add page loaders / skeletons
export default async function PlaylistIdPage({ searchParams, params }: PlaylistIdPageProps) {

    const { playlistId } = await params;
    const { title } = await searchParams;
    const playlist = await getPlaylist(playlistId)
    const songs = await getSongsByTitle(title!)
    const playlists = await getUserPlaylists()

    if (!playlist) {
        return redirect('/')
    }

    return (
        <ScrollArea className="bg-neutral-900 rounded-lg w-full h-full overflow-auto">
            <HeaderWrapper className="bg-gradient-to-b from-violet-700 ">
                <PlaylistPageHeader playlist={playlist}></PlaylistPageHeader>
            </HeaderWrapper>
            <PlaylistPageBody params={{ playlistId }} playlist={playlist} playlists={playlists!} songs={songs}></PlaylistPageBody>
        </ScrollArea >
    )
}