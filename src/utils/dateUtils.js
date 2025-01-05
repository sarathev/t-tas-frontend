export const formatTimeAgo = (datetime) => {
  const now = new Date(); // Current time in UTC
  const past = new Date(datetime); // Convert input to UTC
  const diff = Math.abs(now.getTime() - past.getTime()) / 1000; // Difference in seconds

  if (diff < 60) return `${Math.floor(diff)} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return `${Math.floor(diff / 604800)} weeks ago`;
};
