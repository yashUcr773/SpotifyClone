import PlaylistCover from "../playlist-cover";
import { useParams, useRouter } from "next/navigation";
import { PlaylistWithSongsAndUsers } from "@/types";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

interface SidebarLibraryPlaylistItemProps {
    playlist: PlaylistWithSongsAndUsers
}
export default function SidebarLibraryPlaylistItem({ playlist }: SidebarLibraryPlaylistItemProps) {

    const router = useRouter()
    const params = useParams()
    const active = params.playlistId === playlist.id


    const handleClick = () => {
        return router.push(`/playlist/${playlist.id}`)
    }





    return (
        <div className={cn("flex flex-row cursor-pointer mx-2 my-1 px-4 py-2 items-center justify-start gap-x-4 hover:bg-neutral-800/50 rounded-lg", active && 'bg-neutral-700/30 hover:bg-neutral-700/40')} onClick={handleClick}>
            <PlaylistCover iconSize={24} coverSize={12} playlist={playlist}></PlaylistCover>
            <div className="flex flex-col gap-y-1">
                <span className="text-white">{playlist.name}</span>
                <div className="flex text-white gap-x-1">
                    <span className="text-white">{playlist.songs.length} songs</span>
                    .
                    <span className="text-white">{playlist.user.name}</span>
                </div>
            </div>
        </div>
    )
}