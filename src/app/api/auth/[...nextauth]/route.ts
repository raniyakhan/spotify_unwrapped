import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Define a custom token type
interface CustomJWT extends JWT {
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: 'https://accounts.spotify.com/authorize?scope=user-top-read',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }): Promise<CustomJWT> {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token as CustomJWT;
    },
    async session({ session, token }) {
      const customToken = token as CustomJWT;
      session.accessToken = customToken.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



