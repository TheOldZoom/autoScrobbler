export default function generateTimestamp() {
  const currentDate = new Date();

  const twentyFourHoursAgo = new Date(currentDate);
  twentyFourHoursAgo.setHours(currentDate.getHours() - 24);

  let randomTimestamp;

  do {
    randomTimestamp = new Date(
      twentyFourHoursAgo.getTime() +
        Math.random() * (currentDate.getTime() - twentyFourHoursAgo.getTime())
    );
  } while (randomTimestamp > currentDate);

  return randomTimestamp.getTime() / 1000;
}
