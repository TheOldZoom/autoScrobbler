import type { Config } from "./interfaces/Config";

const config: Config = {
  tracks: [
    {
      name: "Never See Me Again",
      artist: "Kanye West",
      album: "Unreleased",
    },
    {
      name: "I Wonder",
      artist: "Kanye West",
      album: "Graduation",
    },
  ],
  debug: false,
  timeout: 40,
};

export default config;
