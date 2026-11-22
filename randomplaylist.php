<?php 
session_start();
 $folders = $_SESSION['gdriveFolders'];
 $songs = $_SESSION['gdriveSongs'] ;

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

    <title>SBDC Robo DJ - PLAYLISTS FROM GOOGLE SONGS</title>

  </head>
    
    <body>    
  <nav class="nav">
    <div class="container">
      <ul>
       <?php

   if (isset($_SESSION['username'])) {
    
      echo '<li><a href="logout.php">Logout</a></li>';
      echo '<li><a href="index.php" > Home</a></li>';

      echo '<li><a href="showdrive.php"> Google Drive</a></li>';
    

   } 
    ?>
      </ul>
   
      <h4 class="warning">WARNING: Many Songs will NOT play in the browser FIREFOX</h4>
    </div>
</nav>
<div class="playlist-container" id="main">
  <div class="button-container4">
    <button id="playCurrentBtn" class="list-Btn">Play Current Playlist</button>
  <button id="downloadPlyBtn" class="list-Btn">Print Current Playlist to PDF</button>
  <button id="randomBtn" class="list-Btn">Create New Playlist</button>
  </div>
  
 
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
      $source = '<source id="audioSRC">';
       echo $source;
      ?>
    </audio>
   
      <div class="navigation">
        <button id="prev" class="action-btn">
          <i class="fas fa-backward"></i>
        </button>
        <button id="play" class="action-btn">
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
    var folderArray = <?php echo json_encode($folders); ?>;
  var songArray = <?php echo json_encode($songs); ?>;
</script>
<script src="js/randomplaylist.js"></script>
<script src="https://github.com/devongovett/pdfkit/releases/download/v0.10.0/pdfkit.standalone.js"></script>
<script src="https://github.com/devongovett/blob-stream/releases/download/v0.1.3/blob-stream.js"></script>