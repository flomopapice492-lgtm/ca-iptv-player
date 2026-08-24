import React from 'react';
import { FiCheckCircle, FiShield, FiGithub } from 'react-icons/fi';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📺</div>
          <h1 className="text-4xl font-bold mb-4">Canadian IPTV Player</h1>
          <p className="text-xl text-gray-400">Legal, Modern, Full-Featured IPTV with EPG</p>
        </div>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">✨ Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '✅',
                title: '100% Legal',
                desc: 'Uses CRTC-approved broadcasters only',
              },
              {
                icon: '📺',
                title: 'Live Channels',
                desc: 'CBC, CTV, Global, Citytv, TVO, APTN and more',
              },
              {
                icon: '📅',
                title: 'Full EPG',
                desc: 'Complete program guide with 1998-2026 filtering',
              },
              {
                icon: '🔍',
                title: 'Smart Search',
                desc: 'Search channels and programs instantly',
              },
              {
                icon: '📱',
                title: 'Responsive',
                desc: 'Works on desktop, tablet, and mobile',
              },
              {
                icon: '🌙',
                title: 'Dark Mode',
                desc: 'Easy on the eyes, especially at night',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Legal Info */}
        <section className="mb-12 bg-gray-800 rounded-lg p-8">
          <div className="flex items-center space-x-3 mb-4">
            <FiShield size={28} className="text-green-500" />
            <h2 className="text-2xl font-bold">Legal & Compliance</h2>
          </div>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start space-x-3">
              <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <p>All channels are from CRTC-licensed broadcasters</p>
            </div>
            <div className="flex items-start space-x-3">
              <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <p>Uses official streaming URLs from broadcasters</p>
            </div>
            <div className="flex items-start space-x-3">
              <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <p>EPG data from open-source, freely licensed repositories</p>
            </div>
            <div className="flex items-start space-x-3">
              <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <p>Open source - full transparency and auditability</p>
            </div>
            <div className="flex items-start space-x-3">
              <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <p>Licensed under MIT - free for commercial and private use</p>
            </div>
          </div>
          <a
            href="/LEGAL.md"
            className="inline-block mt-6 btn-primary"
          >
            Read Full Legal Documentation
          </a>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🛠️ Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Frontend</h3>
              <ul className="space-y-2 text-gray-400">
                <li>⚛️ React 18 with TypeScript</li>
                <li>🎨 Tailwind CSS</li>
                <li>🎬 Video.js player</li>
                <li>📦 Zustand state management</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">Backend</h3>
              <ul className="space-y-2 text-gray-400">
                <li>🚀 Node.js + Express</li>
                <li>📊 EPG data aggregation</li>
                <li>⚡ Caching system</li>
                <li>🔒 Security & rate limiting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">📡 Available Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'CBC Gem', logo: '🍁' },
              { name: 'CTV', logo: '📺' },
              { name: 'Global TV', logo: '🌍' },
              { name: 'Citytv', logo: '🏙️' },
              { name: 'TVO', logo: '🎓' },
              { name: 'APTN', logo: '🎨' },
            ].map((ch, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{ch.logo}</div>
                <p className="font-semibold">{ch.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub */}
        <section className="text-center bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">🚀 Open Source</h2>
          <p className="text-gray-400 mb-6">
            This project is fully open source. Contribute on GitHub!
          </p>
          <a
            href="https://github.com/flomopapice492-lgtm/ca-iptv-player"
            className="inline-flex items-center space-x-2 btn-primary"
          >
            <FiGithub size={20} />
            <span>View on GitHub</span>
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
