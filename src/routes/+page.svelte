<script>
import { onMount, onDestroy } from 'svelte';
import { DiplayListInformation } from '../lib/displayListInformation.js';
import {
  daysInMonth,
  months,
  selectedDay as defaultDay,
  selectedMonth as defaultMonth,
  selectedYear as defaultYear,
  selectedHour as defaultHour,
  selectedMinute as defaultMinute,
  validateDay,
  validateMonth,
  validateYear,
  validateHour,
  validateMinute,
  } from '../lib/defaultDatesAndValidation.ts';
import { lifetimeInSeconds, formatSeconds } from '../lib/secondsUtils.ts';

// the magic
import { magnificentEvents, buildEvents } from '../lib/magnificentEvents.ts'

let selectedDay = defaultDay
let selectedMonth = defaultMonth
let selectedYear = defaultYear
let selectedHour = defaultHour
let selectedMinute = defaultMinute
let dateOfBirth = new Date(selectedYear, selectedMonth - 1, selectedDay, selectedHour, selectedMinute)
let previousDateOfBirth = new Date(selectedYear, selectedMonth - 1, selectedDay, selectedHour, selectedMinute)
let currentSecondsLifeSpan = lifetimeInSeconds(dateOfBirth);
let currentSecondsLifeSpanFormatted = formatSeconds(currentSecondsLifeSpan)
let events = buildEvents(dateOfBirth, currentSecondsLifeSpan)
let interval

$: {
  previousDateOfBirth = dateOfBirth
  dateOfBirth = new Date(selectedYear, selectedMonth - 1, selectedDay, selectedHour, selectedMinute)
  if (dateOfBirth != previousDateOfBirth) {
    clearInterval(interval);
    interval = setInterval(() => {
      currentSecondsLifeSpan = lifetimeInSeconds(dateOfBirth);
      currentSecondsLifeSpanFormatted = formatSeconds(currentSecondsLifeSpan)
      events = buildEvents(dateOfBirth, currentSecondsLifeSpan)
    }, 1000);
  }
}
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
      {currentSecondsLifeSpanFormatted}
    </span>
  <p>seconds old!
  </p>
  <ul class="flex flex-col px-4 mb-8 text-xl text-left gap-6">
    {#each events as event}
    <DiplayListInformation
      eventName={event.name}
      secondsToEvent={event.secondsToEvent}
      eventDate={event.date}
      ageString={event.ageString}
    />
    {/each}
  </ul>
</main>
