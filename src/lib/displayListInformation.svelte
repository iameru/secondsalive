<script>

let { eventName, secondsToEvent, eventDate } = $props()

function formatTimeTo(seconds) {
  if (seconds < 0) {
    return `${new Intl.NumberFormat('de-DE').format(-seconds)} seconds ago`;
  }
  return `in ${new Intl.NumberFormat('de-DE').format(seconds)} seconds`;
}

</script>


<li class="flex flex-col">
  <span>
    {eventName}:
    {formatTimeTo(secondsToEvent)}
  </span>
  <span class="px-1 text-sm bg-purple-100 rounded max-w-fit">
    at {eventDate}</span>
</li>
