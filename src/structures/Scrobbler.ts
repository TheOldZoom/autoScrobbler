import md5 from "md5";
import type { Track } from "../interfaces/Config";
import Logger from "../utils/logger";
import axios from "axios";

export default class {
  private readonly _sessionKey: string;
  private readonly _URL: string;

  constructor(sessionKey: string) {
    this._sessionKey = sessionKey;
    this._URL = "http://ws.audioscrobbler.com/2.0/?";
  }

  async scrobble(track: Track, timestamp: number): Promise<Boolean> {
    const params = this.createParams(track, timestamp);

    try {
      const { data } = await axios.post(this._URL, params);
      const accepted = this.accepted(data);

      if (accepted) {
        Logger.log(
          `Scrobbled: ${track.name}${
            track.album ? ` (${track.album})` : ""
          } by ${track.artist}`
        );
      } else {
        Logger.warning("Scrobble failed.");
      }
      return true;
    } catch (error: any) {
      Logger.error(error);
      return false;
    }
  }

  private createParams(track: Track, timestamp: number) {
    const signature = this.generateSignature(track, timestamp);

    if (!process.env.API) {
      Logger.error("API Key is not set in the .env file.");
      return;
    }

    const data = new URLSearchParams({
      api_key: process.env.API,
      api_sig: signature,
      artist: track.artist,
      method: "track.scrobble",
      sk: this._sessionKey,
      timestamp: timestamp.toString(),
      track: track.name,
    });

    if (track.album) {
      data.append("album", track.album);
    }

    return data;
  }

  private generateSignature(track: Track, timestamp: number): string {
    const params: Record<string, string> = {
      api_key: process.env.API as string,
      artist: track.artist,
      method: "track.scrobble",
      sk: this._sessionKey,
      timestamp: timestamp.toString(),
      track: track.name,
    };

    if (track.album) {
      params.album = track.album;
    }

    const sortedKeys = Object.keys(params).sort();

    let signatureStr = "";
    for (const key of sortedKeys) {
      signatureStr += key + params[key];
    }

    signatureStr += process.env.SECRET;

    return md5(signatureStr);
  }

  private accepted(data: string) {
    return !data.includes(`scrobbles ignored="1" accepted="0"`);
  }
}
