const musicContainer = document.getElementById("music-container");
const buttonContainer = document.getElementById("buttonContainer");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const musictype = document.getElementById("musictype");

const listBtn = document.getElementById("listBtn");

const songList = [
  // american  tango 0
  ["Amapola", "Blue Tango", "La Paloma", "Tango Da Saudade"],
  // argentine tango 1
  [
    "Poema",
    "Gina",
    "Tango to Evora",
    "Contigo Aprendi",
    "Santa Maria",
    "Gran Hotel Victoria",
    "La Cumparsita",
    "Vi Luz y Subi",
    "Scent of a Woman",
    "El Aire en Mis Manos",
  ],
  // bachata 2
  [
    "Ayer",
    "The Lonely Bull",
    "Ve Y Dile",
    "Bachata en Fukuoka",
    "Dejame Entrar En Ti",
    "Romance en Bachata",
    "Tengo Una Espina",
  ],
  // bolero 3
  ["Beautiful Maria Of My Soul", "Corrine", "Todo O Nana"],
  // cha cha 4
  [
    "All About That Bass",
    "Cha Cha Latino",
    "Dance the Night Away",
    "Smooth",
    "Oye Como Va",
    "Perhaps, Perhaps, Perhaps",
    "Suave",
    "Tea For Two",
    "As if",
    "Banana Boat",
    "Black Magic Woman",
    "Boogie Shoes",
    "Cerezo Rosa",
    "Harlem Nocturne (Cha)",
    "Hula Hoop",
    "I Will Survive",
    "In These Shoes",
    "Mi Mi Mi",
    "On Broadway",
    "South Of Santa Fe",
    "I See You",
    "Todo Todo Todo",
    "Tu Boca",
  ],
  // cowboy cha cha 5
  ["Neon Moon", "Playa Silencio", "Third Rate Romance"],
  //ecs 6
  [
    "Drive My Car",
    "No Particular Place to Go",
    "Old Time Rock & Roll",
    "Pride And Joy",
    "40 Ford Time",
    "A Hard Days Night",
    "All Night Long",
    "Dancing Days",
    "Dizzy Miss Lizzy",
    "Exs and Ohs",
    "Joy to the World",
    "Last Night (Single)",
    "Money (Thats What I Want)",
    "Oh Pretty Woman",
    "Respect",
    "Rockin Pneumonia",
    "Satisfaction",
    "Sick and Tired",
    "Start Me Up",
    "The Ballad Of John And Yoko",
    "Ticket To Ride",
    "Werewolves Of London",
    "Thing Called Love",
    "Thatll Be The Day",
    "Rock Around The Clock",
    "Baby Likes To Rock It",
  ],
  // foxtrot 7
  [
    "Aint That A Kick In The Head",
    "Ive Got You Under My Skin",
    "Just In Time",
    "On The Sunny Side Of The Street",
    "All Of Me",
    "Am I Blue",
    "Banana Wind",
    "Beyond The Sea",
    "Call Me Irresponsible",
    "Days Of Wine And Roses",
    "How Little We Know",
    "I Like To Lead When I Dance",
    "Long Ago And Far Away",
    "Most Every Night",
    "River Stay Way From My Door",
    "Swinging On A Star",
    "The Glory Of Love",
    "Theme From New York, New York",
    "What If I Loved You",
    "What Is This Thing Called Love",
    "Lazy River",
  ],
  // hustle 8
  [
    "Ring my Bell",
    "Disco Inferno",
    "Celebration",
    "Ladies Night",
    "Fresh",
    "If I Cant Have You",
    "Keep It Comin Love",
    "Never Gonna Give You Up",
    "Strangers In The Night",
    "What Does It Take",
    "Youll Never Find Another Love Like Mine",
    "More Than A Woman",
  ],
  // Line Dance 9

  [
    "Cupid Shuffle",
    "Chaka Chaka",
    "Electric Boogie",
    "Ooh La La",
    "Macarena",
    "Cha Tango",
    "See You Later Alligator",
    "Havana",
    "Boot Scootin Boogie",
    "Shake A Tail Feather",
  ],
  // mambo 10
  ["Mambo No. 5", "Mambo Italiano", "Mexico", "Papa Loves Mambo"],

  // merenque 11
  ["Suavemente", "Mi PC", "Dia de Fiesta", "Dance Merengue"],
  // nc2 12
  [
    "Home",
    "Lady in Red",
    "The Long Goodbye",
    "Valentine",
    "I Hope You Dance",
    "Let Me Hold You",
    "Old Flame",
    "Remember When",
    "Sleepwalk",
    "The Dance",
    "Lithium",
    "While My Guitar Gently Weeps",
    "Persuasion",
    "I Still Believe In You",
  ],
  // polka 13
  ["Clarinet Polka", "John Ryans Polka", "Polka Medley"],
  // quickstep 14
  [
    "Ballroom Jive",
    "Dancin Fool",
    "Diamonds Are A Girls Best Friend",
    "In The Good Old Summertime",
    "One Jump Ahead",
    "Puttin  On The Ritz",
    "Somethings Gotta Give",
    "Star Wars Cantina Band",
    "Trying To Cut Back",
    "Youre The Cream In My Coffee",
  ],
  //rumba 15
  [
    "Acerate Mas",
    "Beautiful Love",
    "My Heart Will Go On",
    "Besame Mucho",
    "Blue Bayou",
    "Cuando Me Guerias",
    "Dont Know Why",
    "En Mi Soledad",
    "Harlem Nocturne (Rumba)",
    "Islands In The Mist",
    "Quiereme Mucho",
    "Spanish Eyes",
    "Venus",
    "Unbreak My Heart",
  ],
  // salsa 16
  ["I Got A Girl", "Limbo Rock", "Tequila"],
  // samba 17"
  [
    "A Night In New York",
    "Amor",
    "La Isla Bonita",
    "La Vida Es Un Carnaval",
    "Mil Pasos",
    "Samba del Rio",
    "Youll Never Find Another Love",
  ],
  // texas 2 step 18
  [
    "A Better Man",
    "Wagon Wheel",
    "All My Exs Live in Texas",
    "Why Not Me",
    "Hot Rod Mercury",
    "I Feel Lucky",
    "Seven Year Ache",
    "A Good Run Of Bad Luck",
  ],
  // viennese waltz 19
  [
    "Kiss From A Rose",
    "Time In a Bottle",
    "Tales From The Vienna Woods",
    "The Blue Danube",
    "Magical Music Box",
    "On The Sidewalks Of New York",
    "Once Upon A Dream",
  ],
  // waltz 20
  [
    "Appalachian Lullabye",
    "Les Bicyclettes De Belsize",
    "Midnight Waltz",
    "Nocturne",
    "If There Was A Man",
    "Mozart Concerto",
    "Smokey Mountain Lullaby",
    "Spring",
    "Take It To Heart",
    "The Last Waltz",
    "What The World Needs Now Is Love",
    "Where Is Your Heart",
    "When I Said I Do",
    "Take It To The Limit",
  ],

  // west coast swing 21
  [
    "The Thrill Is Gone",
    "Billie Jean",
    "Chain Of Fools",
    "Think",
    "Cocaine",
    "Everything I Need",
    "Fire",
    "Glory Of Love",
    "Layla",
    "Mustang Sally",
    "Wade In The Water",
    "Sixteen Tons",
    "What Kind Of Woman Is This",
    "You Can Leave Your Hat On",
    "Shes No Lady",
  ],

  // western waltz 22
  [
    "Take It To The Limit",
    "Tennessee Waltz",
    "The Tips Of My Fingers",
    "Their Hearts Are Dancing",
    "Tucson Too Soon",
    "Waltz Across Texas",
    "You Look So Good In Love",
    "You Make The Moonlight",
  ],
];

