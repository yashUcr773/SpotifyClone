import HeaderWrapper from "@/components/header-wrapper";
import getSongsByTitle from "../server-actions/get-song-by-title";
import SearchInput from "@/components/search/search-input";
import SongList from "@/components/song-list";
import getUserPlaylists from "../server-actions/get-user-playlists";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchPageProps {
    searchParams: {
        title: string
    }
}

// TODO: Add infinite loader with tanstack query
export default async function SearchPage({ searchParams }: SearchPageProps) {
    const songs = await getSongsByTitle(searchParams.title)
    const playlists = await getUserPlaylists()


    return (
        <ScrollArea className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
            <HeaderWrapper className="bg-gradient-to-b from-cyan-800 pb-0">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">Search</h1>
                    <SearchInput apiUrl="/search" placeholder="What do you want to listen to?"></SearchInput>
                </div>
            </HeaderWrapper>
            <div className="w-11/12 mx-auto">
                <SongList songs={songs} playlists={playlists!} className="h-full px-6 py-4"></SongList>
            </div>
        </ScrollArea>
    )
}