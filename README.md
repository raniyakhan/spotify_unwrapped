# Spotify (un)Wrapped

A web application that replicates the yearly Spotify Wrapped, allowing users to log in with their Spotify account and view their top artists and tracks anytime. This project is built with Next.js, TypeScript, TailwindCSS, and the Spotify API.

## Features

- **Spotify OAuth Integration**: Users can securely log in with their Spotify account using OAuth 2.0.
- **Top Artists and Tracks**: The app fetches and displays the user's top artists and tracks based on their listening habits.
- **Responsive Design**: The application is designed to be fully responsive and mobile-friendly.
- **Error Handling**: Proper error handling ensures a smooth user experience even in cases of network issues or token expiration.

## Tech Stack

- **Next.js**: React framework for server-rendered applications and static websites.
- **TypeScript**: Typed JavaScript to enhance code reliability and maintainability.
- **Spotify API**: Used to fetch user-specific data such as top artists and tracks.
- **OAuth 2.0**: Secure authentication with Spotify.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **TailwindCSS**: A utility-first CSS framework for rapidly building custom designs.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/spotify-wrapped-clone.git
   cd spotify-wrapped-clone
   
2. **Install Dependencies:**
   ```bash
   npm install

3. **Set up environment variables:**
   Create a `.env.local` file in the root of your project and add the following:
   ```makefile
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   NEXTAUTH_URL=http://localhost:3000

4. **Run the development server:**
    ```bash
   npm run dev

## Usage

- **Login with Spotify:** On the homepage, click the "Log in with Spotify" button to authenticate your account.
- **View Your Wrapped:** After logging in, you will be redirected to the Wrapped page where you can view your top artists and tracks.

  ------

Sometimes I have embarassing songs in my Spotify Wrapped at the end of the year. This is a prevention measure. For me, and (maybe) for you.
