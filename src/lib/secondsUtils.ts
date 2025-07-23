export function lifetimeInSeconds(dateOfBirth: Date) {
  // how many seconds since dateOfBirth
  const now = Date.now();
  const diff = now - dateOfBirth.getTime();
  return Math.floor(diff / 1000);
}
export function formatSeconds(seconds: number) {
  return new Intl.NumberFormat('de-DE').format(seconds);  // German-style: 1.000.000
}

