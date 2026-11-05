<?php 
session_start();
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


// File ID of the specific Google Drive file you want to access

$fileId = '16CkCoOboTQgXrxN7myoeIcprgZAC9hgz'; //mpeg
$mimetype = 'audio/mpeg';



$folders = [];
$folderNum = 0;
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
$targetFolderId = '1aUkrXqG4PBM2HJ5-9ZkbocBUVBgCtdE9'; // top folder
$files = listFilesInFolder($targetFolderId, $driveService);
$subFolderId = '';
$subFolderFiles = [];
$songs = [];
$folderIndex = 0;

foreach ($files as $file) {

    if ($file['mimeType'] === 'application/vnd.google-apps.folder') {
      $tempFolder = ["folderNum" => $folderNum, "folderName" => $file['name'], "folderId" => $file['id']];
      array_push($folders, $tempFolder);
      // $folders[$folderNum] = ["foldername" =>$file['name'], $file['id'], $file['webContentLink']];
   
      $subFolderId = $file['id'];
      $tempArray = [];

      $subFolderFiles = listFilesInFolder($subFolderId, $driveService);
   
      foreach ($subFolderFiles as $subFile) {
   
    
    
          $tempArray = ["songFolder" => $folderNum, "songName" => $subFile['name'], "mimeType" => $subFile['mimeType'], "fileId" => $subFile['id']];
      

          array_push($songs, $tempArray) ;
        
       
        //  echo  "<h5> NAME: ".$subFile['name']." ID: ".$subFile['id']." TYPE: ".$subFile['mimeType']."</h5>";
        
      }
      $folderNum++;
    }

}

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

   } 
    ?>
      </ul>
    </div>
</nav>

<main id="main" class="main-small-top">
 
</main>
<div>
     <h3 id="musictype">Playing Now</h3>
    <audio controls id="acntl" class="audiobox">
    
      <?php
      $source = '<source id="audioSRC" src="stream.php?id='.$fileId.'&mimetype='.$mimetype.'" type="'.$mimetype.'">';
       echo $source;
      ?>
         
    </audio> 
</div>
  <body>
  </body>
    <?php
  require 'footer.php';
  ?> 
</html>
<script>
  const main = document.getElementById("main");
  const audioSRC = document.getElementById('audioSRC');
  const audioCntl = document.getElementById("acntl");
  const musicName = document.getElementById("musictype");
  var folderArray = <?php echo json_encode($folders); ?>;
  var songArray = <?php echo json_encode($songs); ?>;
  var songToPlay = '';
  folderArray.forEach(createBox);

function createBox(item, index) {

  const box = document.createElement("div");
  box.classList.add("box");
  box.id = item.folderName.toUpperCase();
  box.innerHTML = `
    <h4>${item.folderName.toUpperCase()}</h4>
    `;
  // box.innerHTML += "<h5>Click on Song to Play it</h5>";
  box.addEventListener("click", () => {
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 5000);
  });
   
  songArray.forEach((song, songi) => {

    if (song.songFolder === index)
    box.innerHTML += `<li class=songItem>${song.songName} </li>`;
  });

  main.appendChild(box);
  let boxid = "boxid";
  boxid = "boxid" + item.folderNum;
  boxid = document.getElementById(`${box.id}`);

boxid.addEventListener("click", function (event) {
  processEvent(event);
});
}
function processEvent(event) {
  if (event.target.tagName === "LI") {
    songClicked = event.target.textContent;
  
     songToPlay = songClicked.trim();
     
    songArray.forEach(findSongId, songToPlay);
    // const song = songItem.split(":");

    // songToPlay = song[1].trim();

    // musicContainer.classList.remove("vis-hidden");
    // searchSongs();
  }
  function findSongId(item, index) {
 
    if (item.songName === songToPlay) {
    musicName.innerText = `${songToPlay}`;
    let sourceUrl = `stream.php?id=${item.fileId}&mimetype=${item.mimeType}`;


  audioSRC.src = sourceUrl;
  audioSRC.type = item.mimeType;

  audioCntl.load();
  audioCntl.play();
    }

  }
}
</script>