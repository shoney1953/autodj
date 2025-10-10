<?php
session_start();
require_once '../config/Database.php';
require_once '../models/User.php';
require_once '../models/Playlist.php';

$database = new Database();
$db = $database->connect();
$user = new User($db);
$playList = new Playlist($db);
$playlistArray = [];
$playlistFound = 0;
if (isset($_POST['SubmitSavePlaylist'])) {
 
  if (isset($_SESSION['current_playlist'])) {
      
    $jsonPlaylist = $_SESSION['current_playlist'];
    $playlistFound = 1;
if (isset($_POST['playlistName'])) {
  $playList->name = $_POST['playlistName'];
} else {
  $playList->name = 'noplaylistspecified';
}
 if (isset($_POST['description'])) {
  $playList->description = $_POST['description'];
} 
$playList->userid = $_SESSION['userid'];
$playList->jsonPlaylist = $_SESSION['current_playlist'];
$playList->create();
$playlistArray = json_decode($playList->jsonPlaylist);
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

    <title>Saved Playlist</title>
  </head>

<body>
 
  <div class='content'>
    <br>
    <h3>Saved Playlist</h3>

  <?php
  if ($playlistFound) {
  echo '<h3> Playlist Name: '.$playList->name.'</h3>';

  echo '<table>';
  echo '<thead>';
  echo '<tr>';
  echo '<th>Sequence</th>';
  echo '<th>Dance Type</th>';
  echo '<th>Song Title</th>';
  echo '</tr>';
  echo '</thead>';
  echo '<tbody>';
  $songnum = 0;
  foreach ($playlistArray as $plentry) {


    $songnum++;
    echo '<tr>';
     echo '<td>'.$songnum.'</td>';
    echo '<td>'.$plentry[0].'</td>';
    echo '<td>'.$plentry[3].'</td>';
    echo '</tr>';
  }
   echo '</tbody>';
  echo '</table>';
  } else {
    echo '<h1> No Playlist Found </h1>';
  }
  ?>

  </div>
</body>

<?php
  require '../footer.php';
  ?> 
  </html>
