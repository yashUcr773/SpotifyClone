import HeaderWrapper from "@/components/header-wrapper";
import SongUpload from "@/components/song-upload";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function UploadPage() {

    return (
        <ScrollArea className="bg-neutral-900 rounded-lg h-full w-full overflow-y-auto flex flex-col">
            <HeaderWrapper className="bg-gradient-to-b from-orange-800 pb-40">
                <div className="mb-2">
                    <h1 className="text-white text-3xl font-semibold">Upload some of your favourites</h1>
                </div>
            </HeaderWrapper>
            <SongUpload></SongUpload>
        </ScrollArea>
    );
}