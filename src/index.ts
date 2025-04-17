import dotenv from "dotenv";
dotenv.config();
import { sleep } from "bun";
import Config from "./config";
import Logger from "./utils/logger";
import generateSessionKey from "./utils/session";
import Scrobbler from "./structures/Scrobbler";
import generateTimestamp from "./utils/timestamp";

async function main() {
  if (
    !(
      process.env.API &&
      process.env.SECRET &&
      process.env.USERNAME &&
      process.env.PASSWORD
    )
  ) {
    Logger.error("Missing environment variables.");
    process.exit();
  }

  const session = await generateSessionKey();
  if (!session) {
    Logger.error("Failed to generate session key.");
    process.exit();
  }

  while (true) {
    await run(session);
  }
}

async function run(sessionKey: string) {
  const instance = new Scrobbler(sessionKey);

  for (const track of Config.tracks) {
    Logger.debug(
      `Scrobbling: ${track.name} ${track.album ? `(${track.album})` : ""} by ${
        track.artist
      }`
    );
    const timestamp = generateTimestamp();
    await instance.scrobble(track, timestamp);
    await sleep(Config.timeout * 1000);
  }
}

main();
