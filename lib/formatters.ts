import formatDuration from 'format-duration';

export const formatTime = (timeInSeconds = 0) => {
  const ONE_THOUSAND_MILLSECONDS = 1000;
  return formatDuration(timeInSeconds * ONE_THOUSAND_MILLSECONDS);
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
