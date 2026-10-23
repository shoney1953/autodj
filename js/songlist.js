const main = document.getElementById("main");
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
// const prevBtn = document.getElementById("prev");
// const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
// const cover = document.getElementById("cover");

danceArray = JSON.parse(localStorage.myDanceArray);
let songToPlay = "";
let currentObj = "";
let currentSongIX = "";

let playlistExist = 0;
let currentSong = "";
try {
  playList = JSON.parse(localStorage.myPlaylist);
  playlistExist = 1;
} catch (e) {
  console.log("no playlist created yet");
}
if (playlistExist === 1) {
  createRBox(playList);
}

danceArray.forEach(createBox);

function createBox(item, index) {
  const box = document.createElement("div");
  box.classList.add("box");
  box.id = item.danceType.toUpperCase();
  box.innerHTML = `
    <h4>${item.danceType.toUpperCase()}</h4>
    `;
  // box.innerHTML += "<h5>Click on Song to Play it</h5>";
  box.addEventListener("click", () => {
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 5000);
  });

  item.songTitles.forEach((song, songi) => {
    box.innerHTML += `<li class=songItem>${song} </li>`;
  });

  main.appendChild(box);
}

function createRBox(playList) {
  let numSongs = playList.length;
  const box2 = document.createElement("div");
  box2.classList.add("box");
  box2.id = "RANDOM PLAYLIST";
  box2.innerHTML = `
    <h4>RANDOM PLAYLIST (${numSongs}) </h4>
    `;
  // box.innerHTML += "<h5>Click on Song to Play it</h5>";
  box2.addEventListener("click", () => {
    box2.classList.add("active");
    setTimeout(() => box2.classList.remove("active"), 4000);
  });

  playList.forEach((playEntry, playIndex) => {
    let songName = playList[playIndex][3];
    let songType = playList[playIndex][0];
    box2.innerHTML += `<li class=songItem><u>${songType}:</u>  ${songName} </li>`;
  });
  main.appendChild(box2);
}
//*************************** */
const randomList = document.getElementById("RANDOM PLAYLIST");

randomList.addEventListener("click", function (event) {
  processEvent(event);
});
const americanTango = document.getElementById("AMERICAN TANGO");

americanTango.addEventListener("click", function (event) {
  processEvent2(event);
});
const argentineTango = document.getElementById("ARGENTINE TANGO");

argentineTango.addEventListener("click", function (event) {
  processEvent2(event);
});
const bachata = document.getElementById("BACHATA");

bachata.addEventListener("click", function (event) {
  processEvent2(event);
});
const bolero = document.getElementById("BOLERO");

bolero.addEventListener("click", function (event) {
  processEvent2(event);
});
const chacha = document.getElementById("CHA CHA");

chacha.addEventListener("click", function (event) {
  processEvent2(event);
});
const eastcoastswing = document.getElementById("EAST COAST SWING");

eastcoastswing.addEventListener("click", function (event) {
  processEvent2(event);
});
const foxtrot = document.getElementById("FOX TROT");

foxtrot.addEventListener("click", function (event) {
  processEvent2(event);
});

const hustle = document.getElementById("HUSTLE");

hustle.addEventListener("click", function (event) {
  processEvent2(event);
});
const linedance = document.getElementById("LINE DANCE");

linedance.addEventListener("click", function (event) {
  processEvent2(event);
});
const mambo = document.getElementById("MAMBO");

mambo.addEventListener("click", function (event) {
  processEvent2(event);
});
const merengue = document.getElementById("MERENGUE");

merengue.addEventListener("click", function (event) {
  processEvent2(event);
});
const nightclub2step = document.getElementById("NIGHT CLUB TWO STEP");

nightclub2step.addEventListener("click", function (event) {
  processEvent2(event);
});
const pasodoble = document.getElementById("PASO DOBLE");

pasodoble.addEventListener("click", function (event) {
  processEvent2(event);
});

const polka = document.getElementById("POLKA");

polka.addEventListener("click", function (event) {
  processEvent2(event);
});
const quickstep = document.getElementById("QUICKSTEP");

quickstep.addEventListener("click", function (event) {
  processEvent2(event);
});
const rumba = document.getElementById("RUMBA");

