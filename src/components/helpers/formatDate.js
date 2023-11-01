import { format, parseISO } from "date-fns";

export default function formatDate(createdAt) {
  const now = new Date();
  const differenceInMinutes = Math.floor(
    (now - parseISO(createdAt)) / (1000 * 60)
  );

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}m`;
  } else if (differenceInMinutes < 1440) {
    const hours = Math.floor(differenceInMinutes / 60);
    return `${hours}h`;
  } else {
    return format(parseISO(createdAt), "MMM dd", {
      awareOfUnicodeTokens: true,
    });
  }
}
