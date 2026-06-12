'use client';

import { useEffect, useState } from 'react';
import { getLiveMatches } from './libs/api-football';
import LiveMatchCenter from '@/components/live/live';

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await getLiveMatches();
      if (data?.response) {
        setMatches(data.response);
      }
      setLoading(false);
    };

    fetchMatches();

    // Poll the overall match list layout every 60 seconds
    const globalInterval = setInterval(fetchMatches, 60000);
    return () => clearInterval(globalInterval);
  }, []);

  if (loading)
    return <div className='p-8 bg-black text-zinc-400 min-h-screen'>Loading live matches...</div>;

  return (
    <div className='p-8 bg-black min-h-screen text-white'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex items-center gap-3 mb-8'>
          <h1 className='text-3xl font-extrabold tracking-tight'>Live Football Dashboard</h1>
          <span className='h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse mt-2' />
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          {matches.map((match) => (
            <div
              key={match.fixture.id}
              onClick={() => setSelectedMatch(match)}
              className='bg-zinc-900/40 border border-zinc-800 p-5 rounded-xl hover:border-emerald-500/50 transition-all duration-200 cursor-pointer group hover:bg-zinc-900/80'
            >
              <div className='flex justify-between items-center mb-4'>
                <span className='font-medium text-zinc-300 group-hover:text-white transition-colors'>
                  {match.teams.home.name}
                </span>
                <span className='text-xl font-mono font-bold bg-zinc-950 border border-zinc-800 px-3 py-1 rounded text-emerald-400 shadow-inner'>
                  {match.goals.home} - {match.goals.away}
                </span>
                <span className='font-medium text-zinc-300 group-hover:text-white transition-colors text-right'>
                  {match.teams.away.name}
                </span>
              </div>

              <div className='flex justify-between items-center border-t border-zinc-800/60 pt-3 mt-2 text-xs'>
                <span className='text-zinc-500 font-mono'>
                  {match.fixture.status.long} • {match.fixture.status.elapsed}'
                </span>
                <span className='text-emerald-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1'>
                  Track Live Match ➔
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conditional Rendering Layer for the Tracking Sidepanel */}
      {selectedMatch && (
        <LiveMatchCenter match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
}
