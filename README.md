
# GPT4o - Music Bot

**Version:** 6.0.0  
**Author:** mahaaranii  

## Description

GPT4o is a powerful and customizable music bot for Discord. It supports a wide variety of music sources, including Spotify, Deezer, and Apple Music, with advanced audio filters and custom features. With GPT4o, you can enjoy a seamless music experience with a simple, user-friendly interface.

## Features

- 🎵 **Multi-source support**: Spotify, Deezer, Apple Music, and more.
- 🔄 **Seamless playback** with advanced audio filters.
- 💡 **Custom commands** to enhance your Discord server.
- 🎨 **Rich UI** using Discord.js for enhanced interactivity.
- 🚀 **Optimized performance** with rate-limiting and load balancing.
  
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/GPT4o.git
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

## Dependencies

Here are some of the main dependencies used in GPT4o:

- **[discord.js](https://discord.js.org/)** - Powerful library for interacting with the Discord API.
- **[axios](https://github.com/axios/axios)** - Promise-based HTTP client.
- **[express](https://expressjs.com/)** - Minimalist web framework for Node.js.
- **[dotenv](https://github.com/motdotla/dotenv)** - Loads environment variables from `.env` file.
- **[shoukaku](https://www.npmjs.com/package/shoukaku)** - Lightweight lavalink client for Node.js.
- **[kazagumo](https://www.npmjs.com/package/kazagumo)** - Music framework built on Lavalink.

For a complete list of dependencies, check the [package.json](./package.json) file.

## Usage

Once the bot is running, invite it to your server and use the commands to play music, manage queues, and more. GPT4o is designed to be intuitive, with commands such as:

- `/play [song name or link]` - Plays a song.
- `/skip` - Skips to the next song in the queue.
- `/queue` - Displays the current playlist.

## Contributing

We welcome contributions! Please fork this repository, make your changes, and open a pull request. Follow the guidelines below for a smooth contribution process.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
