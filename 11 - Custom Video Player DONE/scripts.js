// Get the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build the functions

function togglePlay() {
    // video.pause ? video.play() : video.pause();
    // si puo anche scrivere così:
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
    // console.log(icon);
}

function skip() {
    // the function is reading the current button data-skip value and setting the video with it
    // console.log(this.dataset);
    video.currentTime = parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    // console.log(this.value);
    // updating the value of the video.playbackRate or video.volume using video [this.name]
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    // console.log(e);
}

// Hook up the event listers
video.addEventListener('click', togglePlay);
// video is listening for the video to stop or play
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// updating the timeline of the video
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

// event on the skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);