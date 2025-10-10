<?php
session_start();

$allPlaylists = $_SESSION['allPlaylists'];
$songlistArray = [];
$songNumber = 0;
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

    <title>Selected Playlist</title>
  </head>

<body>
<div class="content">
 <nav class="nav">
    <div class="container">
      <ul>
        <li><a href="index.php">Return Home</a></li>
        <?php
           if (isset($_SESSION['username'])) {
    
    
      echo '<li><a href="songlist.php" > Show Song Lists</a></li>';

      echo '<li><a href="playlists.php"> Manage Playlists</a></li>';

      echo '<li><a href="findSong.php"> Find a Song</a></li>';

      echo '<li><a href="manageRequests.php"> Manage Request Songs</a></li>';

   } 
   ?>
      </ul>
    </div>
</nav>
    <br><br><br><br><br>
    <!-- <div class="form-box"> -->
       <div>
      <?php 
       
       foreach ($allPlaylists as $playlist) {

        if ($playlist['id'] === $_GET['id']) {
         echo '<form id="viewForm" name="viewForm">';
          $songlistArray = json_decode($playlist['jsonPlaylist']);
          echo '<table>';
          echo '<thead>';
          echo '<tr>';
  
          echo '<th>Playlist Name: '.$playlist['name'].'</th>';
          echo '<th>Description: '.$playlist['description'].'</th>';  
          echo '<th>Created: '.substr($playlist['datecreated'],0,10).'</th>';
          echo '</tr>';
          echo '<tr>';
          // echo '<th>Delete?</th>';
          echo '<th>Song Number</th>';
          echo '<th>Dance Type</th>';
          echo '<th>Song Name</th>';
          echo '</tr>';
          echo '</thead>';
          echo '<tbody>';
          foreach ($songlistArray as $song) {
           $songNumber++;
           $delCHK = "del".$songNumber;
           echo '<tr>';
          //  echo '<td><input type="checkbox" name="'.$delCHK.'">';
           echo '<td>'.$songNumber.'</td>';
           echo '<td>'.$song[0].'</td>';
           echo '<td>'.$song[3].'</td>';
           echo '</tr>';
          }
           echo '</tbody>';
          echo '</table>';
          echo '</form>';
        }
       }
      ?>
    </div>
</div>
</body>
</html>