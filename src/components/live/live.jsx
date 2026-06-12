'use client';

import { getMatchEvents } from '@/app/fixtures/events';
import { useEffect, useState } from 'react';

export default function LiveMatchCenter({ match, onClose }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      const data = await getMatchEvents(match.fixture.id);
      if (data?.response) {
        // Reverse array to show the latest events at the top
        setEvents(data.response.reverse());
      }
      setLoading(false);
    };

    fetchTimeline();

    // Auto-refresh match events every 20 seconds for real-time simulation
    const interval = setInterval(fetchTimeline, 20000);
    return () => clearInterval(interval);
  }, [match.fixture.id]);

  return (
    <div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-end z-50 animate-fade-in'>
      <div className='w-full max-w-xl bg-zinc-950 border-l border-zinc-800 p-6 overflow-y-auto text-white flex flex-col h-full'>
        {/* Header Control */}
        <div className='flex justify-between items-center mb-6'>
          <span className='bg-red-600 text-xs uppercase px-2 py-0.5 rounded animate-pulse font-bold tracking-wider'>
            Live Tracking
          </span>
          <button
            onClick={onClose}
            className='text-zinc-400 hover:text-white transition-colors text-sm font-medium'
          >
            ✕ Close
          </button>
        </div>

        {/* Scoreboard Block */}
        <div className='bg-zinc-900 border border-zinc-800 p-6 rounded-lg text-center mb-6'>
          <div className='flex justify-between items-center px-4'>
            <div className='w-1/3 font-bold text-sm md:text-base'>{match.teams.home.name}</div>
            <div className='w-1/3 text-3xl font-mono text-emerald-400 font-bold'>
              {match.goals.home} - {match.goals.away}
            </div>
            <div className='w-1/3 font-bold text-sm md:text-base'>{match.teams.away.name}</div>
          </div>
          <p className='text-xs text-zinc-500 mt-3 tracking-widest uppercase'>
            {match.fixture.status.long} ({match.fixture.status.elapsed}')
          </p>
        </div>

        {/* Video Player/Iframe Section Placeholder */}
        <div className='w-full aspect-video bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col items-center justify-center mb-6 p-4 text-center'>
          <svg
            className='w-8 h-8 text-zinc-600 mb-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <p className='text-xs text-zinc-400 max-w-xs'>
            Video feeds restricted due to broadcast rights. Embedding custom authenticated
            client-side HLS streams can occur directly inside this container layer.
          </p>
        </div>

        {/* Live Incidents Feed */}
        <h3 className='font-bold text-zinc-400 uppercase text-xs tracking-wider mb-3'>
          Live Match Incidents
        </h3>
        {loading ? (
          <p className='text-xs text-zinc-500'>Updating timeline events...</p>
        ) : events.length === 0 ? (
          <p className='text-xs text-zinc-500 bg-zinc-900/40 p-4 rounded border border-zinc-900 text-center'>
            Tactical match buildup occurring. No significant events recorded yet.
          </p>
        ) : (
          <div className='space-y-3 flex-1 overflow-y-auto pr-1'>
            {events.map((event, idx) => (
              <div
                key={idx}
                className='p-3 bg-zinc-900/50 border border-zinc-900 rounded flex items-start gap-3 text-sm'
              >
                <span className='font-mono text-emerald-400 font-bold bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-xs'>
                  {event.time.elapsed}'
                </span>
                <div>
                  <span className='font-semibold text-zinc-200'>{event.player.name}</span>
                  <span className='text-zinc-500 text-xs ml-1'>({event.type})</span>
                  <p className='text-xs text-zinc-400 mt-0.5'>
                    {event.detail} • {event.team.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
