# Spotify Clone

Demo - [spotifyclone.uk](https://spotifyclone.uk)

Welcome to the Spotify Clone project! This project aims to replicate some of the core functionalities of Spotify, allowing users to listen to music, create playlists, upload songs, and much more. Below you'll find details on its functionality, the technology stack used, how to run it locally, environment variables needed, attribution, and planned features.

## Functionality

- **Listen to Music**: Enjoy streaming music seamlessly.
- **Authentication**: User authentication is handled by NextAuth, with options for external authentication via Google and GitHub.
- **Upload Songs**: Users can upload their own songs to the platform.
- **Create Playlists**: Build custom playlists to organize your favorite tracks.
- **Add Songs to Playlists**: Flexibly manage your playlists by adding or removing songs.
- **Fully Responsive**: Ensures a smooth experience across various devices.
- **Feedback Toasts**: Receive instant feedback through toasts for actions or errors.

## Tech Stack

- **Next.js 14**: Powering the frontend and server-side rendering.
- **Form Validation**: Implemented using Zod and React Hook Form.
- **Toasts**: Utilizing React Toast for feedback messages.
- **Authentication**: Managed by NextAuth, supporting Google and GitHub OAuth.
- **Database**: PostgreSQL from neon.tech.
- **Upload Management**: Handled by UploadThing.
- **Components**: Utilizing components from Shadcn.
- **CSS**: Styled with Tailwind CSS.
- **Icons**: Leveraging Lucide React and React Icons.
- **Database ORM**: Prisma for database operations.
- **State Management**: Utilizing Zustand for state management.

## Running Locally

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yashUcr773/spotify_clone_full_stack.git`.
2. Navigate to the project directory: `cd spotify_clone_full_stack`.
3. Install dependencies: `npm install`.
4. Run the development server: `npm run dev`.
5. The application will be accessible at `http://localhost:3000` by default.

## Environment Variables

Ensure you have the following environment variables set up:

- `DATABASE_URL`: URL for connecting to the PostgreSQL database.
- `NEXTAUTH_SECRET`: Secret key for NextAuth.
- `GITHUB_ID` and `GITHUB_SECRET`: Client ID and secret for GitHub OAuth.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Client ID and secret for Google OAuth.
- `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`: Secret and App ID for UploadThing.

## Attribution

- This is a demo project and not intended for commercial use. All music belongs to respective artists and is used for demonstration purposes only.
- The project idea was inspired by [Code with Antonio](https://www.youtube.com/watch?v=2aeMRB8LL4o).

## Planned Features

- [x] Allow song upload
- [x] External OAuth
- [ ] Favorite functionality.
- [x] Playlists
- [ ] Share Playlists
- [ ] Store last played to resume on reload.
- [ ] Album and artist functionality.
- [ ] Move from UploadThing to self-hosted S3 to bypass storage limits.

Feel free to contribute and enhance the project!
