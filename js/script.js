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
  // waltz 0
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
  ],
  // nc2 1
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
  ],
  //ecs 2
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
    "Satisfaction (I Cant Get No)",
    "Sick and Tired",
    "Start Me Up",
    "The Ballad Of John And Yoko",
    "Ticket To Ride",
    "Werewolves Of London",
  ],
  // argentine tango 3
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
  // bachata 4
  [
    "Ayer",
    "The Lonely Bull",
    "Ve Y Dile",
    "Bachata en Fukuoka",
    "Dejame Entrar En Ti",
    "Romance en Bachata",
    "Tengo Una Espina",
  ],
  // foxtrot 5
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
  ],
  // west coast swing 6
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
  ],
  // cha cha 7
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
  ],
  //rumba 8
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
  ],
  // hustle 9
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
  ],
  // merenque 10
  ["Suavemente", "Mi PC", "Dia de Fiesta", "Dance Merengue"],
  // bolero 11
  ["Beautiful Maria Of My Soul", "Corrine", "Todo O Nana"],
  // viennese waltz 12
  [
    "Kiss From A Rose",
    "Time In a Bottle",
    "Tales From The Vienna Woods",
    "The Blue Danube",
    "Magical Music Box",
    "On The Sidewalks Of New York",
    "Once Upon A Dream",
  ],
  // texas 2 step 13
  [
    "A Better Man",
    "Wagon Wheel",
    "All My Exs Live in Texas",
    "Why Not Me",
    "Hot Rod Mercury",
    "I Feel Lucky",
    "Seven Year Ache",
  ],
  // cowboy cha cha 14
  ["Neon Moon", "Playa Silencio", "Third Rate Romance"],
  // special 15
  ["Cupid Shuffle", "Chaka Chaka", "Electric Boogie", "Ooh La La", "Macarena"],
  // polka 16
  ["Clarinet Polka", "John Ryans Polka", "Polka Medley"],
  // quickstep 17
  [
    "Ballroom Jive",
    "Dancin Fool",
    "Diamonds Are A Girls Best Friend",
    "In The Good Old Summertime",
    "One Jump Ahead",
    "Puttin On The Ritz",
    "Somethings Gotta Give",
    "Star Wars Cantina Band",
    "Trying To Cut Back",
    "Youre The Cream In My Coffee",
  ],
  // mambo 18
  ["Mambo No. 5", "Mambo Italiano", "Mexico", "Papa Loves Mambo"],
  // samba 19"
  [
    "A Night In New York",
    "Amor",
    "La Isla Bonita",
    "La Vida Es Un Carnaval",
    "Mil Pasos",
    "Samba del Rio",
    "Youll Never Find Another Love (Samba)",
  ],
  // salsa 20
  ["I Got A Girl", "Limbo Rock", "Tequila"],
  // ballroom tango 21
  ["Amapola", "Blue Tango", "La Paloma", "Tango Da Saudade"],
  // western waltz 22
  [
    "Take It To The Limit",
    "Tennessee Waltz",
    "The Tips Of My Fingers",
    "Their Hearts Are Dancing",
    "Tucson Too Soon",
    "Waltz Across Texas",
    "You Look So Good In Love",
  ],
];

// ****************************************************************************
let songIndex = 0;
let danceIndex = 0;
let playListIndex = 0;
totalSongs = 0;
let category = "atango";
cover.src = "img/vinyl.jpg";
let header = [];
let categories = [[]];
let playList = [];

initSongCounts();
if (!window.localStorage) alert("Sorry, you're using an ancient browser");
else {
  localStorage.myArray = JSON.stringify(songList);
}
if (!window.localStorage) alert("Sorry, you're using an ancient browser");
else {
  localStorage.myCategories = JSON.stringify(header);
}

