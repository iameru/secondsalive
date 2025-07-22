<script>
import { onMount, onDestroy } from 'svelte';

const daysInMonth = Array.from({length: 31}, (_, i) => i + 1)
const months = Array.from({length: 12}, (_, i) => i + 1)
// birthday of jrrtolkien
let selectedDay = 29
let selectedMonth = 4
let selectedYear = 1989
let selectedHour = 5
let selectedMinute = 0
// VALIDATION
function validateDay(event) {
  if (selectedMonth === 2 && event.target.value > 29) {
    event.target.value = 29
  }
  if (event.target.value > 31) {
    event.target.value = 31
  }
}
function validateMonth(event) {
  if (event.target.value > 12) {
    event.target.value = 12
  }
}
function validateYear(event) {
  if (event.target.value > new Date().getFullYear()) {
    event.target.value = new Date().getFullYear()
  }
}
function validateHour(event) {
  if (event.target.value > 23) {
    event.target.value = 23
  }
}
function validateMinute(event) {
  if (event.target.value > 59) {
    event.target.value = 59
  }
}


let dateOfBirth = new Date(selectedYear, selectedMonth - 1, selectedDay, selectedHour, selectedMinute)
let previousDateOfBirth = new Date(selectedYear, selectedMonth - 1, selectedDay, selectedHour, selectedMinute)
let oneMillionSecondsFromBirthDate = new Date(dateOfBirth.getTime() + 1_000_000*1000)
let oneBillionSecondsFromBirthDate = new Date(dateOfBirth.getTime() + 1_000_000_000*1000)
let specialNumberFromBirthDate = new Date(dateOfBirth.getTime() + 1_234_567_890*1000)

// how many seconds since dateOfBirth
function lifetimeInSeconds(dateOfBirth) {
  const now = Date.now();
  const diff = now - dateOfBirth.getTime();
  return Math.floor(diff / 1000);
}

function formatSeconds(seconds) {
  return new Intl.NumberFormat('de-DE').format(seconds);  // German-style: 1.000.000
}
function formatTimeTo(seconds) {
  if (seconds < 0) {
    return `${new Intl.NumberFormat('de-DE').format(-seconds)} seconds ago`;
  }
  return `in ${new Intl.NumberFormat('de-DE').format(seconds)} seconds`;
}

// we display the seconds from birthday of jrrtolkien
//Counting..
let currentSecondsLifeSpan = lifetimeInSeconds(dateOfBirth);
let timeToMillionSeconds = 1_000_000 - currentSecondsLifeSpan
let timeToBillionSeconds = 1_000_000_000 - currentSecondsLifeSpan
let timeToSpecialNumber = 1_234_567_890  - currentSecondsLifeSpan
let interval;

$: {
  previousDateOfBirth = dateOfBirth
  dateOfBirth = new Date(selectedYear, selectedMonth - 1, selectedDay, selectedHour, selectedMinute)

  oneMillionSecondsFromBirthDate = new Date(dateOfBirth.getTime() + 1_000_000*1000)
  oneBillionSecondsFromBirthDate = new Date(dateOfBirth.getTime() + 1_000_000_000*1000)
  specialNumberFromBirthDate = new Date(dateOfBirth.getTime() + 1_234_567_890*1000)

  if (dateOfBirth != previousDateOfBirth) {
    clearInterval(interval);
    interval = setInterval(() => {
      currentSecondsLifeSpan = lifetimeInSeconds(dateOfBirth);
      timeToMillionSeconds = 1_000_000 - currentSecondsLifeSpan
      timeToBillionSeconds = 1_000_000_000 - currentSecondsLifeSpan
      timeToSpecialNumber = 1_234_567_890  - currentSecondsLifeSpan
    }, 1000);
  }
}



  // Start the interval when the component mounts
  onMount(() => {
    interval = setInterval(() => {
      currentSecondsLifeSpan = lifetimeInSeconds(dateOfBirth);
    }, 1000);
  });

  // Clean up the interval when the component unmounts
  onDestroy(() => {
    clearInterval(interval);
  });



</script>

<main class='flex flex-col items-center justify-center w-screen h-screen p-10 gap-8'>

<h1 class="text-4xl">seconds alive...</h1>

<h2 class="text-2xl text-center">When were you born...? </h2>

<section class="w-full max-w-md text-center grid grid-cols-3 gap-6">
  <label for="select-day" class="text-xl font-medium text-slate-700">Day</label>
  <label for="select-month" class="text-xl font-medium text-slate-700">Month</label>
  <label for="select-year" class="text-xl font-medium text-slate-700">Year</label>
  <input
    id="select-day"
    type="number"
    min="0"
    max="31"
    on:input={validateDay}
    bind:value={selectedDay}
    class="px-2 py-1 text-lg text-center border rounded"
  />
  <input
    id="select-month"
    type="number"
    min="1"
    max="12"
    on:input={validateMonth}
    bind:value={selectedMonth}
    class="px-2 py-1 text-lg text-center border rounded"
  />
  <input
    id="select-year"
    type="number"
    min="0"
    max="{new Date().getFullYear()}"
    on:input={validateYear}
    bind:value={selectedYear}
    class="px-2 py-1 text-lg text-center border rounded"
  />
</section>
<section class="w-full max-w-md text-center grid grid-cols-2 gap-6">
  <label for="select-hour" class="text-xl font-medium text-slate-700">Hour</label>
  <label for="select-minute" class="text-xl font-medium text-slate-700">Minute</label>
  <input
    id="select-hour"
    type="number"
    min="0"
    max="23"
    on:input={validateHour}
    bind:value={selectedHour}
    class="px-2 py-1 text-lg text-center border rounded"
  />
  <input
    id="select-minute"
    type="number"
    min="0"
    max="59"
    on:input={validateMinute}
    bind:value={selectedMinute}
    class="px-2 py-1 text-lg text-center border rounded"
  />
</section>
<h2 class="text-2xl text-center">Wow, amazing..</h2>
  <p>You are</p>
    <span class="p-4 m-1 text-5xl text-transparent border-t-0 border-b-2 border-l-0 border-r-4 border-purple-800 rounded-2xl hover:scale-200 transition bg-clip-text bg-gradient-to-r from-purple-800 to-blue-500">
      {formatSeconds(currentSecondsLifeSpan)}
    </span>
  <p>seconds old!
  </p>
  <ul class="flex flex-col px-4 text-xl text-left gap-6">
    <li class="flex flex-col">
      <span>
        1.000.000 seconds:
        {formatTimeTo(timeToMillionSeconds)}
      </span>
      <span class="px-1 text-sm bg-purple-100 rounded max-w-fit">
        at {oneMillionSecondsFromBirthDate}</span>
    </li>
    <li class="flex flex-col">
      <span>
        1.000.000.000 seconds:
        {formatTimeTo(timeToBillionSeconds)}
      </span>
      <span class="px-1 text-sm bg-purple-100 rounded max-w-fit">
        at {oneBillionSecondsFromBirthDate}</span>
    </li>
    <li class="flex flex-col">
      <span>
        1.234.567.890 seconds:
        {formatTimeTo(timeToSpecialNumber)}
      </span>
      <span class="px-1 text-sm bg-purple-100 rounded max-w-fit">
        {specialNumberFromBirthDate}</span>
    </li>
  </ul>
</main>
