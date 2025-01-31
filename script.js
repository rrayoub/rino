
const app = document.getElementById('typewriter');
const textArray = ["XADICA4E4A"];
let index = 0;

function type() {
  let i = 0;
  function typeLetter() {
    if (i < textArray[index].length) {
      app.innerHTML += `<strong>${textArray[index].charAt(i)}</strong>`;
      i++;
      setTimeout(typeLetter, 100);
    } else {
      setTimeout(() => {
        app.innerHTML = '';
        index = (index + 1) % textArray.length;
        type();
      }, 2000);
    }
  }
  typeLetter();
}
type();


const overlay = document.getElementById('overlay');
const audio = document.getElementById('background-audio');
const video = document.getElementById('background-video');
let audioStarted = false;

overlay.addEventListener('click', () => {
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
    audio.play();
    video.play();
    audioStarted = true;
  }, 500);
});


const muteButton = document.getElementById('muteButton');
const volumeSlider = document.getElementById('volumeSlider');

muteButton.addEventListener('click', () => {
  if (!audioStarted) {
    audio.play();
    audioStarted = true;
  }
  audio.muted = !audio.muted;
  muteButton.textContent = audio.muted ? '🔇' : '🔊';
});

volumeSlider.addEventListener('input', (event) => {
  audio.volume = event.target.value / 100;
});


const viewCountElement = document.getElementById('viewCount');


let viewCount = localStorage.getItem('viewCount') || 0;
viewCount++;
localStorage.setItem('viewCount', viewCount);
viewCountElement.textContent = viewCount;
overlay.addEventListener('click', () => {
  overlay.classList.add('hidden'); 
  setTimeout(() => {
    overlay.style.display = 'none';
    audio.play();
    video.play();
    audioStarted = true;
    document.querySelector('.container').classList.add('visible'); 
  }, 800); 
});
const icons = document.querySelectorAll('.icon-container a');
const volumeDecreasePercentage = 100;

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    if (audio.volume > 0) {
      let newVolume = audio.volume - (volumeDecreasePercentage / 100);
      audio.volume = Math.max(newVolume, 0);
      volumeSlider.value = audio.volume * 100;
    }
  });
});

window.addEventListener('focus', () => {
  audio.volume = 1;
  volumeSlider.value = 100;
});
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', (event) => {
  if (
      event.ctrlKey && (event.key === 'u' || event.key === 'U') || // View source
      event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i') || // DevTools
      event.key === 'F12' || event.key === 'f12' || // F12
      event.ctrlKey && (event.key === 's' || event.key === 'S') || // Save As
      event.ctrlKey && (event.key === 'p' || event.key === 'P') // Print
  ) {
      event.preventDefault();
  }
});
setInterval(function () {
  let devtools = window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200;
  if (devtools) {
      alert("DevTools is disabled on this site!");
      window.location.replace("about:blank");
  }
}, 1000);

