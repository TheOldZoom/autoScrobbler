import md5 from "md5";
import Logger from "../utils/logger";
import axios from "axios";

export default class {
  private readonly _password: string;
  private readonly _username: string;
  private readonly _URL: string;

  constructor(username: string, password: string) {
    this._password = password;
    this._username = username;
    this._URL = "http://ws.audioscrobbler.com/2.0/?";
  }

  public async authorize() {
    try {
      const params = this.generateRParams();
      Logger.debug(`params: ${params}`);
      const { data } = await axios.post(this._URL, params);
      return this.extractKey(data);
    } catch (error: any) {
      Logger.error(error);
    }
  }

  private generateRParams() {
    const signature = this.generateSignature();
    Logger.debug(`signature: ${signature}`);

    if (!process.env.API) {
      Logger.error("API Key is not set in the .env file.");
      return;
    }

    const params = new URLSearchParams({
      api_key: process.env.API,
      api_sig: signature,
      method: "auth.getMobileSession",
      username: this._username,
      password: this._password,
    });

    return params;
  }

  private extractKey(xml: string) {
    const keyRegex = new RegExp(/<key>(.*?)<\/key>/);
    const key = keyRegex.exec(xml);

    if (key == null) {
      Logger.error("Failed to extract key.");
      process.exit();
    }

    Logger.debug(`Key: ${key[1]}`);
    Logger.debug("Authorized.");
    return key[1];
  }

  private generateSignature(): string {
    return md5(
      [
        "api_key",
        process.env.API,
        "method",
        "auth.getMobileSession",
        "password",
        this._password,
        "username",
        this._username,
        process.env.SECRET,
      ].join("")
    ) as string;
  }
}

if (!process.env.USERNAME || !process.env.PASSWORD) {
  throw new Error("Missing username or password");
}
