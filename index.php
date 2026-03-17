<?php 
session_start();
require_once 'config/Database.php';
require_once 'models/User.php';

if (isset($_GET['error'])) {
    echo '<br><h4 style="text-align: center"> ERROR:  '.$_GET['error'].'. 
    Please Validate Input</h4><br>';
    unset($_GET['error']);
} elseif (isset($_GET['success'])) {
  
    unset($_GET['success']);
} else {
    $_SESSION['homeurl'] = $_SERVER['REQUEST_URI']; 
}

$_SESSION['user'] = null;
$json_array = json_encode(["NO REQUESTS"]);

$reqArray = [];
if (isset($_SESSION['username'])) {
$dir = "uploads/".$_SESSION['username'];

// Open a directory, and read its contents
if (is_dir($dir)){
  if ($dh = opendir($dir)){
    while (($file = readdir($dh)) !== false){
     if (($file !== '.') && ($file !== '..')) {
        $fileNM = explode('.', $file);
        array_push($reqArray, $fileNM[0]);
     }
      
    }
    closedir($dh);
  }
  $json_array = json_encode($reqArray);
 
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

    <title>SBDC Robo DJ - Home Page</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  </head>
  <nav class="nav">
    <div class="container">
      <ul>
       <?php

   if (isset($_SESSION['username'])) {
    
      echo '<li><a href="logout.php">Logout</a></li>';
      echo '<li><a href="songlist.php" > Show Song Lists</a></li>';

      echo '<li><a href="playlists.php"> Manage Playlists</a></li>';

      echo '<li><a href="findSong.php"> Find a Song</a></li>';

      echo '<li><a href="manageRequests.php"> Manage Request Songs</a></li>';

   } else {

       echo '<li><a href="login.php">Login With Userid from SBBALLROOM Website to use ROBO DJ</a></li>';

   }
    ?>
      </ul>
    </div>
</nav>

  <body>
    <div class="link-container">
  <?php
  if (!isset($_SESSION['username'])) {
      echo "<h3>Welcome to the SaddleBrooke Ballroom Dance Club Automated Music Player</h3>";     
     } 
   if (isset($_SESSION['username'])) {
     echo '<input type="hidden" id="username" name="username" value='.$_SESSION['username'].'>';

       echo '<div class="button-container" id="random-container">';
      echo '<h4> Playlist Functions: </h4>';
      echo '<button id="oldrandomBtn" class="musicType-Btn">Play Existing Random Playlist</button>';
    
      echo '<button id="customBtn" class="musicType-Btn">Customize # of songs in new Playlist</button>';
     
      echo '<button id="randomBtn" class="musicType-Btn">Create a New Random Playlist</button>';
  
    echo '</div>';
    echo '<br>';
    echo '<div class="button-container" id="button-container">';
       echo '<h4> Music Genres: </h4>';
      echo '<button id="amTangoBtn" class="musicType-Btn">
        American Tango
      </button>';
      echo '<button id="aTangoBtn" class="musicType-Btn">
        Argentine Tango
      </button>';
      echo '<button id="bachataBtn" class="musicType-Btn">
        Bachata
      </button>';
      echo '<button id="boleroBtn" class="musicType-Btn">
        Bolero
      </button>';
      echo '<button id="chachaBtn" class="musicType-Btn">
        Cha Cha
      </button>';
      echo '<button id="ecsBtn" class="musicType-Btn">
        East Coast Swing
      </button>';
      echo '<button id="foxtrotBtn" class="musicType-Btn">
        Foxtrot
      </button>';
      echo '<button id="hustleBtn" class="musicType-Btn">
        Hustle
      </button>';
      echo '<button id="specialBtn" class="musicType-Btn">
        Line Dances
      </button>';
      echo '<button id="mamboBtn" class="musicType-Btn">
        Mambo
      </button>';
      echo '<button id="merenqueBtn" class="musicType-Btn">
        Merengue
      </button>';
      echo '<button id="nc2Btn" class="musicType-Btn">
        Night Club Two Step
      </button>';
      echo '<button id="pasodobleBtn" class="musicType-Btn">
      Paso Doble
    </button>';
      echo '<button id="polkaBtn" class="musicType-Btn">
        Polka
      </button>';
      echo '<button id="quickstepBtn" class="musicType-Btn">
        Quick Step
      </button>';
      echo '<button id="rumbaBtn" class="musicType-Btn">
        Rumba
      </button>';
      echo '<button id="salsaBtn" class="musicType-Btn">
        Salsa
      </button>';
      echo '<button id="sambaBtn" class="musicType-Btn">
        Samba
      </button>';
      echo '<button id="TwoStepBtn" class="musicType-Btn">
        Texas Two Step
      </button>';
      echo '<button id="vWaltzBtn" class="musicType-Btn">
        Viennese Waltz
      </button>';
      echo '<button id="waltzBtn" class="musicType-Btn">
        Waltz
      </button>';
      echo '<button id="wcsBtn" class="musicType-Btn">
        West Coast Swing
      </button>';

       echo '<button id="wPartnerBtn" class="musicType-Btn">
        Western Partner
      </button>';

       echo '<button id="oldiesSlowBtn" class="musicType-Btn">
        Oldies Slow
      </button>';

       echo '<button id="oldiesFastBtn" class="musicType-Btn">
        Oldies Fast
      </button>';

        echo '<button id="reqBtn" class="musicType-Btn">
        Requests
      </button>';

    echo '</div>';
  

    echo '<br><br><br><div class="music-container" id="music-container">
      <div class="music-info">
        <h4 id="musictype">Music Type</h4>
        <div class="progress-container" id="progress-container">
          <div class="progress" id="progress"></div>
        </div>
      </div>
      <audio id="audio"></audio>
      <div class="img-container" id="image-container">
        <img alt="music cover" id="cover" </img>
      </div>
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
    </div>';
   }

   ?>
      <div>
    <div id="popUp" class="popUp vis-hidden">
    <h4>Modify the number of songs for each music type to be included in the playlist (Min 0, Max 10). </h4>
     <h4>When satisfied, click the return to home to create a new random playlist and begin playing it.</h4>
              <form >
      <div class="form-box6">

              <label for="numAmTango">  American Tangos <br><input type="number" min=0 max=10 name="numAmTango" id="numAmTango" class="inpBox"></label>

              <label for="numArgTango">  Argentine Tangos  <br><input type="number" min=0 max=10  name="numArgTango" id="numArgTango" class="inpBox" ></label>

              <label for="numBachata">  Bachatas <br><input type="number" min=0 max=10  name="numBachata" id="numBachata"class="inpBox"></label>

              <label for="numBolero">  Boleros <br><input type="number" min=0 max=10  name="numBolero" id="numBolero"class="inpBox"></label>
      
              <label for="numChaCha">  Cha Chas  <br><input type="number" min=0 max=10 name="numChaCha" id="numChaCha"class="inpBox"></label>

              <label for="numECoast">  East Coast Swings <br><input type="number" min=0 max=10  name="numECoast" id="numECoast" class="inpBox"></label>

              <label for="numFoxtrot">  Foxtrots <br><input type="number" min=0 max=10  name="numFoxtrot" id="numFoxtrot" class="inpBox"></label>
        
              <label for="numHustle">  Hustles <br><input type="number" min=0 max=10 name="numHustle" id="numHustle" class="inpBox"></label>
           
              <label for="numLineDance">  Line Dances  <br><input type="number" min=0 max=10  name="numLineDance" id="numLineDance" class="inpBox"></label>

              <label for="numMambo">  Mambos  <br><input type="number" min=0 max=10  name="numMambo" id="numMambo" class="inpBox"></label>
            
              <label for="numMerengue">  Merengues  <br><input type="number" min=0 max=10 name="numMerengue" id="numMerengue" class="inpBox"></label>
    
              <label for="numNightClub">  Night Club Two Steps <br><input type="number" min=0 max=10 name="numNightClub" id="numNightClub" class="inpBox" ></label>
           
              <label for="numPasoDoble">  Paso Dobles <br><input type="number" min=0 max=10 name="numPasoDoble" id="numPasoDoble" class="inpBox"></label>
           
              <label for="numPolka">  Polkas<br><input type="number" min=0 max=10 name="numPolka" id="numPolka" class="inpBox"></label>
     
              <label for="numQuickStep">  Quick Steps <br><input type="number" min=0 max=10 name="numQuickStep" id="numQuickStep" class="inpBox"></label>
            
            <label for="numRumba">  Rumbas <br><input type="number" min=0 max=10 name="numRumba" id="numRumba" class="inpBox"></label>
           
              <label for="numSalsa">  Salsas  <br><input type="number" min=0 max=10 name="numSalsa" id="numSalsa" class="inpBox"></label>
             
              <label for="numSamba">  Sambas <br><input type="number" min=0 max=10 name="numSamba" id="numSamba" class="inpBox"></label>
              
       
            <label for="numTwoStep">  Texas Two Steps  <br><input type="number" min=0 max=10 name="numTwoStep" id="numTwoStep" class="inpBox"></label>
        
            <label for="numVWaltz">  Viennese Waltzes   <br><input type="number" min=0 max=10 name="numVWaltz" id="numVWaltz" class="inpBox"></label>
       
            <label for="numWaltz">  Waltzes  <br><input type="number" min=0 max=10 name="numWaltz" id="numWaltz" class="inpBox"></label>
           
            <label for="numWCSwing">  West Coast Swings  <br><input type="number" min=0 max=10 name="numWCSwing" id="numWCSwing" class="inpBox"></label>
          

            <label for="numWPartner">  Western Partners <br><input type="number" min=0 max=10 name="numWPartner" id="numWPartner" class="inpBox"></label>
           

            <label for="numOldiesSlow"> Oldies Slow <br><input type="number" min=0 max=10 name="numOldiesSlow" id="numOldiesSlow" class="inpBox"></label>
           
             <label for="numOldiesFast"> Oldies Fast <br><input type="number" min=0 max=10 name="numOldiesFast" id="numOldiesFast" class="inpBox"></label>
           
            <label for="numRequests">  Requests <br><input type="number" min=0 max=10 name="numRequests" id="numRequests" class="inpBox"></label>
            

      
       </div>
      <button class="submit-Btn" id="returnBtn">Return to Home Page</button>
 
            </form>
       
  </div>
 

  
  <?php
  require 'footer.php';
  ?> 
  <script>

    var jsReqArray = <?php 
    echo $json_array; 
    ?>;
   
    </script>
    <script src="js/script.js"></script>
  </body>
</html>
