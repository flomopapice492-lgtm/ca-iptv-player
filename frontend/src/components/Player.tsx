import React from 'react';
import { FiPlay, FiPause, FiVolume2, FiMaximize } from 'react-icons/fi';

interface PlayerProps {
  channel: any;
  onFullscreen?: () => void;
}

const Player: React.FC<PlayerProps> = ({ channel, onFullscreen }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLDivElement>(null);

  if (!channel) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Select a channel to start streaming</p>
      </div>
    );
  }

  return (
    <div
      ref={videoRef}
      className="w-full bg-black rounded-lg overflow-hidden shadow-2xl group"
    >
      {/* Video Container */}
      <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={channel.streamUrl}
          className="absolute top-0 left-0 w-full h-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={channel.name}
        />

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white rounded-full p-4 hover:bg-red-600 transition-colors"
          >
            {isPlaying ? (
              <FiPause size={32} className="text-black" />
            ) : (
              <FiPlay size={32} className="text-black ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Channel Info */}
      <div className="p-4 bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {channel.logo && (
              <img
                src={channel.logo}
                alt={channel.name}
                className="w-12 h-12 rounded object-cover"
              />
            )}
            <div>
              <h3 className="text-lg font-bold">{channel.name}</h3>
              <p className="text-sm text-gray-400">{channel.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
              <FiVolume2 size={20} />
            </button>
            <button
              onClick={onFullscreen}
              className="p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <FiMaximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
