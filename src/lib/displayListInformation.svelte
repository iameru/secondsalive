<script>
import {TimeWillCome, TimeHasCome} from "../lib/happySecondsDay.ts";
let { eventName, secondsToEvent, eventDate, ageString } = $props()

function formatTimeTo(seconds) {
  if (seconds < 0) {
    return `${new Intl.NumberFormat('de-DE').format(-seconds)} seconds ago`;
  }
  return `in ${new Intl.NumberFormat('de-DE').format(seconds)} seconds`;
}
function formatAgeInYears(age) {
  if (secondsToEvent < 0) {
    return `You were ${ageString} years old`;
  }
  else {
    return `You will be ${ageString} years old`;
  }
}
function formatDate(eventDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(eventDate).toLocaleDateString('en-US', options);
}

const theTimeWillComeSoon = () => secondsToEvent < 6000 && secondsToEvent >= 0;
const theTimeHasCome = () => secondsToEvent < 0 && secondsToEvent > -6000 ;

</script>

<li class="flex flex-col">
  <span class='mb-1 underline underline-offset-8'>
    {eventName}:
    {formatTimeTo(secondsToEvent)}
  </span>
  <span class="px-1 ml-8 text-sm rounded bg-purple-50 max-w-fit">
    at {formatDate(eventDate)}
  </span>
  <span class="px-1 ml-8 text-sm rounded bg-purple-50 max-w-fit">
    {formatAgeInYears(ageString)}
  </span>
  <!-- if the time will come we display some info -->
  {#if theTimeWillComeSoon()}
    <TimeWillCome />
  {/if}
  {#if theTimeHasCome()}
    <TimeHasCome />
  {/if}
</li>
