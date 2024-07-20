// // /app/api/spotify/top-tracks/route.ts

// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function GET(req: NextRequest) {
//   const token = await getToken({ req });

//   if (!token || !token.accessToken) {
//     return NextResponse.json({ error: 'No access token found' }, { status: 401 });
//   }

//   const accessToken = token.accessToken as string;

//   const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1', {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//     },
//   });

//   if (!response.ok) {
//     return NextResponse.json({ error: 'Failed to fetch top tracks' }, { status: 400 });
//   }

//   const data = await response.json();
//   return NextResponse.json(data.items[0]); // Assuming you want only the top track
// }


// /app/api/spotify/top-tracks/route.ts

// /app/api/spotify/top-tracks/route.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token || !token.accessToken) {
      return NextResponse.json({ error: 'No access token found' }, { status: 401 });
    }

    const accessToken = token.accessToken as string;

    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch top tracks:', response.statusText, errorText);
      return NextResponse.json({ error: 'Failed to fetch top tracks' }, { status: 500 });
    }

    const data = await response.json();
    console.log('Top Tracks:', data); // Log the response data
    return NextResponse.json(data.items); // Return the top 5 tracks
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch top tracks' }, { status: 500 });
  }
}

