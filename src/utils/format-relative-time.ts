const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function formatRelativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  const diff = now.getTime() - then.getTime();

  if (diff < MINUTE) {
    return "Just now";
  }

  if (diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE);

    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (diff < DAY) {
    const hours = Math.floor(diff / HOUR);

    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (diff < 2 * DAY) {
    return "Yesterday";
  }

  if (diff < 7 * DAY) {
    const days = Math.floor(diff / DAY);

    return `${days} days ago`;
  }

  return then.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
