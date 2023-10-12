import React, { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type VideoGridItem = {
    id: string;
    title: string;
    channel: {
        id: string;
        name: string;
        profileUrl: string;
    };
    views: number;
    postedAt: Date;
    duration: number;
    thumbnailUrl: string;
    videoUrl: string;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
    notation: "compact",
});

const VideoGridItem = ({
    id,
    channel,
    videoUrl,
    views,
    duration,
    postedAt,
    title,
    thumbnailUrl,
}: VideoGridItem) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isVideoPlaying])

    return (
        <div
            className="flex flex-col gap-2"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}
        >
            <a href={`/watch?v=${id}`} className="relative aspect-video">
                <img
                    src={thumbnailUrl}
                    className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${isVideoPlaying ? "rounded-none" : "rounded-xl"
                        }`}
                />
                <div className="absolute right-1 bottom-1 bg-secondary-dark text-secondary text-xs px-1 rounded-lg">
                    {formatDuration(duration)}
                </div>
                <video src={videoUrl} ref={videoRef} muted playsInline className={`block h-full object-cover absolute inset-0 duration-100  transition-opacity ${isVideoPlaying ? 'opacity-100 delay-200' : 'opacity-0'}`}></video>
            </a>
            <div className="flex gap-2">
                <a href={`/@${channel.id}`} className="flex-shrink-0">
                    <img
                        src={channel.profileUrl}
                        alt={channel.name}
                        className="rounded-full h-12 w-12"
                    />
                </a>
                <div className="flex flex-col">
                    <a href={`/watch?v=${id}`} className="font-bold">
                        {title}
                    </a>
                    <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
                        {channel.name}
                    </a>
                    <div className="text-xs text-secondary-text">
                        {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoGridItem;
