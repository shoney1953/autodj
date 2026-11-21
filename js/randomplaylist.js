const main = document.getElementById("main");
const randomBtn = document.getElementById("randomBtn");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playCurrentBtn = document.getElementById("playCurrentBtn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const musicContainer = document.getElementById("music-container");
const audioSRC = document.getElementById("audioSRC");
const audioCntl = document.getElementById("acntl");
const musicName = document.getElementById("musictype");
const downloadPlyBtn = document.getElementById("downloadPlyBtn");
const message = new SpeechSynthesisUtterance();
var myVolume = message.volume;

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
let playlistExist = 0;
let maxCount = 0;
let totalSongs = 0;
let songNum = 0;
let playListHtml = "";
let playListIX = 0;
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
const Dance = function (name, songTitles, numPerRandomList, category, btn) {
  this.danceType = name;
  this.songTitles = songTitles;
  this.numPerRandomList = numPerRandomList;
  this.currentSong = 0;
  this.category = category;
  this.numberOfSongs = this.songTitles.length;
  this.btn = btn;
};
Dance.prototype.setBtn = function () {
  this.btn = document.getElementById(this.btn);

  // this.btn.innerText += ` (${this.numberOfSongs})  `;
  danceArray.push(this);
};
Dance.prototype.selectRandomSong = function () {
  let maxv = this.numberOfSongs - 1;
  this.currentSong = Math.floor(Math.random() * maxv);
  return this.currentSong;
};
Dance.prototype.playTheList = function () {
  removeplayListListeners();
  addGeneraListeners();
  this.currentSong = this.selectRandomSong();
  this.setSongName();
  playSong();
};
Dance.prototype.setSongName = function () {
  folder = this.folder;
  file = this.file;
  hdrType = this.danceType;
  song = this.songTitles[this.currentSong];

  let announce = `The next song is a ${hdrType}.`;
  setTextMessage(announce);
  speakText();

  loadSong(folder, file, song);
};
function createRBox(playList) {
  let numSongs = playList.length;
  const box2 = document.createElement("div");
  box2.classList.add("box");
  box2.id = "RANDOMPLAYLIST";

  box2.addEventListener("click", () => {
    box2.classList.add("active");
    setTimeout(() => box2.classList.remove("active"), 4000);
  });

  playListHtml = "<table>";
  playListHtml += "<thead>";
  playListHtml += "<tr>";
  playListHtml += `<th colspan="3">Current Playlist -- Click on Song Number to Play it</th>`;
  playListHtml += "</tr>";
  playListHtml += "<tr>";
  playListHtml += "<th>Num</th>";
  playListHtml += "<th>Dance Type</th>";
  playListHtml += "<th>Song Name</th>";
  playListHtml += "</tr>";
  playListHtml += "</thead>";
  playListHtml += "<tbody>";
  playList.forEach((playEntry, playIndex) => {
    songNum++;
    let songName = playList[playIndex][1].split(".")[0];
    let songType = playList[playIndex][0];
    playListHtml += "<tr>";
    playListHtml += `<td title="Click to Play">${songNum}</td>`;
    playListHtml += `<td>${songType}</td>`;
    playListHtml += `<td>${songName}</td>`;
    playListHtml += "</tr>";
  });
  playListHtml += "</tbody>";
  playListHtml += "</table>";

  box2.innerHTML += playListHtml;
  main.appendChild(box2);
  const box2id = document.getElementById("RANDOMPLAYLIST");
  box2id.addEventListener("click", function (event) {
    processBoxClick(event);
  });
}
playCurrentBtn.addEventListener("click", function (event) {
  playListIX = 0;
  startPlayList();
});
function startPlayList() {
  audioPlay(playList[playListIX]);
}
async function audioPlay(playListItem) {
  musicName.innerText = `${playListItem[1].split(".")[0]}`;
  let announce = `The next song is a ${playListItem[0]}.`;
  setTextMessage(announce);
  speakText();
  let sourceUrl = `stream.php?id=${playListItem[2]}&mimetype=${playListItem[3]}`;

  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audioSRC.src = sourceUrl;
  audioSRC.type = playListItem[3];
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
try {
  playList = JSON.parse(localStorage.googlePlaylist);
  playlistExist = 1;
} catch (e) {
  console.log("no playlist created yet");
}
if (playlistExist === 1) {
  createRBox(playList);
}
function processBoxClick(event) {
  if (event.target.tagName === "TD") {
    if (isNaN(event.target.textContent)) {
      return;
    }
    let ix = Number(event.target.textContent);

    playListIX = ix - 1;
    if (playListIX < 0) {
      playListIX = 0;
    }

    audioPlay(playList[playListIX]);
  }
}
randomBtn.addEventListener("click", () => {
  createPlaylist();
});
function createPlaylist() {
  let totalSongs = 0;

  for (i = 0; i < danceArray.length; i++) {
    let maxCount = danceArray[i].numPerRandomList;

    if (danceArray[i].numberOfSongs === 0) {
      maxCount = 0;
    }
    for (j = 0; j < maxCount; j++) {
      let songIndex = danceArray[i].selectRandomSong();

      // fullname = `${danceArray[i].folder}/${danceArray[i].file}/${danceArray[i].songTitles[songIndex]}.mp3`;
      fullname = songTitles[songIndex];

      playList[totalSongs] = [
        danceArray[i].danceType,
        danceArray[i].songTitles[songIndex].songName,
        danceArray[i].songTitles[songIndex].fileId,
        danceArray[i].songTitles[songIndex].mimeType,
      ];

      totalSongs++;
      // shuffle(playList);
    }
  }
  //
  j = 0;

  for (i = 0; i < playList.length - 1; i++) {
    if (playList[i][2] != playList[i + 1][2]) {
      playList2[j] = playList[i];
      j++;
    }
  }
  shuffle(playList2);
  playList = playList2;

  if (!window.localStorage) alert("Sorry, you're using an ancient browser");
  else {
    localStorage.googlePlaylist = JSON.stringify(playList);
  }
  window.location.reload();
}
// console.log(playListDur);

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];

    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// create classes for all dances
americanTango = new Dance(
  "American Tango",
  songTitles[0],
  3,
  "ballroom",
  "AMERICANTANGObtn",
);

americanTango.setBtn();
argentineTango = new Dance(
  "Argentine Tango",
  songTitles[1],
  3,
  "Latin",
  "ARGENTINETANGObtn",
);
argentineTango.setBtn();

bachata = new Dance("Bachata", songTitles[2], 3, "Latin", "BACHATAbtn");
bachata.setBtn();
bolero = new Dance("Bolero", songTitles[3], 0, "Latin", "BOLERObtn");
bolero.setBtn();
chacha = new Dance("Cha Cha", songTitles[4], 4, "Latin", "CHACHAbtn");
chacha.setBtn();
ecs = new Dance(
  "East Coast Swing",
  songTitles[5],
  4,
  "Swing",
  "EASTCOASTSWINGbtn",
);
ecs.setBtn();
foxtrot = new Dance("Foxtrot", songTitles[6], 4, "Ballroom", "FOXTROTbtn");
foxtrot.setBtn();
hustle = new Dance("Foxtrot", songTitles[7], 4, "Ballroom", "HUSTLEbtn");
hustle.setBtn();

linedance = new Dance(
  "Line Dance",
  songTitles[8],
  2,
  "Special",
  "LINEDANCEbtn",
);
linedance.setBtn();
mambo = new Dance("Line Dance", songTitles[9], 2, "Ballroom", "MAMBObtn");
mambo.setBtn();
merengue = new Dance("Merengue", songTitles[10], 2, "Latin", "MERENGUEbtn");
merengue.setBtn();
nightclubtwostep = new Dance(
  "Nightclub Two Step",
  songTitles[11],
  4,
  "Ballroom",
  "NIGHTCLUBTWOSTEPbtn",
);
nightclubtwostep.setBtn();
oldiesfast = new Dance(
  "Oldies Fast",
  songTitles[12],
  1,
  "Special",
  "OLDIESFASTbtn",
);
oldiesfast.setBtn();
oldiesslow = new Dance(
  "Oldies Fast",
  songTitles[13],
  1,
  "Special",
  "OLDIESSLOWbtn",
);
oldiesslow.setBtn();
polka = new Dance("Polka", songTitles[14], 1, "Ballroom", "POLKAbtn");
polka.setBtn();
quickstep = new Dance(
  "Quickstep",
  songTitles[15],
  1,
  "Ballroom",
  "QUICKSTEPbtn",
);
quickstep.setBtn();
rumba = new Dance("Rumba", songTitles[16], 4, "Latin", "RUMBAbtn");
rumba.setBtn();
salsa = new Dance(
  "Salsa",
  songTitles[17],
  2,
  "Latin",
  "music",
  "atango",
  "SALSAbtn",
);
salsa.setBtn();
samba = new Dance("Samba", songTitles[18], 1, "Latin", "SAMBAbtn");
samba.setBtn();
twostep = new Dance("Two Step", songTitles[19], 3, "Western", "TWOSTEPbtn");
twostep.setBtn();
viennesewaltz = new Dance(
  "Viennese Waltz",
  songTitles[20],
  1,
  "Ballroom",
  "VIENNESEWALTZbtn",
);
viennesewaltz.setBtn();
waltz = new Dance("Viennese Waltz", songTitles[21], 4, "Ballroom", "WALTZbtn");
waltz.setBtn();
wcs = new Dance(
  "West Coast Swing",
  songTitles[22],
  4,
  "Swing",
  "WESTCOASTSWINGbtn",
);
wcs.setBtn();

westernpartner = new Dance(
  "Western Partner",
  songTitles[23],
  2,
  "Western",

  "WESTERNPARTNERbtn",
);
westernpartner.setBtn();
audioCntl.addEventListener("ended", () => {
  playListIX++;
  if (playListIX >= playList.length) {
    return;
  }
  audioPlay(playList[playListIX]);
});
//           print playlist code
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
nextBtn.addEventListener("click", nextSongInPlaylist);
prevBtn.addEventListener("click", prevSongInPlaylist);
randomBtn.addEventListener("click", () => {
  createPlaylist();
});
function nextSongInPlaylist() {
  playListIX++;
  if (playListIX >= playList.length) {
    return;
  }

  audioPlay(playList[playListIX]);
}
function prevSongInPlaylist() {
  playListIX--;
  if (playListIX < 0) {
    return;
  }
  audioPlay(playList[playListIX]);
}
function setTextMessage(text) {
  message.text = text;
}
function speakText() {
  speechSynthesis.speak(message);
}
downloadPlyBtn.addEventListener("click", () => {
  // pipe the document to a blob
  let newDate = new Date(Date.now());
  const doc = new PDFDocument();

  doc.fontSize(14);

  doc.text(`Written: ${newDate.toDateString()} ${newDate.toTimeString()}`, 50);

  doc.text(`${playList.length} Songs generated from https://sbdcautodj.com `);
  doc.text(" ");

  doc.text(" #", 50);
  doc.moveUp(1);
  doc.text("Song Type", 100);
  doc.moveUp(1);
  doc.text("Song Name", 250);

  doc.text("__________________________________________________________", 50);

  playList.forEach((playEntry, playIndex) => {
    let songName = playEntry[1].split(".")[0];
    // const result = str.split("@")[0];
    let songType = playEntry[0];
    let songLine;

    songLine = `${playIndex + 1}  ${songType}          ${songName}`;

    doc.text(`${playIndex + 1}`, 50);
    doc.moveUp(1);
    doc.text(`| ${songType}`, 100);
    doc.moveUp(1);
    doc.text(`| ${songName}`, 250);
    doc.moveUp(1);
    doc.text("__________________________________________________________", 50);
  });

  doc.end();
  var stream = doc.pipe(blobStream());

  stream.on("finish", function () {
    let blob;
    // get a blob you can do whatever you like with

    blob = stream.toBlob("application/pdf");
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "randomsonglist.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  });
});
