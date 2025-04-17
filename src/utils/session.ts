import Authorization from "../structures/Authorization";

export default async function generateSessionKey() {
  if (!(process.env.USERNAME && process.env.PASSWORD)) {
    console.error("Missing environment variables.");
    process.exit();
  }

  const authProvider = new Authorization(
    process.env.USERNAME,
    process.env.PASSWORD
  );
  const sessionKey = await authProvider.authorize();
  return sessionKey;
}
