# LastFM AutoScrobbler

![LastFM Scrobbles](https://i.imgur.com/uf1oGa0.png)

## ⚠️ Important Notice ⚠️

Please note that LastFM has a daily scrobble limit of **2600**. Exceeding this limit will result in a "Rate Limit" error, and you'll be unable to interact with the scrobble API for 24 hours.

---

## Getting Started

To get started with the LastFM AutoScrobbler, follow these steps:

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/TheOldZoom/autoscrobbler.git
cd auto-scrobbler
```

2. Install dependencies using Bun:

```bash
bun install
```

If you do not have Bun installed, you can easily install it by following the instructions [here](https://bun.sh/docs/installation).

3. Rename the `.env.example` file to `.env`.

4. Obtain your **API Key** and **Secret** from LastFM by creating a new account [here](https://www.last.fm/api/account/create).

5. Add your credentials to the `.env` file:

```dotenv
API=YOUR_API_KEY
SECRET=YOUR_SECRET_KEY
USERNAME=YOUR_LASTFM_USERNAME
PASSWORD=YOUR_LASTFM_PASSWORD
```

**⚠️ Important**: Your username and password are stored locally on your machine and are never shared with any server other than LastFM's.

---

## Running the App

Once you have everything set up, start the application with the following command:

```bash
bun start
```

---

## Multi-Track Scrobbling ⛏️

You can now scrobble multiple tracks at once. To do this, update the `src/config.ts` file with the songs you want to scrobble.

### Example configuration:

```json
// src/config.ts

{
  "tracks": [
    {
      "name": "Never See Me Again",
      "artist": "Kanye West",
      "album": "Unreleased"
    },
    {
      "name": "I Wonder",
      "artist": "Kanye West",
      "album": "Graduation"
    }
  ],
  "debug": false,
  "timeout": 40
}
```

You can add as many songs as you like to the `tracks` array. Just make sure to follow the JSON structure provided.

---

Feel free to adjust the configuration based on your preferences. Happy scrobbling!
