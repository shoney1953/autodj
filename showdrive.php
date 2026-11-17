<?php 
session_start();
$_SESSION['gdriveFolders'] = [];
$_SESSION['gdriveSongs'] = [];
require_once 'vendor/autoload.php';

require_once 'config/Database.php';
require_once 'models/Google.php';
use Google\Client;
use Google\Service\Drive;

use function PHPSTORM_META\type;

$database = new Database();
$db = $database->connect();
$google = new Google($db);

$google->id = 2;
$google->read_single();

$client = new Google_Client();

$client->setApplicationName('SBDCROBODJ');
$client->setScopes(['https://www.googleapis.com/auth/drive']);
// $client->addScope(drive::DRIVE);
$client->setAuthConfig($google->servicekey); // <--- Using the database-sourced array here

$driveService = new Drive($client);
// $_SESSION['gdriveService'] = $driveService;
// File ID of the specific Google Drive file you want to access

$fileId = '16CkCoOboTQgXrxN7myoeIcprgZAC9hgz'; //mpeg
$mimetype = 'audio/mpeg';

$folders = [];
$folderNum = 0;
$filesList = [];
$folderNames = [];
// var_dump($_SERVER['HTTP_USER_AGENT']);
/**
 * Lists all files inside a specific Google Drive folder.
 */
function listFilesInFolder(string $folderId, $driveService) {
    try {
   
        $filesList = [];
        $pageToken = null;

        do {
            // Build parameters for the query
            $optParams = [
                // Filter by parent folder and exclude trashed items
                'q' => sprintf("'%s' in parents and trashed = false", $folderId),
                // Request only required fields to save bandwidth
                'fields' => 'nextPageToken, files(id, name, mimeType)', 
                'pageSize' => 100, // Maximum is 1000
                'pageToken' => $pageToken,
                'supportsAllDrives' => true, // Essential if using Shared Drives
                'includeItemsFromAllDrives' => true
            ];

            // Execute the API call
            $response = $driveService->files->listFiles($optParams);
            
            // Collect the files
            foreach ($response->getFiles() as $file) {
      
                $filesList[] = [
                    'id' => $file->getId(),
                    'name' => $file->getName(),
                    'mimeType' => $file->getMimeType()
                    
                ];
            }

            // Capture page token for large directories
            $pageToken = $response->getNextPageToken();

        } while ($pageToken != null);

        return $filesList;

    } catch (Exception $e) {
        echo 'An error occurred: ' . $e->getMessage();
        return [];
    }
}


// --- Example Usage ---

// $targetFolderId = '1O9rqFRhgcrEXE-LAu3adJAxsMJ_FJAa8'; // argentine tango
$targetFolderId = '1aUkrXqG4PBM2HJ5-9ZkbocBUVBgCtdE9'; // top shared ROBODJ folder
$files = listFilesInFolder($targetFolderId, $driveService);
$subFolderId = '';
$subFolderFiles = [];
$songs = [];
$folderIndex = 0;

foreach ($files as $file) {

    if ($file['mimeType'] === 'application/vnd.google-apps.folder') {
      $tempFolder = ["folderName" => strtoupper($file['name']), "folderId" => $file['id']];
      array_push($folders, $tempFolder);
      
    }

   }
      


foreach ($folders as $folderName => $val) {
  $folderNames[$folderName] = $val['folderName'];
}

array_multisort($folderNames, SORT_ASC, $folders);
$folderNum = 0;
foreach ($folders as $folder) {
      $subFolderId = $folder['folderId'];
      $tempArray = [];
      $subFolderFiles = listFilesInFolder($subFolderId, $driveService);
      foreach ($subFolderFiles as $subFile) {
          $tempArray = ["songFolder" => $folderNum, "songName" => $subFile['name'], "mimeType" => $subFile['mimeType'], "fileId" => $subFile['id']];
          array_push($songs, $tempArray) ;
       
      }
 $folderNum++;
}

