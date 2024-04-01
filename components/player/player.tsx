import { PlaylistWithSongsAndUsers } from "@/types";
import BoxWrapper from "../box-wrapper";
import PlayerContent from "./player-content";

interface PlayerProps {
    playlists: PlaylistWithSongsAndUsers[]
}

export default function Player({ playlists }: PlayerProps) {

    return (
        <div className="flex flex-row items-center justify-center">
            <BoxWrapper className="fixed bottom-2 w-[calc(100%-16px)] h-[80px]">
                <PlayerContent playlists={playlists}></PlayerContent>
            </BoxWrapper>
        </div>
    )
}