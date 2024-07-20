import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.accessToken) {
    return NextResponse.json({ error: 'No access token found' }, { status: 401 });
  }

  const accessToken = token.accessToken as string;

  const response = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5&offset=0', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch top artists' }, { status: 500 });
  }

  const data = await response.json();
  return NextResponse.json(data.items); // Return the top 5 artists
}
