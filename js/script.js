
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

const returnBtn = document.getElementById("returnBtn");
const customBtn = document.getElementById("customBtn");

const popUp = document.getElementById("popUp");

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
    "Trying to Get over You",
    "Old Flame",
    "Remember When",
    "Sleepwalk",
    "The Dance",
    "Lithium",
    "While My Guitar Gently Weeps",
    "Persuasion",
    "I Still Believe In You",
    "Desperado",
    "Have I Told You Lately",
    "Always Remember Us This Way",
    "The Dance",
    "Let it Hurt"


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
    "A Good Run Of Bad Luck",
    "Liza Jane",
    "One More Last Chance"
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
  // western Partner 23
  [
   "Blue Rose",
   "I Feel Lucky",
   "neon moon",
   "playa silencia",
   "Cha tango"
  ]
];

// ****************************************************************************
let songIndex = 0;
let playListIndex = 0;
totalSongs = 0;
let file = "atango";
cover.src = "img/vinyl.png";

let playList = [];
const message = new SpeechSynthesisUtterance();
var myVolume = message.volume;

//--------------------- making Dance an object
var danceArray = [];
var dancePlaying;

const Dance = function (
  name,
  songTitles,
  numPerRandomList,
  category,
  file,
  btn
) {
  this.danceType = name;
  this.songTitles = songTitles;
  this.numPerRandomList = numPerRandomList;
  this.currentSong = 0;
  this.category = category;
  this.file = file;
  this.numberOfSongs = this.songTitles.length;
  this.btn = btn;
};
Dance.prototype.setBtn = function () {
  this.btn = document.getElementById(this.btn);
  this.btn.innerText += ` (${this.numberOfSongs})  `;
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
  file = this.file;
  hdrType = this.danceType;
  song = this.songTitles[this.currentSong];

  let announce = `The next song is a ${hdrType}.`;
  setTextMessage(announce);
  speakText();
  
  loadSong(file, song); 
};

//------------------------------------------------
americanTango = new Dance(
  "American Tango",
  songList[0],
  1,
  "ballroom",
  "amtango",
  "amTangoBtn"
);
americanTango.setBtn();

argentineTango = new Dance(
  "Argentine Tango",
  songList[1],
  3,
  "Latin",
  "atango",
  "aTangoBtn"
);
argentineTango.setBtn();

bachata = new Dance(
  "Bachata",
  songList[2],
  3,
  "Latin",
  "bachata",
  "bachataBtn"
);
bachata.setBtn();
bolero = new Dance("Bolero", songList[3], 1, "Latin", "bolero", "boleroBtn");
bolero.setBtn();
chacha = new Dance("Cha Cha", songList[4], 3, "Latin", "chacha", "chachaBtn");
chacha.setBtn();
cbychacha = new Dance(
  "Cowboy Cha Cha",
  songList[5],
  1,
  "Western",
  "cbychacha",
  "cChachaBtn"
);
cbychacha.setBtn();
ecs = new Dance("East Coast Swing", songList[6], 4, "Swing", "ecs", "ecsBtn");
ecs.setBtn();
foxtrot = new Dance(
  "Fox Trot",
  songList[7],
  4,
  "Ballroom",
  "foxtrot",
  "foxtrotBtn"
);
foxtrot.setBtn();
hustle = new Dance("Hustle", songList[8], 2, "Swing", "hustle", "hustleBtn");
hustle.setBtn();
lineDance = new Dance(
  "Line Dance",
  songList[9],
  2,
  "Line Dance",
  "special",
  "specialBtn"
);
lineDance.setBtn();
mambo = new Dance("Mambo", songList[10], 1, "Latin", "mambo", "mamboBtn");
mambo.setBtn();
merengue = new Dance(
  "Merengue",
  songList[11],
  1,
  "Latin",
  "merenque",
  "merenqueBtn"
);
merengue.setBtn();
nc2 = new Dance(
  "Night Club Two Step",
  songList[12],
  4,
  "Western",
  "nc2",
  "nc2Btn"
);
nc2.setBtn();
polka = new Dance("Polka", songList[13], 1, "Ballroom", "polka", "polkaBtn");
polka.setBtn();
quickstep = new Dance(
  "Quickstep",
  songList[14],
  1,
  "Ballroom",
  "quickstep",
  "quickstepBtn"
);
quickstep.setBtn();
rumba = new Dance("Rumba", songList[15], 4, "Latin", "rumba", "rumbaBtn");
rumba.setBtn();
salsa = new Dance("Salsa", songList[16], 1, "Latin", "salsa", "salsaBtn");
salsa.setBtn();
samba = new Dance("Samba", songList[17], 1, "Latin", "samba", "sambaBtn");
samba.setBtn();
twostep = new Dance(
  "Two Step",
  songList[18],
  1,
  "Western",
  "2step",
  "TwoStepBtn"
);
twostep.setBtn();
vwaltz = new Dance(
  "Viennese Waltz",
  songList[19],
  1,
  "Ballroom",
  "vwaltz",
  "vWaltzBtn"
);
vwaltz.setBtn();
waltz = new Dance("Waltz", songList[20], 4, "Ballroom", "waltz", "waltzBtn");
waltz.setBtn();
wcs = new Dance("West Coast Swing", songList[21], 2, "Swing", "wcs", "wcsBtn");
wcs.setBtn();