$_SESSION['gdriveFolders'] = $folders;
$_SESSION['gdriveSongs'] = $songs;

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

    <title>SBDC Robo DJ - MUSIC ON GDRIVE</title>

  </head>
    
    <body>    
  <nav class="nav">
    <div class="container">
      <ul>
       <?php

   if (isset($_SESSION['username'])) {
    
      echo '<li><a href="logout.php">Logout</a></li>';
      echo '<li><a href="index.php" > Home</a></li>';
      echo '<li><a href="songlist.php" > Show Song Lists</a></li>';

      echo '<li><a href="playlists.php"> Manage Playlists</a></li>';

      echo '<li><a href="findSong.php"> Find a Song</a></li>';

      echo '<li><a href="manageRequests.php"> Manage Request Songs</a></li>';
      // echo '<li><a href="addSong.php">Add Song to GDRIVE</a></li>';

   } 
    ?>
      </ul>
    </div>
</nav>

<div class="main2" id="main">
 
</div>


<div id="music-container" class="music-container-noImage">
      <!-- <h4 id="musictype">Music Type</h4> -->
    <div class=" ">
   <h4 id="musictype">Now Playing</h4>
        <div class="progress-container" id="progress-container">
          
          <div class="progress" id="progress"></div>
        </div>
    </div>
      <audio id="acntl">
      <?php
      $source = '<source id="audioSRC" src="stream.php?id='.$fileId.'&mimetype='.$mimetype.'" type="'.$mimetype.'">';
       echo $source;
      ?>
    </audio>
   
      <div class="navigation">
        <button id="prev" class="action-btn">
          <i class="fas fa-backward"></i>
        </button>
        <button id="play" class="action-btn action-big">
          <i class="fas fa-play"></i>
        </button>
        <button id="next" class="action-btn">
          <i class="fas fa-forward"></i>
        </button>
      </div>
 
    </div>
  </body>
    <?php
  require 'footer.php';
  ?> 
</html>
<script>
  const main = document.getElementById("main");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const musicContainer = document.getElementById("music-container");
  const audioSRC = document.getElementById('audioSRC');
  const audioCntl = document.getElementById("acntl");
  const musicName = document.getElementById("musictype");

  var folderArray = <?php echo json_encode($folders); ?>;
  var songArray = <?php echo json_encode($songs); ?>;
  var songToPlay = '';
  var folderToPlay = '';
  var folderNumToPlay = 0;
  var songsFromFolder = [];
  var songFolderIX = 0;
  folderArray.forEach(createBox);

function createBox(item, index) {

  const box = document.createElement("div");
  box.classList.add("box");
  box.id = item.folderName.toUpperCase();
  box.innerHTML = `
    <h4 title="Click to Play List" >${item.folderName.toUpperCase()} </h4>
    `;
  // box.innerHTML += "<h5>Click on Song to Play it</h5>";
  box.addEventListener("click", () => {
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 5000);
  });
   
  songArray.forEach((song, songi) => {

    if (song.songFolder === index)
    box.innerHTML += `<li class=songItem title='Click to play Song'>${song.songName}  </li>`;
  });

  main.appendChild(box);
  let boxid = "boxid";
  boxid = "boxid" + item.folderNum;
  boxid = document.getElementById(`${box.id}`);

boxid.addEventListener("click", function (event) {
  processBoxClick(event);
});
}
function processBoxClick(event) {
  
  if (event.target.tagName === "LI") {
    songClicked = event.target.textContent;
  
     songToPlay = songClicked.trim();

    songArray.forEach(findSongId, songToPlay);

  }
  if (event.target.tagName === "H4") {
    audioCntl.pause();
    folderClicked = event.target.textContent;
     folderToPlay = folderClicked.trim();
   console.log(folderToPlay);
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
         return(true);
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
        console.error('Audio Load Failed (e.g., blocked by browser autoplay policy):', error);
      }
    
      try {
        // .play() is called synchronously, but returns a Promise
    
        await audioCntl.play();
    
      } catch (error) {
        console.error('Audio playback Failed (e.g., blocked by browser autoplay policy):', error);
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
// progressContainer.addEventListener("click", setProgress);
</script>