import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface PlayerOptions {
  autoplay: boolean;
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  sources: Array<{
    src: string;
    type: string;
  }>;
}

export const usePlayer = (videoRef: React.RefObject<HTMLDivElement>, options: PlayerOptions) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    playerRef.current = videojs(videoRef.current, options, function onReady() {
      console.log('Video player ready');
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoRef, options]);

  return playerRef.current;
};
