<?php
session_start();
require_once 'config/Database.php';
require_once 'models/User.php';
require_once 'models/Playlist.php';
$row_count = 0;
$all_playlists = 0;
$num_playlists = 0;
$result = 0;
$playlistArray = [];
$allPlaylistArray = [];
$otherPlaylistArray = [];
$database = new Database();
$db = $database->connect();
$user = new User($db);
$playList = new Playlist($db);
$_SESSION['playlisturl'] = $_SERVER['REQUEST_URI']; 
if (isset($_SESSION['username'])) {

$result = $playList->getUserId($_SESSION['userid']);

$rowCount = $result->rowCount();
$num_playlists = $rowCount;

if ($rowCount > 0) {

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $playlist_item = array(
            'id' => $id,
            'name' => $name,
            'userid' => $userid,
            'datecreated' => $datecreated,
            'description' => $description,
            'jsonPlaylist' => $jsonPlaylist

        );
        array_push($playlistArray, $playlist_item);
  
    }
  $_SESSION['userPlaylists'] = $playlistArray;  
}
$result = $playList->read();

$rowCount = $result->rowCount();
$all_playlists = $rowCount;

if ($rowCount > 0) {

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $playlist_item = array(
            'id' => $id,
            'name' => $name,
            'userid' => $userid,
            'username' => $username,
            'datecreated' => $datecreated,
            'description' => $description,
            'jsonPlaylist' => $jsonPlaylist

        );
           array_push($allPlaylistArray, $playlist_item);
        if ($playlist_item['userid'] !== $_SESSION['userid']) {
           array_push($otherPlaylistArray, $playlist_item);
    
        }
       
  
    }
  $_SESSION['allPlaylists'] = $allPlaylistArray;  


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

    <title>Manage Playlists</title>
  </head>

<body>
<nav class="nav">
    <div class="container">
      <ul>
        <li><a href="index.php">Return Home</a></li>
        <?php
        if (isset($_SESSION['username'])) {

      echo '<li><a href="songlist.php" > Show Song Lists</a></li>';
      echo '<li><a href="findSong.php"> Find a Song</a></li>';
      echo '<li><a href="manageRequests.php"> Manage Request Songs</a></li>';

   } 
   ?>
      </ul>
    </div>
</nav>
<div class="content">
    
    <h1>Existing Playlist Options</h1>
              <?php 
            echo '<div class="button-container4">';
            echo '<button id="downloadPlyBtn" class="list-Btn">Print Current Playlist to PDF</button>';
         
            echo '</div>';
          echo '<div class="form-box">';


          if ($num_playlists > 0) {
          
            echo '<table>';
            echo '<thead>';
            echo '<tr>';
            echo '<th colspan="6">Your Saved Playlists Click on ID for Description</th>';
            echo '</tr>';
            echo '<tr>';
            echo '<th>Make Current Playlist?</th>';
            echo '<th>Delete?</th>';
            echo '<th>ID</th>';
            echo '<th>Playlist Name</th>';
            echo '<th>Description</th>';
            echo '<th>Date Created</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';
            echo '<form method="POST" action="actions/processPlaylists.php">';
            foreach ($playlistArray as $playlist) {
                $dp = 'delCHK'.$playlist["id"];
                $mc = "mcCHK".$playlist['id'];
                $pd = 'viewlist.php?id=';
                 $pd .= $playlist["id"];
                  echo '<tr>';
                   echo "<td><input type='checkbox' name='".$mc."'></td>";
                  echo "<td><input type='checkbox' name='".$dp."'></td>";
                   echo '<td><a href="'.$pd.'">'.$playlist['id'].'</a></td>';
                  echo '<td>'.$playlist['name'].'</td>';
                  echo '<td>'.$playlist['description'].'</td>';
                  echo '<td>'.substr($playlist['datecreated'],0,10).'</td>';
                  echo '</tr>';
            }
            echo '<tr><td colspan="6"><button class="list-Btn" type="submit" name="SubmitProcessPlaylist">Process Playlist(s)</button></td></tr>';
            echo '</form>';
            echo '</tbody>';
            echo '</table>';
       
          }
     
            echo '<table>';
            echo '<thead>';
            echo '<tr>';
            echo '<th colspan="2">Save Current Playlist</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';
            echo '<form method="POST" action="actions/savePlaylist.php">';
            echo '<tr>';
            echo '<td><label for="playlistName">New Playlist Name  </label></td>';
            echo '<td><input type="text" name="playlistName" required></td>';
            echo '</tr>';
            echo '<tr>';
            echo '<td><label for="description">Description  </label></td>';
            echo '<td><input type="text" name="description"></td>';
            echo '</tr>';
            echo '<tr>';
            echo '<td colspan="2"><button class="list-Btn" type="submit" name="SubmitSavePlaylist" onclick="getPlaylist1()">Save Current Playlist</button></td>';
            echo '</tr>';
           
          echo '</tbody>';
          echo '</table>';
    
             
        echo '</form>';
         if ($num_playlists > 0) {
          
            echo '<table>';
            echo '<thead>';
            echo '<tr>';
            echo '<th colspan="6">Other Saved Playlists Click on ID for Description</th>';
            echo '</tr>';
            echo '<tr>';
            echo '<th>User Name</th>';
            echo '<th>ID</th>';
            echo '<th>Make Current Playlist?</th>';
            echo '<th>Playlist Name</th>';            
 
            echo '<th>Date Created</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';
            echo '<form method="POST" action="actions/processPlaylists.php">';
            foreach ($otherPlaylistArray as $aplaylist) {
                $mc = "mcCHK".$aplaylist['id'];
                $pd = 'viewlist.php?id=';
                 $pd .= $aplaylist["id"];
                  echo '<tr>';
                  echo '<td>'.$aplaylist['username'].'</td>';
                  echo '<td><a href="'.$pd.'">'.$aplaylist['id'].'</a></td>';
                   echo "<td><input type='checkbox' name='".$mc."'></td>";
                  echo '<td>'.$aplaylist['name'].'</td>';
         
                  echo '<td>'.substr($aplaylist['datecreated'],0,10).'</td>';

                  echo '</tr>';
            }
            echo '<tr><td colspan="6"><button class="list-Btn" type="submit" name="SubmitProcessPlaylist">Process Playlist(s)</button></td></tr>';
            echo '</form>';
            echo '</tbody>';
            echo '</table>';
       
          }
       
          
    ?>

</div>
</div>


</body>
  <?php
  require 'footer.php';
  ?>
<script src="js/playlist.js"></script>
<script src="https://github.com/devongovett/pdfkit/releases/download/v0.10.0/pdfkit.standalone.js"></script>
<script src="https://github.com/devongovett/blob-stream/releases/download/v0.1.3/blob-stream.js"></script>




</body>

</html>
