<?php
session_start();
require_once 'config/Database.php';
require_once 'models/User.php';
require_once 'models/Playlist.php';
$row_count = 0;
$num_playlists = 0;
$result = 0;
$playlistArray = [];
$database = new Database();
$db = $database->connect();
$user = new User($db);
$playList = new Playlist($db);
$_SESSION['findsongurl'] = $_SERVER['REQUEST_URI']; 

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
    />
    <link rel="stylesheet" href="css/style.css" />

    <title>SBDC Robo DJ Find a Song</title>

  </head>

<body>
<nav class="nav">
    <div class="container">
      <ul>
        <li><a href="index.php">Return Home</a></li>
        <?php 
        if (isset($_SESSION['username'])) {
      echo '<li><a href="songlist.php" > Show Song Lists</a></li>';
      echo '<li><a href="playlists.php"> Manage Playlists</a></li>';
      echo '<li><a href="manageRequests.php"> Manage Request Songs</a></li>';

   } 
        ?>
      </ul>
    </div>
</nav>
<div class="content">
     <h3>Input all or part of a Song Name to see if Robo DJ has the song</h3> 
  <div class="form-box">
    <!-- <form id="songSearchForm"> -->
   <form id="songSearchForm" onsubmit="searchSongs();return false">
      <label for="songsearch">Song Name</label><br>
      <input type="text" name="songsearch" title="enter all or part of a song name">
      <button class="list-Btn" type="submit" name="SearchSong" onclick="searchSongs()">Perform Search</button>
    </form>
   <form id="playSongForm" onsubmit="playSong();return false"> 
    <table id='songtable'>
      <thead>
        <!-- <tr>
          <th colspan="2">Songs Found</th>
        </tr> -->
         <tr>
          <th>Play?</th>
          <th>Dance Type</th>
          <th>Song Name</th>
        </tr>
      </thead>
      <tbody id='tbody'>

      </tbody>
    </table>
<button class="list-Btn" type="submit" name="PlaySong" onclick="playSong()">Play a Song</button>
   </form>
  </div>

</div>

    <div class="music-container" id="music-container">
      <div class="music-info">
        <h3 id="musictype">Music Type</h3>
        <div class="progress-container" id="progress-container">
          <div class="progress" id="progress"></div>
        </div>
      </div>
      <audio id="audio"></audio>

      <div class="navigation">

        </button>
        <button id="play" class="action-btn action-big">
          <i class="fas fa-play"></i>
        </button>

        </button>
      </div>
    </div>
    
</body>
  <?php
  require 'footer.php';
  ?>
</html>
<script>
const musicContainer = document.getElementById("music-container");
const buttonContainer = document.getElementById("buttonContainer");
const playBtn = document.getElementById("play");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const musictype = document.getElementById("musictype");

const songForm = document.getElementById("playSongForm");
const myForm = document.getElementById("songSearchForm");
const table = document.getElementById("songtable")
const tableBody = document.getElementById("tbody");
const danceArray = JSON.parse(localStorage.myDanceArray);

function searchSongs() {
     tableBody.innerHTML = '';
   
        // we could create our own object with {}, but we can speed up our life by using the FormData interface
        var formData = new FormData(myForm);
        var songName = formData.get("songsearch");
       


let foundArray = [];
let songFound = null;
let danceIndex = null;
let songIndexFound = null;
let danceIndexFound = 0;
let danceTypeFound = null;
let songListIndex = 0;
let col_number = 0;
let row_number = 0;
let dance_type = '';
localStorage.foundArray = [];
songArray = [];
danceArray.forEach(searchArray);

if (foundArray.length > 0) {
  foundArray.forEach(createTableEntry);
} else {
  tableBody.innerHTML = '';
}

function searchArray(item) {

  let songFound = item.songTitles.findIndex(element => element.includes(songName))

  if (songFound !== -1) {

   songIndexFound = songFound;

   foundArray.push(item);

  } 
  localStorage.foundArray = foundArray;
}
function createTableEntry(item) {
 
    dance_type = item["danceType"];

    item.songTitles.forEach(chkSong); 
    col_number = 0;
}
function chkSong(value, index, array) {

let position = value.search(songName);
  if (position !== -1) {
    songArray.push(value);
    var row = tableBody.insertRow(row_number);
    var col1 = row.insertCell(0);
    var col2 = row.insertCell(1);
    var col3 = row.insertCell(2);
    var col4 = row.insertCell(3);
     var col5 = row.insertCell(4);
    col1.innerHTML = `<input type='checkbox' name='song${row_number}'>`;
    col2.innerHTML = dance_type;
    col3.innerHTML = value;
    col4.innerHTML = `<input type='hidden' name='songIX${row_number}' value='${index}'>`;
    col5.innerHTML = `<input type='hidden' name='danceType${row_number}' value='${dance_type}'>`;
   row_number++;
  }

}
} 
  function playSong() {
    let formData2 = new FormData(songForm);
    var index = 0;
   for (const foundSong of songArray) {
    let songCHK = `song${index}`;
    let songIX = `songIX${index}`; 
    let danceType = `danceType${index}`;
    var songCHKValue = formData2.get(songCHK);
    var songIXValue = formData2.get(songIX);
    var danceTypeValue = formData2.get(danceType);
     if (songCHKValue) {

          for (const obj of danceArray) {
            if (obj.danceType === danceTypeValue) {
          
               musictype.innerText = `${obj.songTitles[songIXValue]} `;
              
               audio.src = `${obj.folder}/${obj.file}/${obj.songTitles[songIXValue]}.mp3`;
          
            }
           }
        
        } 
   index++;
 
   }

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
  } 
});
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("durationchange", updateDuration);
progressContainer.addEventListener("click", setProgress);
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


</script>