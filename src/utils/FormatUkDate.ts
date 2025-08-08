export default function formatUkDate(date: string | Date): string {
  let d: Date;
  if (typeof date === 'string') {
    d = new Date(date);
  } else {
    d = date;
  }
  if (d instanceof Date && !isNaN(d.getTime())) {
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return String(date);
}
