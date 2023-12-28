export const getDefaultEventTime = (): [string, string] => {
  const now = new Date();
  const currentMinutes = now.getMinutes();
  let roundedMinutes = 30 - (currentMinutes % 30);

  if (roundedMinutes === 30) roundedMinutes = 0;
  now.setMinutes(now.getMinutes() + roundedMinutes);

  const timeZoneOffset = now.getTimezoneOffset() * 60 * 1000;
  const localDateTime = new Date(now.getTime() - timeZoneOffset);
  const formattedDate = localDateTime.toISOString().slice(0, 16);
  const nextTime = new Date(localDateTime.getTime());

  nextTime.setMinutes(nextTime.getMinutes() + 30);
  const formattedNextTime = nextTime.toISOString().slice(0, 16);

  return [formattedDate, formattedNextTime];
};
