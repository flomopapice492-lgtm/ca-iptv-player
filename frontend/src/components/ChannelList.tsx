import React from 'react';
import { FiStar, FiSearch } from 'react-icons/fi';
import useStore from '../store/useStore';

interface ChannelListProps {
  channels: any[];
  onChannelSelect: (channel: any) => void;
  selectedChannel?: any;
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  onChannelSelect,
  selectedChannel,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { favorites, toggleFavorite } = useStore();

  const filteredChannels = channels.filter((ch) =>
    ch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-gray-800 rounded-lg">
      {/* Search */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-primary pl-10"
          />
        </div>
      </div>

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filteredChannels.map((channel) => (
          <div
            key={channel.id}
            onClick={() => onChannelSelect(channel)}
            className={`p-3 border-b border-gray-700 cursor-pointer transition-colors ${
              selectedChannel?.id === channel.id
                ? 'bg-red-600 hover:bg-red-700'
                : 'hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                {channel.logo && (
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="w-8 h-8 rounded flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-semibold truncate">{channel.name}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {channel.category}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(channel.id);
                }}
                className="ml-2 text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FiStar
                  size={16}
                  fill={favorites.includes(channel.id) ? 'currentColor' : 'none'}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredChannels.length === 0 && (
        <div className="flex items-center justify-center h-32 text-gray-400">
          <p>No channels found</p>
        </div>
      )}
    </div>
  );
};

export default ChannelList;
