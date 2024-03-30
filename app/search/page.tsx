import HeaderWrapper from "@/components/header-wrapper";
import getSongsByTitle from "../server-actions/get-song-by-title";
import SearchInput from "@/components/search/search-input";
import SearchContent from "@/components/search/search-content";

interface SearchPageProps {
    searchParams: {
        title: string
    }
}

export const revalidate = 0;

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const songs = await getSongsByTitle(searchParams.title)

    return (
        <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
            <HeaderWrapper className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">Search</h1>
                    <SearchInput></SearchInput>
                </div>
            </HeaderWrapper>
            <SearchContent songs={songs}></SearchContent>
        </div>
    )
}