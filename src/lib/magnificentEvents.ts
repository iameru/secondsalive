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
    event = {
      ...event,
      date: new Date(dateOfBirth.getTime() + event.seconds*1000),
      secondsToEvent: event.seconds - currentSecondsLifeSpan
    }
    result.push(event)
  })
  return result
}