wwaltz = new Dance(
  "Western Waltz",
  songList[22],
  1,
  "Western",
  "wwaltz",
  "wWaltzBtn"
);
wwaltz.setBtn();
wpartner = new Dance(
  "Western Partner",
  songList[23],
  2,
  "Western",
  "wpartner",
  "wPartnerBtn"
);
wpartner.setBtn();


if (!window.localStorage) alert("Sorry, you're using an ancient browser");
else {
  localStorage.myDanceArray = JSON.stringify(danceArray);
}

function setDance(dance) {
  dancePlaying = dance;
  dance.playTheList();
}

//
function setRandomplayList() {
  removeGeneraListeners();
  addplayListListeners();

  createRandomplayList();

  playListIndex = 0;
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
    setSongName();
    playSong();
  } else {
    setRandomplayList();
  }
}

function createRandomplayList() {
 
  let totalSongs = 0;
  for (i = 0; i < danceArray.length; i++) {
    let maxCount = danceArray[i].numPerRandomList;

    for (j = 0; j < maxCount; j++) {
      let songIndex = danceArray[i].selectRandomSong();

      playList[totalSongs] = [
        danceArray[i].danceType,
        danceArray[i].file,
        danceArray[i].songTitles[songIndex],
      ];

      totalSongs++;
    }
  }
  //
  shuffle(playList);
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
  hdrType = playList[playListIndex][0];

  let announce = `The next song is a ${hdrType}.`;
  setTextMessage(announce);
  speakText();
  
  loadSong(playList[playListIndex][1], playList[playListIndex][2]); 
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}
function setTextMessage(text) {
  message.text = text;
}
function speakText() {
  speechSynthesis.speak(message);
}
//     song functions
function loadSong(file, song) {
  musictype.innerText = `  ${hdrType} :  ${song} `;
  audio.src = `music/${file}/${song}.mp3`;
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
  dancePlaying.currentSong--;

  if (dancePlaying.currentSong < 0) {
    dancePlaying.currentSong = dancePlaying.numberOfSongs - 1;
  }

  dancePlaying.setSongName();
  playSong();
}
function nextSongInGenera() {
  dancePlaying.currentSong++;
  if (dancePlaying.currentSong >= dancePlaying.numberOfSongs) {
    dancePlaying.currentSong = 0;
  }
  dancePlaying.setSongName();
  playSong();
}
function prevSongInplayList() {
  playListIndex--;

  if (playListIndex < 0) {
    playListIndex = playList.length - 1;
  }
  localStorage.setItem("playListIndex", playListIndex);
  setSongName();
  playSong();
}
function nextSongInplayList() {
  playListIndex++;

  if (playListIndex >= playList.length) {
    playListIndex = 0;
  }
  localStorage.setItem("playListIndex", playListIndex);
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
function customizePlaylist() {
  setCounts();
  popUp.classList.remove("vis-hidden");
}
function updateCounts() {
  danceArray[0].numPerRandomList = numAmTango.value  ;
  danceArray[1].numPerRandomList = numArgTango.value;
  danceArray[2].numPerRandomList = numBachata.value;
  danceArray[3].numPerRandomList =  numBolero.value;
  danceArray[4].numPerRandomList = numChaCha.value;
  danceArray[5].numPerRandomList = numCbyCha.value ;
  danceArray[6].numPerRandomList = numECoast.value ;
  danceArray[7].numPerRandomList = numFoxtrot.value ;
  danceArray[8].numPerRandomList = numHustle.value;
  danceArray[9].numPerRandomList = numLineDance.value ;
  danceArray[10].numPerRandomList = numMambo.value ;
  danceArray[11].numPerRandomList =  numMerengue.value ;
  danceArray[12].numPerRandomList = numNightClub.value;
  danceArray[13].numPerRandomList =  numPolka.value;
  danceArray[14].numPerRandomList = numQuickStep.value;
  danceArray[15].numPerRandomList = numRumba.value;
  danceArray[16].numPerRandomList = numSalsa.value;
  danceArray[17].numPerRandomList = numSamba.value;
  danceArray[18].numPerRandomList = numTwoStep.value ;
  danceArray[19].numPerRandomList = numVWaltz.value ;
  danceArray[20].numPerRandomList= numWaltz.value;
  danceArray[21].numPerRandomList = numWCSwing.value ;  
  danceArray[22].numPerRandomList = numWWaltz.value; 
  danceArray[23].numPerRandomList = numWPartner.value;

}
function returnPlay() {
  updateCounts();
  popUp.classList.add("vis-hidden");
  setRandomplayList();
}
function setCounts() {
  numAmTango.value =  danceArray[0].numPerRandomList;
  numArgTango.value = danceArray[1].numPerRandomList;
  numBachata.value = danceArray[2].numPerRandomList;
  numBolero.value =  danceArray[3].numPerRandomList;
  numChaCha.value =  danceArray[4].numPerRandomList;
  numCbyCha.value =  danceArray[5].numPerRandomList;
  numECoast.value = danceArray[6].numPerRandomList;
  numFoxtrot.value = danceArray[7].numPerRandomList;
  numHustle.value = danceArray[8].numPerRandomList;
  numLineDance.value = danceArray[9].numPerRandomList;
  numMambo.value = danceArray[10].numPerRandomList;
  numMerengue.value = danceArray[11].numPerRandomList;
  numNightClub.value = danceArray[12].numPerRandomList;
  numPolka.value = danceArray[13].numPerRandomList;
  numQuickStep.value = danceArray[14].numPerRandomList;
  numRumba.value = danceArray[15].numPerRandomList;
  numSalsa.value = danceArray[16].numPerRandomList;
  numSamba.value = danceArray[17].numPerRandomList;
  numTwoStep.value = danceArray[18].numPerRandomList;
  numVWaltz.value = danceArray[19].numPerRandomList;
  numWaltz.value = danceArray[20].numPerRandomList;
  numWCSwing.value = danceArray[21].numPerRandomList;  
  numWWaltz.value = danceArray[22].numPerRandomList;
  numWPartner.value = danceArray[23].numPerRandomList;
}
//------------------------------------------------
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

// event listeners

aTangoBtn.addEventListener("click", function () {
  setDance(argentineTango);
});
chachaBtn.addEventListener("click", function () {
  setDance(chacha);
});
bachataBtn.addEventListener("click", function () {
  setDance(bachata);
});
ecsBtn.addEventListener("click", function () {
  setDance(ecs);
});
foxtrotBtn.addEventListener("click", function () {
  setDance(foxtrot);
});
nc2Btn.addEventListener("click", function () {
  setDance(nc2);
});
waltzBtn.addEventListener("click", function () {
  setDance(waltz);
});
wcsBtn.addEventListener("click", function () {
  setDance(wcs);
});
rumbaBtn.addEventListener("click", function () {
  setDance(rumba);
});
hustleBtn.addEventListener("click", function () {
  setDance(hustle);
});
boleroBtn.addEventListener("click", function () {
  setDance(bolero);
});
merenqueBtn.addEventListener("click", function () {
  setDance(merengue);
});
vWaltzBtn.addEventListener("click", function () {
  setDance(vwaltz);
});
TwoStepBtn.addEventListener("click", function () {
  setDance(twostep);
});
cChachaBtn.addEventListener("click", function () {
  setDance(cbychacha);
});
specialBtn.addEventListener("click", function () {
  setDance(lineDance);
});
polkaBtn.addEventListener("click", function () {
  setDance(polka);
});
quickstepBtn.addEventListener("click", function () {
  setDance(quickstep);
});
mamboBtn.addEventListener("click", function () {
  setDance(mambo);
});
sambaBtn.addEventListener("click", function () {
  setDance(samba);
});
salsaBtn.addEventListener("click", function () {
  setDance(salsa);
});
amTangoBtn.addEventListener("click", function () {
  setDance(americanTango);
});
wWaltzBtn.addEventListener("click", function () {
  setDance(wwaltz);
});
wPartnerBtn.addEventListener("click", function () {
  setDance(wpartner);
});

//
randomBtn.addEventListener("click", setRandomplayList);
oldrandomBtn.addEventListener("click", setOldRandomplayList);
customBtn.addEventListener("click", customizePlaylist);

returnBtn.addEventListener("click", returnPlay);

//

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("durationchange", updateDuration);
progressContainer.addEventListener("click", setProgress);
