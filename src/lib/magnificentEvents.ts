export const magnificentEvents = [
  { name: '1.000.000 seconds', seconds: 1_000_000},
  { name: '1.000.000.000 seconds', seconds: 1_000_000_000},
  { name: '1.234.567.890 seconds', seconds: 1_234_567_890},
  { name: '2.000.000.000 seconds', seconds: 2_000_000_000},
  { name: '2.222.222.222 seconds', seconds: 2_222_222_222},
]
export function buildEvents(dateOfBirth: Date, currentSecondsLifeSpan: number) {
  const result: List[any]= []
  magnificentEvents.forEach(event => {

    const dateOfEvent = new Date(dateOfBirth.getTime() + event.seconds*1000)

    const ageFromSecondsString = (seconds) => {
      const years = Math.floor(seconds / 31536000)
      const months = Math.floor((seconds % 31536000) / 2592000)
      const days = Math.floor((seconds % 2592000) / 86400)
      return `${years} years, ${months} months, ${days} days`
    }

    event = {
      ...event,
      date: dateOfEvent,
      secondsToEvent: event.seconds - currentSecondsLifeSpan,
      ageString: ageFromSecondsString(event.seconds)
    }
    result.push(event)
  })
  return result
}
