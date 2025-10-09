<?php
session_start();
require_once '../config/Database.php';
require_once '../models/Playlist.php';
$database = new Database();
$db = $database->connect();
$playList = new Playlist($db);
$playListArray = $_SESSION['userPlaylists']; 
$allPlayListArray = $_SESSION['allPlaylists']; 
$songlistArray = [];
$songNumber = 0;
$jsonArray = '';
if (isset($_POST['SubmitProcessPlaylist']) ) {
  foreach ($playListArray as $pl) {
     $dp = 'delCHK'.$pl["id"]; 

     if (isset($_POST["$dp"])) {
      $playList->id = $pl['id'];
      $playList->delete();
      $redirect = "Location: ".$_SESSION['playlisturl'];
       header($redirect);
      exit;  
     }

  }
 
}
 
?>

<!DOCTYPE html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
    />
    <link rel="stylesheet" href="../css/style.css" />

    <title>Process Existing Playlists</title>
  </head>
<html lang="en">
<body>

<div class="content">
     <nav class="nav">
    <div class="container">
      <ul>
        <li><a href="../index.php">Return Home</a></li>
      </ul>
    </div>
</nav>
<br><br><br><br><br>
  
    <?php
    if (isset($_POST['SubmitProcessPlaylist']) ) {

    foreach ($allPlayListArray as $pl) {
 
     $mc = 'mcCHK'.$pl["id"]; 
 
     if (isset($_POST["$mc"])) {

      $playList->id = $pl['id'];
      $playList->read_single();

    if (isset($playList->name)) {
      echo '<div class="form-box">';

         echo '<h3><button class="list-Btn" type="submit" name="SubmitMakePlaylistCurrent" onclick="putPlaylist1()">Make This Playlist Current</button></h3>';
         $jsonArray = json_encode($playList->jsonPlaylist);
         echo '<input type="hidden" id="phpArray" value="'.htmlspecialchars($jsonArray).'">';
         $songlistArray = $playList->jsonPlaylist;
          echo '<table>';
          echo '<thead>';
          echo '<tr>';
          echo '<th colspan="3">Playlist: '.$playList->name.' <br>Description: '.$playList->description.'<br>  Created: '.substr($playList->datecreated,0,10).'</th>';
          echo '</tr>';
          echo '<tr>';
          echo '<th>Number</th>';
          echo '<th>Dance Type</th>';
          echo '<th>Song Name</th>';
          echo '</tr>';
          echo '</thead>';
          echo '<tbody>';
          foreach ($songlistArray as $song) {
           $songNumber++;
           echo '<tr>';
           echo '<td>'.$songNumber.'</td>';
           echo '<td>'.$song[0].'</td>';
           echo '<td>'.$song[2].'</td>';
           echo '</tr>';
          }
           echo '</tbody>';
          echo '</table>';
          echo '</div>';
    }
  }
  }
 
}
    ?>
<script>
  function putPlaylist1() {
    console.log('inside putPlaylist1');
    var passedArray = document.getElementById('phpArray').value;
    localStorage.myPlaylist = passedArray;
    console.log(localStorage.myPlaylist);
  }
</script>
</div>
</body>
</html>
<script>
  </script>
