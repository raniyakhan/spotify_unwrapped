"use client";

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Login from './components/Login';
import Link from 'next/link';

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
      <button onClick={() => signOut()}>Sign out</button>
      <Link href="/track">View your Spotify Wrapped</Link>
    </div>
  );
};

export default Home;
