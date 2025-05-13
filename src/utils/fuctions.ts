export function dateDifference(
  date1: Date,
  date2: Date
): { minutes: number; seconds: number } {
  const differenceInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
  const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return { minutes, seconds };
}
