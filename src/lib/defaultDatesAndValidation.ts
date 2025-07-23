export const daysInMonth = Array.from({length: 31}, (_, i) => i + 1)
export const months = Array.from({length: 12}, (_, i) => i + 1)
export const selectedDay = 29
export const selectedMonth = 4
export const selectedYear = 1989
export const selectedHour = 5
export const selectedMinute = 0

export function validateDay(event) {
  if (selectedMonth === 2 && event.target.value > 29) {
    event.target.value = 29
  }
  if (event.target.value > 31) {
    event.target.value = 31
  }
}
export function validateMonth(event) {
  if (event.target.value > 12) {
    event.target.value = 12
  }
}
export function validateYear(event) {
  if (event.target.value > new Date().getFullYear()) {
    event.target.value = new Date().getFullYear()
  }
}
export function validateHour(event) {
  if (event.target.value > 23) {
    event.target.value = 23
  }
}
export function validateMinute(event) {
  if (event.target.value > 59) {
    event.target.value = 59
  }
}
