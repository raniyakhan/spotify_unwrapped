// "use client";


// import { useState, useEffect } from 'react';

// const Track: React.FC = () => {
//   const [trackInfo, setTrackInfo] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTrackInfo = async () => {
//       try {
//         const response = await fetch('/api/top-tracks');
//         if (!response.ok) {
//           throw new Error('Failed to fetch');
//         }
//         const data = await response.json();
//         setTrackInfo(data);
//       } catch (error) {
//         setError('Failed to fetch track information');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrackInfo();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h1>Track Information</h1>
//       {trackInfo && (
//         <div>
//           <h2>{trackInfo.name}</h2>
//           <p>{trackInfo.artists.map((artist: any) => artist.name).join(', ')}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Track;
// /pages/track.tsx

"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Track: React.FC = () => {
  const { data: session, status } = useSession();
  const [tracks, setTracks] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrackInfo = async () => {
      if (status === 'authenticated') {
        try {
          const [trackResponse, artistResponse] = await Promise.all([
            fetch('/api/top-tracks'),
            fetch('/api/top-artists')
          ]);

          if (!trackResponse.ok || !artistResponse.ok) {
            throw new Error('Failed to fetch');
          }

          const trackData = await trackResponse.json();
          const artistData = await artistResponse.json();

          setTracks(trackData);
          setArtists(artistData);
        } catch (error) {
          console.error('Error fetching information:', error);
          setError('Failed to fetch information');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTrackInfo();
  }, [status]);

  if (loading) return <div className="flex justify-center items-center h-screen"><div>Loading...</div></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><div>{error}</div></div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 mt-8"> Spotify (un)Wrapped</h1>
      <Link href="/" className="mb-8 px-4 py-2 bg-blue-500 text-white">go home</Link>
      {tracks.length > 0 && (
        <div className="w-full mb-8">
          <h2 className="text-2xl font-bold mb-4">Top Tracks</h2>
          <div className="space-y-4">
            {tracks.map((track) => (
              <div key={track.id} className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold">{track.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{track.artists.map((artist: any) => artist.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {artists.length > 0 && (
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4">Top Artists</h2>
          <div className="space-y-4">
            {artists.map((artist) => (
              <div key={artist.id} className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold">{artist.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{artist.genres.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Track;