// ****************************************************************************
let songIndex = 0;
let danceIndex = 0;
let playListIndex = 0;
totalSongs = 0;
let category = "atango";
cover.src = "img/vinyl.png";
let header = [];
let categories = [[]];
let playList = [];

initSongCounts();
if (!window.localStorage) alert("Sorry, you're using an ancient browser");
else {
  localStorage.mySongList = JSON.stringify(songList);
}
if (!window.localStorage) alert("Sorry, you're using an ancient browser");
else {
  localStorage.myCategories = JSON.stringify(header);
}

// puts the counts of how many songs with each type in the button
function initSongCounts() {
  let c = 0;
  c = songList[0].length;
  amTangoBtn.innerText += ` (${c})  `;
  header[0] = "American Tango";
  categories[0] = ["amtango", 1];
  //
  c = songList[1].length;
  aTangoBtn.innerText += ` (${c})  `;
  header[1] = "Argentine Tango";
  categories[1] = ["atango", 3];
  //
  c = songList[2].length;
  bachataBtn.innerText += ` (${c})  `;
  header[2] = "Bachata";
  categories[2] = ["bachata", 3];
  //
  c = songList[3].length;
  boleroBtn.innerText += ` (${c})  `;
  header[3] = "Bolero";
  categories[3] = ["bolero", 1];
  //
  c = songList[4].length;
  chachaBtn.innerText += ` (${c})  `;
  header[4] = "Cha Cha";
  categories[4] = ["chacha", 3];
  //
  c = songList[5].length;
  cChachaBtn.innerText += ` (${c})  `;
  header[5] = "Cowboy Cha Cha";
  categories[5] = ["cbychacha", 1];
  //
  c = songList[6].length;
  ecsBtn.innerText += ` (${c})  `;
  header[6] = "East Coast Swing";
  categories[6] = ["ecs", 4];
  //
  c = songList[7].length;
  foxtrotBtn.innerText += ` (${c})  `;
  header[7] = "Foxtrot";
  categories[7] = ["foxtrot", 4];
  //

  c = songList[8].length;
  hustleBtn.innerText += ` (${c})  `;
  header[8] = "Hustle";
  categories[8] = ["hustle", 2];
  //
  c = songList[9].length;
  specialBtn.innerText += ` (${c})  `;
  header[9] = "Line Dance";
  categories[9] = ["special", 2];
  //
  c = songList[10].length;
  mamboBtn.innerText += ` (${c})  `;
  header[10] = "Mambo";
  categories[10] = ["mambo", 1];
  //
  c = songList[11].length;
  merenqueBtn.innerText += ` (${c})  `;
  header[11] = "Merengue";
  categories[11] = ["merenque", 1];

  //
  c = songList[12].length;
  nc2Btn.innerText += ` (${c})  `;
  header[12] = "Nightclub Two Step";
  categories[12] = ["nc2", 4];
  //
  //
  c = songList[13].length;
  polkaBtn.innerText += ` (${c})  `;
  header[13] = "Polka";
  categories[13] = ["polka", 1];
  //
  c = songList[14].length;
  quickstepBtn.innerText += ` (${c})  `;
  header[14] = "Quickstep";
  categories[14] = ["quickstep", 1];
  //
  c = songList[15].length;
  rumbaBtn.innerText += ` (${c})  `;
  header[15] = "Rumba";
  categories[15] = ["rumba", 4];

  //
  c = songList[16].length;
  salsaBtn.innerText += ` (${c})  `;
  header[16] = "Salsa";
  categories[16] = ["salsa", 1];

  //
  c = songList[17].length;
  sambaBtn.innerText += ` (${c})  `;
  header[17] = "Samba";
  categories[17] = ["samba", 1];

  //
  //
  c = songList[18].length;
  TwoStepBtn.innerText += ` (${c})  `;
  header[18] = "Texas Two Step";
  categories[18] = ["2step", 1];

  c = songList[19].length;
  vWaltzBtn.innerText += ` (${c})  `;
  header[19] = "Viennese Waltz";
  categories[19] = ["vwaltz", 1];

  c = songList[20].length;
  waltzBtn.innerText += ` (${c})  `;
  header[20] = "Waltz";
  categories[20] = ["waltz", 4];
  //
  c = songList[21].length;
  wcsBtn.innerText += ` (${c})  `;
  header[21] = "West Coast Swing";
  categories[21] = ["wcs", 3];
  //
  c = songList[22].length;
  wWaltzBtn.innerText += ` (${c})  `;
  header[22] = "Western Waltz";
  categories[22] = ["wwaltz", 1];
}
const message = new SpeechSynthesisUtterance();
var myVolume = message.volume;

