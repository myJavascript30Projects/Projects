//html elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//play the video or pause
function togglePlay () {
  if(video.paused) {
    video.play();
  }
  else {
    video.pause();
  }
}

//change the play to pause if clicked
function updateButton () {
  //if button is paused update button (grabbed icons from answer file)
  const icon = this.paused ? '►' : '❚ ❚';
  //toggle to change icon
  toggle.textContent = icon;
  console.log('update the button')
}
//grabbing the skip buttons from html and call them when clicked
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
//
function handleRangeUpdate() {
  video[this.name] = this.value;
  console.log(this.name);
  console.log(this.value);

}
//progress bar changes
function handleProgress () {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  // console.log(e);
}
//event listeners
//play video
video.addEventListener('click', togglePlay);
//update the played button
video.addEventListener('play', updateButton);
//paused video
video.addEventListener('pause', updateButton);
video.addEventListener('timeUpdae', handleProgress);
//toggle between play and pause when screen or button clicked
toggle.addEventListener('click', togglePlay);
//skip buttons clicked
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);