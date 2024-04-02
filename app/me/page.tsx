import HeaderWrapper from "@/components/header-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import getUser from "../server-actions/get-user";
import SongList from "@/components/song-list";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function MyPage() {


    const user = await getUser()

    if (!user) {
        redirect('/')
    }

    return (
        <ScrollArea className="bg-neutral-900 rounded-lg w-full h-full overflow-auto">
            <HeaderWrapper className="bg-gradient-to-b from-blue-700 ">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">Hello, {user?.name?.split(' ')[0]}</h1>
                </div>
            </HeaderWrapper>
            <div className="flex flex-1 flex-col items-center justify-center w-full h-full mx-auto">
                <h3 className="text-white text-2xl font-semibold text-left w-full pl-12">My Songs</h3>
                <ScrollArea className="w-11/12 text-white flex flex-col gap-y-4 p-4 mx-auto" >
                    <SongList forceShow showDeleteButton showEditButton songs={user?.uploadedSongs!} playlists={user?.playlists!} className={cn("h-fit max-h-[480px]")}></SongList>
                </ScrollArea>
            </div>
        </ScrollArea >
    )
}