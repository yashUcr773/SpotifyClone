import HeaderWrapper from "@/components/header-wrapper";
import PlaylistItem from "@/components/playlist-item";
import getSongs from "./server-actions/get-songs";
import PageContent from "@/components/page-content";
import { ScrollArea } from "@/components/ui/scroll-area";
import getUserPlaylists from "./server-actions/get-user-playlists";

export default async function Home() {
    const songs = await getSongs()
    const playlists = await getUserPlaylists()

    return (
        <ScrollArea className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <HeaderWrapper className="bg-gradient-to-b from-emerald-800">
                <div className="mb-2">
                    <h1 className="text-white text-3xl font-semibold">Welcome Back</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
                        {playlists?.sort((a, b) => b.songs.length - a.songs.length)?.slice(0, 4)?.map((playlist,i) => (
                            <PlaylistItem key={i} playlist={playlist}></PlaylistItem>
                        ))}
                    </div>
                </div>
            </HeaderWrapper>

            <div className="mt-2 mb-6 px-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-2xl font-semibold">
                        Newest Songs
                    </h1>
                </div>
                <div>
                    <PageContent songs={songs}></PageContent>
                </div>
            </div>
        </ScrollArea>
    );
}
