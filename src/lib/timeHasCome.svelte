<script>
import { onMount } from 'svelte';

function startEmojiRain() {
  const modal = document.getElementById('time-has-come');
  const emojis = ['🎉', '🥳', '🎊', '✨'];

  setInterval(() => {
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    // Styling
    emoji.style.position = 'absolute';
    emoji.style.top = Math.random() * 1000 + 'px';
    emoji.style.left = Math.random() * modal.clientWidth + 'px';
    emoji.style.fontSize = '2rem';
    emoji.style.pointerEvents = 'none'; // prevent interaction
    emoji.style.userSelect = 'none';    // prevent selection
    // Random duration
    const duration = 2 + Math.random() * 3;
    emoji.style.animation = `fall ${duration}s linear forwards`;
    modal.appendChild(emoji);
    setTimeout(() => {
      emoji.remove();
    }, duration * 1000);
  }, 120);
}

onMount(() => {
  startEmojiRain();
});

function closeMe() {
  const modal = document.getElementById('it-finally-happened');
  modal.style.display = 'none';
}
</script>
<!-- we place this modal ontop of everything -->
<section
  class="fixed top-0 left-0 z-50 items-center justify-center w-screen h-screen text-black grid grid-rows-3 opacity-85 from-emerald-200 to-yellow-200 bg-gradient-to-l"
  id="it-finally-happened"
>
  <div
    class="flex flex-col items-center justify-center text-7xl"
  >
    Yeaaaaaaahh!
  </div>
  <div></div>
  <div id="time-has-come"
    class="flex w-screen min-w-full overflow-hidden text-black"
  ></div>
  <button
    on:click={closeMe}
    class="px-4 py-2 text-lg text-white rounded bg-emerald-500 hover:bg-emerald-600"
  >
    Close
  </button>
</section>

<style>
@keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}
</style>
