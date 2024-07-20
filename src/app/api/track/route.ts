import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID as string;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;

async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
    },
  });

  return await response.json();
}

async function getTrackInfo(access_token: string) {
  const response = await fetch('https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT', {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token },
  });

  return await response.json();
}

export async function GET(req: NextRequest) {
  try {
    const tokenResponse = await getToken();
    const trackInfo = await getTrackInfo(tokenResponse.access_token);
    return NextResponse.json(trackInfo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch track information' }, { status: 500 });
  }
}
