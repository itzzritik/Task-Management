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

export const readableDate = (inputDateTime?: string) => {
  if (!inputDateTime) return;
  const date = new Date(inputDateTime);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const getRandomDateFromPastMonth = (): string => {
  const currentDate = new Date();
  const randomDate = new Date(currentDate);

  const randomDays = Math.floor(Math.random() * 30);
  randomDate.setDate(currentDate.getDate() - randomDays);

  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  const randomSeconds = Math.floor(Math.random() * 60);

  randomDate.setHours(randomHours, randomMinutes, randomSeconds);

  return randomDate.toISOString();
};
