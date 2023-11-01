import { format, parseISO } from "date-fns";

export default function formatDate(createdAt) {
  const now = new Date();
  const differenceInSeconds = Math.floor((now - parseISO(createdAt)) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds}s`;
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes}m`;
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours}h`;
  } else {
    return format(parseISO(createdAt), "MMM dd", {
      awareOfUnicodeTokens: true,
    });
  }
}