function setAtango() {
  danceIndex = 1;
  doList(danceIndex);
}
function setBachata() {
  danceIndex = 2;
  doList(danceIndex);
}
function setChacha() {
  danceIndex = 4;
  doList(danceIndex);
}
function setEcs() {
  danceIndex = 6;
  doList(danceIndex);
}
function setFoxtrot() {
  danceIndex = 7;
  doList(danceIndex);
}
function setNc2() {
  danceIndex = 12;
  doList(danceIndex);
}
function setWaltz() {
  danceIndex = 20;
  doList(danceIndex);
}
function setWcs() {
  danceIndex = 21;
  doList(danceIndex);
}
function setRumba() {
  danceIndex = 15;
  doList(danceIndex);
}
function setHustle() {
  danceIndex = 8;
  doList(danceIndex);
}
function setMerenque() {
  danceIndex = 11;
  doList(danceIndex);
}
function setBolero() {
  danceIndex = 3;
  doList(danceIndex);
}
function setVwaltz() {
  danceIndex = 19;
  doList(danceIndex);
}
function setTwoStep() {
  danceIndex = 18;
  doList(danceIndex);
}
function setcChacha() {
  danceIndex = 5;
  doList(danceIndex);
}
function setSpecial() {
  danceIndex = 9;
  doList(danceIndex);
}
function setPolka() {
  danceIndex = 13;
  doList(danceIndex);
}
function setQuickstep() {
  danceIndex = 14;
  doList(danceIndex);
}
function setMambo() {
  danceIndex = 10;
  doList(danceIndex);
}
function setSamba() {
  danceIndex = 17;
  doList(danceIndex);
}
function setSalsa() {
  danceIndex = 16;
  doList(danceIndex);
}
function setamTango() {
  danceIndex = 0;
  doList(danceIndex);
}
function setwWaltz() {
  danceIndex = 22;
  doList(danceIndex);
}
function doList(danceIndex) {
  removeplayListListeners();
  addGeneraListeners();
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
//
function setRandomplayList() {
  removeGeneraListeners();
  addplayListListeners();

  createRandomplayList();

  danceIndex = playList[0][0];
  songIndex = playList[0][1];
  localStorage.setItem("playListIndex", 0);
  setSongName();
  playSong();
}
function setOldRandomplayList() {
  playListIndex = 0;
  let playListFound = 0;
  try {
    playList = JSON.parse(localStorage.myPlaylist);
    playListFound = 1;
  } catch (exception) {
    console.log("no existing playlist");
  }

  try {
    playListIndex = JSON.parse(localStorage.playListIndex);
  } catch (exception) {
    playListIndex = 0;
  }

  if (playListFound === 1) {
    removeGeneraListeners();
    addplayListListeners();

    danceIndex = playList[playListIndex][0];
    songIndex = playList[playListIndex][1];

    setSongName();
    playSong();
  } else {
    setRandomplayList();
  }
}

function getRandomSong(danceIndex) {
  let maxv = songList[danceIndex].length - 1;

  return Math.floor(Math.random() * maxv);
}
function getRandomDance() {
  let maxv = songList.length - 1;
  return Math.floor(Math.random() * maxv);
}

function createRandomplayList() {
  let totalSongs = 0;
  for (i = 0; i < categories.length; i++) {
    let maxCount = categories[i][1];
    let danceIndex = i;
    for (j = 0; j < maxCount; j++) {
      let songIndex = getRandomSong(danceIndex);
      let songInPlaylist = 0;
      for (k = 0; k < playList.length; k++) {
        if (playList[k][1] === songIndex && playList[k][0] === danceIndex) {
          songInPlaylist = 1;
        }
      }
      if (songInPlaylist === 0) {
        playList[totalSongs] = [danceIndex, songIndex];
        totalSongs++;
      }
    }
  }

  //
  shuffle(playList);
  shuffle(playList);

  if (!window.localStorage) alert("Sorry, you're using an ancient browser");
  else {
    localStorage.myPlaylist = JSON.stringify(playList);
  }
}

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

function setSongName() {
  category = categories[danceIndex][0];
  hdrType = header[danceIndex];
  song = songList[danceIndex][songIndex];
  loadSong(category, song);
  let announce = `The next song is a ${hdrType}.`;
  setTextMessage(announce);
  speakText();
}
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

//     song functions
function loadSong(category, song) {
  musictype.innerText = `  ${hdrType} :  ${song} `;
  audio.src = `music/${category}/${song}.mp3`;
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}
function updateDuration() {
  const duration = audio.duration;
  musictype.innerText += `  --   ${convertTime(duration)}`;
}
function prevSongInGenera() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songList[danceIndex].length - 1;
  }
  song = songList[danceIndex][songIndex];
  loadSong(category, song);
  playSong(song);
}
function nextSongInGenera() {
  songIndex++;
  if (songIndex >= songList[danceIndex].length) {
    songIndex = 0;
  }
  song = songList[danceIndex][songIndex];
  setSongName();
  playSong();
}
function prevSongInplayList() {
  playListIndex--;
  localStorage.setItem("playListIndex", playListIndex);
  if (playListIndex < 0) {
    playListIndex = playList.length - 1;
  }
  danceIndex = playList[playListIndex][0];
  songIndex = playList[playListIndex][1];
  song = songList[danceIndex][songIndex];
  setSongName();
  playSong();
}
function nextSongInplayList() {
  playListIndex++;
  localStorage.setItem("playListIndex", playListIndex);
  if (playListIndex >= playList.length) {
    playListIndex = 0;
  }
  danceIndex = playList[playListIndex][0];
  songIndex = playList[playListIndex][1];
  song = songList[danceIndex][songIndex];
  setSongName();
  playSong();
}
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
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
//* Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
function addGeneraListeners() {
  audio.addEventListener("ended", nextSongInGenera);
  nextBtn.addEventListener("click", nextSongInGenera);
  prevBtn.addEventListener("click", prevSongInGenera);
}
function removeGeneraListeners() {
  audio.removeEventListener("ended", nextSongInGenera);
  nextBtn.removeEventListener("click", nextSongInGenera);
  prevBtn.removeEventListener("click", prevSongInGenera);
}
function addplayListListeners() {
  audio.addEventListener("ended", nextSongInplayList);
  nextBtn.addEventListener("click", nextSongInplayList);
  prevBtn.addEventListener("click", prevSongInplayList);
}
function removeplayListListeners() {
  audio.removeEventListener("ended", nextSongInplayList);
  nextBtn.removeEventListener("click", nextSongInplayList);
  prevBtn.removeEventListener("click", prevSongInplayList);
}
function setTextMessage(text) {
  message.text = text;
}
function speakText() {
  speechSynthesis.speak(message);
}
// event listeners
aTangoBtn.addEventListener("click", setAtango);
chachaBtn.addEventListener("click", setChacha);
bachataBtn.addEventListener("click", setBachata);
ecsBtn.addEventListener("click", setEcs);
foxtrotBtn.addEventListener("click", setFoxtrot);
nc2Btn.addEventListener("click", setNc2);
waltzBtn.addEventListener("click", setWaltz);
wcsBtn.addEventListener("click", setWcs);
rumbaBtn.addEventListener("click", setRumba);
hustleBtn.addEventListener("click", setHustle);
boleroBtn.addEventListener("click", setBolero);
merenqueBtn.addEventListener("click", setMerenque);
vWaltzBtn.addEventListener("click", setVwaltz);
TwoStepBtn.addEventListener("click", setTwoStep);
cChachaBtn.addEventListener("click", setcChacha);
specialBtn.addEventListener("click", setSpecial);
polkaBtn.addEventListener("click", setPolka);
quickstepBtn.addEventListener("click", setQuickstep);
mamboBtn.addEventListener("click", setMambo);
sambaBtn.addEventListener("click", setSamba);
salsaBtn.addEventListener("click", setSalsa);
amTangoBtn.addEventListener("click", setamTango);
wWaltzBtn.addEventListener("click", setwWaltz);
randomBtn.addEventListener("click", setRandomplayList);
oldrandomBtn.addEventListener("click", setOldRandomplayList);

//

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("durationchange", updateDuration);
progressContainer.addEventListener("click", setProgress);
