import { signIn } from 'next-auth/react';

const Login: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Spotify Wrapped</h1>
      <button onClick={() => signIn('spotify')}>Log in with Spotify</button>
    </div>
  );
};

export default Login;
