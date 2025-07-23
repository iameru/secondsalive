<script>
function closeMe() {
  const modal = document.getElementById('it-will-happen-soon');
  modal.style.display = 'none';
}
</script>
<!-- we place this modal ontop of everything -->
<section
  class="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen text-black opacity-75 from-emerald-50 to-yellow-50 bg-gradient-to-r gap-4"
  id="it-will-happen-soon"
>
  The time will come soon...
  <button
    on:click={closeMe}
    class="absolute bottom-0 px-4 py-2 text-lg text-white rounded-none rounded bg-emerald-500 hover:bg-emerald-600 min-w-screen"
  >
    Close
  </button>
</section>
