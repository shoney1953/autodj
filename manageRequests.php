<?php
session_start();
$reqArray = [];
$dir = "uploads/".$_SESSION['username'];

// Open a directory, and read its contents
if (is_dir($dir)){
  if ($dh = opendir($dir)){
    while (($file = readdir($dh)) !== false){
     if (($file !== '.') && ($file !== '..')) {
        array_push($reqArray, $file);
     }
      
    }
    closedir($dh);
  }
}
$_SESSION['reqArray'] = $reqArray;
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

    <title>Upload Request Songs</title>
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
          echo '<li><a href="findSong.php"> Find a Song</a></li>';
   } 
        
        ?>
      </ul>
    </div>
</nav>
<div class="content">
  <?php
if (isset($_GET['fileerror'])) {
 
    echo '<br><h4 style="text-align: center"> ERROR:  '.$_GET['fileerror'].'. 
    Please Validate Input!</h4>';
    unset($_GET['fileerror']); 

} elseif (isset($_GET['filesuccess'])) {
    echo '<br><h4 style="text-align: center"> SUCCESS:  '.$_GET['filesuccess'].'. </h4>';
    unset($_GET['filesuccess']);
}
elseif (isset($_GET['error'])) {
    echo '<br><h4 style="text-align: center"> ERROR:  '.$_GET['error'].'. 
    Please Validate Input!</h4>';
    unset($_GET['error']);
} elseif (isset($_GET['success'])) {
    echo '<br><h4 style="text-align: center"> SUCCESS:  '.$_GET['success'].'. </h4>';
    unset($_GET['success']);

} else {
    $_SESSION['requrl'] = $_SERVER['REQUEST_URI']; 
}

?>
  
 <div id="chkBoxes">
  <table>
    <thead>
      <tr>
        <th colspan="2">Your Existing Requests</th>
      </tr>
      <tr>
        <th colspan="2"><button class="musicType-Btn" onclick="clearREQ()" name="clear">Clear All Requests</button></th>
      </tr>
      <tr>
        <th>Delete?</th>
       <th>File Name</th>
      </tr>
    </thead>
    <tbody>
       <form id="reqForm" method="POST" action="actions/delRequest.php">
      <?php
      $songNum = 0;
     
      foreach($reqArray as $song) {
        $delCHK = 'delCHK'.$songNum;
        echo '<tr>';
        echo '<td><input class="reqClass" type="checkbox" name="'.$delCHK.'"></td>';

        echo '<td>'.$song.'</td>';
        echo '</tr>';
      $songNum++;
      }
        echo '<tr>';
        echo '<td colspan="3"><button class="musicType-Btn" name="submitDelReq">Delete Request</button></td>';
        echo '</tr>';
        
      ?>
    </tbody>
    </div>
  </table>
</form>
<div class="form-box">

<form method="POST" action="actions/upload.php"  enctype="multipart/form-data">
  Select file to upload Only MP3s supported:
  <input type="file" name="fileToUpload" id="fileToUpload"><br>
  <button type="submit" name="submitUpload" class="musicType-Btn">UPLOAD</button>
</form>

</form>

</div> 
</div>

</body>
  <?php
  require 'footer.php';
  ?>
</html>
<script>
  function clearREQ() {
   console.log('inside clear req');
    // const reqItems = document.getElementsByClassName("reqClass");
    // console.log(reqItems[0]);

    // Check all checkboxes with class 'myCheckbox'
const checkboxes = document.querySelectorAll('.reqClass');
console.log(checkboxes);
checkboxes.forEach(checkbox => checkbox.checked = true);


  }
</script>