
# GPT4o - Music Bot

**Version:** 6.0.0  
**Author:** mahaaranii  

## Description

GPT4o is a powerful and customizable music bot for Discord, offering support for multiple music sources including Spotify, Deezer, Apple Music, and **YouTube**. With advanced audio filters and custom features, GPT4o provides a rich music experience that is easy to use with simple, intuitive commands.

## Features

- 🎵 **Multi-source support**: Spotify, Deezer, Apple Music, and YouTube.
- 🔄 **Seamless playback** with advanced audio filters.
- 💡 **Custom commands** to enhance your Discord server.
- 🎨 **Rich UI** using Discord.js for enhanced interactivity.
- 🚀 **Optimized performance** with rate-limiting and load balancing.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/officialbloom711/GPt4o-Music-Bot-Discord.git
   cd GPT4o
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file (refer to `.env.example`).

4. Run the bot:

   ```bash
   npm start
   ```

## Configuration

GPT4o uses a `config.yml` file to manage its configuration. Customize it to your liking by adjusting settings such as command prefix, music sources, and API keys.

## Commands (Prefix-based)

Once the bot is running, you can use the following commands (with the default prefix `!`) to control the bot:

- `!play [song name or link]` - Plays a song from YouTube, Spotify, etc.
- `!skip` - Skips to the next song in the queue.
- `!stop` - Stops the music and clears the queue.
- `!pause` - Pauses the currently playing song.
- `!resume` - Resumes paused music.
- `!queue` - Displays the current playlist.
- `!volume [1-100]` - Adjusts the volume of the bot.
- `!np` - Shows the song currently playing.
- `!remove [position]` - Removes a song from the queue at the specified position.
- `!shuffle` - Shuffles the current queue.
- `!filter [type]` - Applies a filter to the current track (e.g., bassboost, nightcore).

## Dependencies

Here are some of the main dependencies used in GPT4o:

- **[discord.js](https://discord.js.org/)** - Powerful library for interacting with the Discord API.
- **[axios](https://github.com/axios/axios)** - Promise-based HTTP client.
- **[express](https://expressjs.com/)** - Minimalist web framework for Node.js.
- **[dotenv](https://github.com/motdotla/dotenv)** - Loads environment variables from `.env` file.
- **[shoukaku](https://www.npmjs.com/package/shoukaku)** - Lightweight lavalink client for Node.js.
- **[kazagumo](https://www.npmjs.com/package/kazagumo)** - Music framework built on Lavalink.

For a complete list of dependencies, check the [package.json](./package.json) file.

## Contributing

We welcome contributions! Please fork this repository, make your changes, and open a pull request. Follow the guidelines below for a smooth contribution process.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
