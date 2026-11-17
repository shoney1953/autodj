<?php
session_start();
$_SESSION['requrl'] = $_SERVER['REQUEST_URI']; 

$gdriveFolders = $_SESSION['gdriveFolders'];

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

    <title>SBDC Robo DJ - ADD SONG TO GDRIVE</title>

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
       echo '<li><a href="showdrive.php">Show GDRIVE files</a></li>';

   } 
    ?>
      </ul>
    </div>
</nav>

<div class="content">
  <h3>Add a Song to GDRIVE - Select a Dance Type and a File to add</h3>
  <div class="form-box">

<form method="POST" action="actions/addGdriveSong.php"  enctype="multipart/form-data">
  <table>
    <thead>
      <tr>
        <th>Select Folder</th>
        <th>Dance Type</th>
      </tr>
    </thead>
    <tbody>
   <?php
   $numFolders = 0;
   foreach($gdriveFolders as $folder) {
    echo "<tr>";
   $fChk = "fc".$folder['folderNum'];
  
   echo "<td><input type='checkbox' name='".$fChk."' ></td>";
   echo "<td>".$folder['folderName']."</td>";
   echo "</tr>";
   }
  

   ?>
    </tbody>
  </table>
  <input type="file" name="fileToUpload" id="fileToUpload">Select an Audio File<br>
  <button type="submit" name="submitGUpload" class="musicType-Btn">UPLOAD</button>
</form>

</form>

</div> 
 
</div>

  <body>
  </body>
    <?php
  require 'footer.php';
  ?> 
</html>