rumba.addEventListener("click", function (event) {
  processEvent2(event);
});
const salsa = document.getElementById("SALSA");

salsa.addEventListener("click", function (event) {
  processEvent2(event);
});
const samba = document.getElementById("SAMBA");

samba.addEventListener("click", function (event) {
  processEvent2(event);
});
const twostep = document.getElementById("TWO STEP");

twostep.addEventListener("click", function (event) {
  processEvent2(event);
});
const viennesewaltz = document.getElementById("VIENNESE WALTZ");

viennesewaltz.addEventListener("click", function (event) {
  processEvent2(event);
});
const waltz = document.getElementById("WALTZ");

waltz.addEventListener("click", function (event) {
  processEvent2(event);
});
const westcoastswing = document.getElementById("WEST COAST SWING");

westcoastswing.addEventListener("click", function (event) {
  processEvent2(event);
});
const westernpartner = document.getElementById("WESTERN PARTNER");

westernpartner.addEventListener("click", function (event) {
  processEvent2(event);
});
const oldiesslow = document.getElementById("OLDIES SLOW");

oldiesslow.addEventListener("click", function (event) {
  processEvent2(event);
});
const oldiesfast = document.getElementById("OLDIES FAST");

oldiesfast.addEventListener("click", function (event) {
  processEvent2(event);
});
const request = document.getElementById("REQUEST");

request.addEventListener("click", function (event) {
  processEvent2(event);
});
function processEvent(event) {
  if (event.target.tagName === "LI") {
    songItem = event.target.textContent;
    const song = songItem.split(":");

    songToPlay = song[1].trim();

    musicContainer.classList.remove("vis-hidden");
    searchSongs();
  }
}
function processEvent2(event) {
  if (event.target.tagName === "LI") {
    songItem = event.target.textContent;

    songToPlay = songItem.trim();

    musicContainer.classList.remove("vis-hidden");
    searchSongs();
  }
}

function searchSongs() {
  // tableBody.innerHTML = "";

  // we could create our own object with {}, but we can speed up our life by using the FormData interface

  let foundArray = [];
  let songFound = null;
  let danceIndex = null;
  let songIndexFound = null;
  let danceIndexFound = 0;
  let danceTypeFound = null;
  let songListIndex = 0;
  let col_number = 0;
  let row_number = 0;
  let dance_type = "";
  localStorage.foundArray = [];
  songArray = [];

  danceArray.forEach(searchArray);

  if (foundArray.length > 0) {
    foundArray.forEach(createTableEntry);
  } else {
    // tableBody.innerHTML = "";
  }

  function searchArray(item) {
    // songToPlay = "Blue Tango";

    let songFound = item.songTitles.findIndex((element) =>
      element.includes(songToPlay),
    );

    if (songFound !== -1) {
      songIndexFound = songFound;

      foundArray.push(item);
      setSongName(item, songFound);
      playSong();
    }
    localStorage.foundArray = foundArray;
  }
  function createTableEntry(item) {
    dance_type = item["danceType"];

    item.songTitles.forEach(chkSong);
  }
  function chkSong(value, index, array) {
    let position = value.search(songToPlay);
    if (position !== -1) {
      songArray.push(value);
    }
  }
}
function setSongName(obj, songIndex) {
  currentObj = obj;
  currentSongIX = songIndex;
  musictype.innerText = `${obj.songTitles[songIndex]} `;

  audio.src = `${obj.folder}/${obj.file}/${obj.songTitles[songIndex]}.mp3`;
  currentSong = obj.songTitles[songIndex];
}
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

function updateDuration() {
  const duration = audio.duration;
  musictype.innerText += `  --   ${convertTime(duration)}`;
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("durationchange", updateDuration);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", () => {
  musicContainer.classList.add("vis-hidden");
  musictype.innerText = "";
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  currentObj = "";
  currentSongIX = "";
});
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  const timeRemaining = convertTime(duration - currentTime);
  // const tr = Math.round(timeRemaining * 1000) / 1000;
  const progressPercent = (currentTime / duration) * 100;
  const progressPercentRound = Math.round(progressPercent * 100) / 100;
  progress.style.width = `${progressPercentRound}%`;
  musictype.innerText = `${currentSong} -- ${timeRemaining} `;
}
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
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
