import BoxWrapper from "../box-wrapper";
import PlayerContent from "./player-content";

export default function Player() {

    return (
        <div className="flex flex-row items-center justify-center">
            <BoxWrapper className="fixed bottom-2 w-[calc(100%-16px)] h-[80px]">
                <PlayerContent></PlayerContent>
            </BoxWrapper>
        </div>
    )
}