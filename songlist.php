<?php
session_start();

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

    <title>Song Lists</title>
  </head>
<html>
<body>
  <nav class="nav">
    <div class="container">
      <ul>
        <li><a href="index.php">Return Home</a></li>
        <?php
        if (isset($_SESSION['username'])) {
      echo '<li><a href="playlists.php"> Manage Playlists</a></li>';
      echo '<li><a href="findSong.php"> Find a Song</a></li>';
      echo '<li><a href="manageRequests.php"> Manage Request Songs</a></li>';
   } 
   ?>
      </ul>
    </div>
</nav>

    
  

<main id="main">
  

</main>

  <?php
  require 'footer.php';
  ?>
  </script>
<script src="js/songlist.js"></script>
<script src="https://github.com/devongovett/pdfkit/releases/download/v0.10.0/pdfkit.standalone.js"></script>
<script src="https://github.com/devongovett/blob-stream/releases/download/v0.1.3/blob-stream.js"></script>

</body>

</html>
