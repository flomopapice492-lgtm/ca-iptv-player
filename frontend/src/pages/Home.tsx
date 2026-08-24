import React, { useEffect } from 'react';
import Player from '../components/Player';
import ChannelList from '../components/ChannelList';
import EPGGuide from '../components/EPGGuide';
import useStore from '../store/useStore';
import { useChannels } from '../hooks/useChannels';
import { useEPG } from '../hooks/useEPG';

const Home: React.FC = () => {
  const { selectedChannel, selectChannel, selectedYear, setSelectedYear } = useStore();
  const { channels, loading: channelsLoading } = useChannels();
  const { programs, loading: epgLoading } = useEPG(selectedChannel?.id, selectedYear);

  useEffect(() => {
    if (channels.length > 0 && !selectedChannel) {
      selectChannel(channels[0]);
    }
  }, [channels, selectedChannel, selectChannel]);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Channels */}
          <div className="lg:col-span-1 h-96 lg:h-screen lg:sticky lg:top-20">
            {channelsLoading ? (
              <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>
            ) : (
              <ChannelList
                channels={channels}
                onChannelSelect={selectChannel}
                selectedChannel={selectedChannel}
              />
            )}
          </div>

          {/* Center - Player */}
          <div className="lg:col-span-2">
            <Player channel={selectedChannel} />

            {/* Channel Info */}
            {selectedChannel && (
              <div className="mt-6 bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedChannel.name}</h2>
                <p className="text-gray-400 mb-4">{selectedChannel.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700 rounded p-3">
                    <p className="text-sm text-gray-400">Category</p>
                    <p className="font-semibold">{selectedChannel.category}</p>
                  </div>
                  <div className="bg-gray-700 rounded p-3">
                    <p className="text-sm text-gray-400">License</p>
                    <p className="font-semibold text-green-400">
                      {selectedChannel.license || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded p-3">
                    <p className="text-sm text-gray-400">Country</p>
                    <p className="font-semibold">{selectedChannel.country}</p>
                  </div>
                  <div className="bg-gray-700 rounded p-3">
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="font-semibold text-green-400">✓ Verified</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* EPG Guide Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">📅 Program Guide</h3>
          <EPGGuide
            programs={programs}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            loading={epgLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
