const main = document.getElementById("main");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const musicContainer = document.getElementById("music-container");
const audioSRC = document.getElementById("audioSRC");
const audioCntl = document.getElementById("acntl");
const musicName = document.getElementById("musictype");

var songToPlay = "";
var folderToPlay = "";
var folderNumToPlay = 0;
var songsFromFolder = [];
var songFolderIX = 0;
var songTitles = [];
var tempArray = [];
var indexStart = 0;
var danceArray = [];
var boxHTML = "";
let playList = [];
let playList2 = [];
let maxCount = 0;
let totalSongs = 0;
let j = 0;
let i = 0;

songArray.forEach(createSongTitles);
function createSongTitles(song, index) {
  if (song.songFolder === indexStart) {
    tempArray.push(song);
  }
  if (song.songFolder !== indexStart) {
    songTitles.push(tempArray);
    tempArray = [];
    tempArray.push(song);
    indexStart++;
  }
}

songTitles.push(tempArray);

folderArray.forEach(createBox);

function createBox(item, index) {
  const box = document.createElement("div");
  box.classList.add("box");
  // var buttonId = item.folderName.replaceAll(" ", "_");
  var buttonId = item.folderName.replace(/\s+/g, "");

  box.id = buttonId.toUpperCase();
  boxHTML = `<button id="${buttonId}btn"<h4 title="Click to Play List" >${item.folderName.toUpperCase()} </h4></button>
    `;
  // boxHTML += `<ul>`;
  songArray.forEach((song, songi) => {
    if (song.songFolder === index)
      // box.innerHTML += `<li class=songItem title='Click to play Song'>${song.songName}  </li>`;
      boxHTML += `<li class=songItem title='Click to play Song'>${song.songName}  </li>`;
  });
  // boxHTML += `</ul>`;
  // box.innerHTML += `</ul>`;
  box.innerHTML = boxHTML;

  main.appendChild(box);
  let boxid = "boxid";
  boxid = "boxid" + item.folderNum;
  boxid = document.getElementById(`${box.id}`);
  box.addEventListener("click", () => {
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 5000);
  });
  boxid.addEventListener("click", function (event) {
    processBoxClick(event);
  });
}

function processBoxClick(event) {
  console.log("processboxclick", event.target.tagName);
  if (event.target.tagName === "LI") {
    songClicked = event.target.textContent;

    songToPlay = songClicked.trim();

    songArray.forEach(findSongId, songToPlay);
  }
  if (event.target.tagName === "BUTTON") {
    audioCntl.pause();
    folderClicked = event.target.textContent;
    folderToPlay = folderClicked.trim();

    folderArray.forEach(findFolderNum, folderToPlay);
    songFolderIX = 0;
  }
}

function findFolderNum(item, index) {
  if (item.folderName.toUpperCase() === folderToPlay) {
    folderNumToPlay = index;

    songsFromFolder = [];
    songArray.forEach(playSongsInFolder, index);

    if (songsFromFolder.length > 0) {
      audioPlay(songsFromFolder[songFolderIX]);
    }
    return true;
  }
}

async function audioPlay(songItem) {
  musicName.innerText = `${songItem.songName}`;
  let sourceUrl = `stream.php?id=${songItem.fileId}&mimetype=${songItem.mimeType}`;

  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audioSRC.src = sourceUrl;
  audioSRC.type = songItem.mimeType;
  try {
    // .play() is called synchronously, but returns a Promise
    await audioCntl.load();
  } catch (error) {
    console.error(
      "Audio Load Failed (e.g., blocked by browser autoplay policy):",
      error,
    );
  }

  try {
    // .play() is called synchronously, but returns a Promise

    await audioCntl.play();
  } catch (error) {
    console.error(
      "Audio playback Failed (e.g., blocked by browser autoplay policy):",
      error,
    );
  }
}

async function playSongsInFolder(item, index) {
  if (item.songFolder === folderNumToPlay) {
    songsFromFolder.push(item);
  }
}
audioCntl.addEventListener("ended", () => {
  songFolderIX++;
  if (songFolderIX >= songsFromFolder.length) {
    return;
  }
  audioPlay(songsFromFolder[songFolderIX]);
});

function findSongId(item, index) {
  if (item.songName === songToPlay) {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    musicName.innerText = `${songToPlay}`;
    let sourceUrl = `stream.php?id=${item.fileId}&mimetype=${item.mimeType}`;

    audioSRC.src = sourceUrl;
    audioSRC.type = item.mimeType;

    audioCntl.load();
    audioCntl.play();
  }
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audioCntl.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audioCntl.pause();
}
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioCntl.duration;
  audioCntl.currentTime = (clickX / width) * duration;
}
function updateDuration() {
  const duration = audioCntl.duration;
  musictype.innerText += `  --   ${convertTime(duration)}`;
}
var convertTime = function (time) {
  var mins = Math.floor(time / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  var secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  return mins + ":" + secs;
};
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

audioCntl.addEventListener("timeupdate", updateProgress);
audioCntl.addEventListener("durationchange", updateDuration);
nextBtn.addEventListener("click", nextSongInFolder);
prevBtn.addEventListener("click", prevSongInFolder);

function nextSongInFolder() {
  songFolderIX++;
  if (songFolderIX >= songsFromFolder.length) {
    return;
  }

  audioPlay(songsFromFolder[songFolderIX]);
}
function prevSongInFolder() {
  songFolderIX--;
  if (songFolderIX < 0) {
    return;
  }
  audioPlay(songsFromFolder[songFolderIX]);
}
// create classes for all dances

function getAudioDuration(playlist, index, total, src) {
  const audio = new Audio();
  audio.src = src;
  audio.addEventListener("loadedmetadata", () => {
    var duration = audio.duration;
    total = total + duration;
    playlist[index].push(convertTime(duration));
  });
}