// puts the counts of how many songs with each type in the button
function initSongCounts() {
  let c = 0;
  c = songList[0].length;
  waltzBtn.innerText += ` (${c})  `;
  header[0] = "Waltz";
  categories[0] = ["waltz", 5];

  //
  c = songList[1].length;
  nc2Btn.innerText += ` (${c})  `;
  header[1] = "Nightclub Two Step";
  categories[1] = ["nc2", 5];
  //
  c = songList[2].length;
  ecsBtn.innerText += ` (${c})  `;
  header[2] = "East Coast Swing";
  categories[2] = ["ecs", 5];

  //
  c = songList[3].length;
  aTangoBtn.innerText += ` (${c})  `;
  header[3] = "Argentine Tango";
  categories[3] = ["atango", 2];
  //
  c = songList[4].length;
  bachataBtn.innerText += ` (${c})  `;
  header[4] = "Bachata";
  categories[4] = ["bachata", 2];

  //
  c = songList[5].length;
  foxtrotBtn.innerText += ` (${c})  `;
  header[5] = "Foxtrot";
  categories[5] = ["foxtrot", 4];
  //
  c = songList[6].length;
  wcsBtn.innerText += ` (${c})  `;
  header[6] = "West Coast Swing";
  categories[6] = ["wcs", 3];

  //
  c = songList[7].length;
  chachaBtn.innerText += ` (${c})  `;
  header[7] = "Cha Cha";
  categories[7] = ["chacha", 4];

  //
  c = songList[8].length;
  rumbaBtn.innerText += ` (${c})  `;
  header[8] = "Rumba";
  categories[8] = ["rumba", 4];
  //
  c = songList[9].length;
  hustleBtn.innerText += ` (${c})  `;
  header[9] = "Hustle";
  categories[9] = ["hustle", 2];

  //
  c = songList[10].length;
  merenqueBtn.innerText += ` (${c})  `;
  header[10] = "Merengue";
  categories[10] = ["merenque", 1];

  //
  c = songList[11].length;
  boleroBtn.innerText += ` (${c})  `;
  header[11] = "Bolero";
  categories[11] = ["bolero", 1];

  //
  c = songList[12].length;
  vWaltzBtn.innerText += ` (${c})  `;
  header[12] = "Viennese Waltz";
  categories[12] = ["vwaltz", 1];

  //
  c = songList[13].length;
  TwoStepBtn.innerText += ` (${c})  `;
  header[13] = "Texas Two Step";
  categories[13] = ["2step", 1];

  //
  c = songList[14].length;
  cChachaBtn.innerText += ` (${c})  `;
  header[14] = "Cowboy Cha Cha";
  categories[14] = ["cbychacha", 1];

  //
  c = songList[15].length;
  specialBtn.innerText += ` (${c})  `;
  header[15] = "Special Line Dance";
  categories[15] = ["special", 2];

  //
  c = songList[16].length;
  polkaBtn.innerText += ` (${c})  `;
  header[16] = "Polka";
  categories[16] = ["polka", 1];

  //
  c = songList[17].length;
  quickstepBtn.innerText += ` (${c})  `;
  header[17] = "Quickstep";
  categories[17] = ["quickstep", 1];

  //
  c = songList[18].length;
  mamboBtn.innerText += ` (${c})  `;
  header[18] = "Mambo";
  categories[18] = ["mambo", 1];

  //
  c = songList[19].length;
  sambaBtn.innerText += ` (${c})  `;
  header[19] = "Samba";
  categories[19] = ["samba", 1];

  //
  c = songList[20].length;
  salsaBtn.innerText += ` (${c})  `;
  header[20] = "Salsa";
  categories[20] = ["salsa", 1];

  //
  //
  c = songList[21].length;
  amTangoBtn.innerText += ` (${c})  `;
  header[21] = "Ballroom Tango";
  categories[21] = ["amtango", 1];

  //
  //
  c = songList[22].length;
  wWaltzBtn.innerText += ` (${c})  `;
  header[22] = "Western Waltz";
  categories[22] = ["wwaltz", 1];

  //
  //
}
const message = new SpeechSynthesisUtterance();
var myVolume = message.volume;

function setAtango() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 3;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setBachata() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 4;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setChacha() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 7;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setEcs() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 2;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setFoxtrot() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 5;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setNc2() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 1;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setWaltz() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 0;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setWcs() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 6;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setRumba() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 8;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setHustle() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 9;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setMerenque() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 10;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setBolero() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 11;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setVwaltz() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 12;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setTwoStep() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 13;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setcChacha() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 14;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setSpecial() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 15;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setPolka() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 16;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setQuickstep() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 17;
  setSongName();
  playSong();
}
function setMambo() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 18;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setSamba() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 19;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setSalsa() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 20;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setamTango() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 21;
  songIndex = getRandomSong(danceIndex);
  setSongName();
  playSong();
}
function setwWaltz() {
  removeplayListListeners();
  addGeneraListeners();
  danceIndex = 22;
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

  setSongName();
  playSong();
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
    for (j = 0; j <= maxCount; j++) {
      let songIndex = getRandomSong(danceIndex);
      playList[totalSongs] = [danceIndex, songIndex];
      totalSongs++;
    }
  }

  //
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
  title.innerText = `Song Title: ${song}`;
  musictype.innerText = `Dance Type:  ${hdrType} `;
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

//

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
