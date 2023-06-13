<?php 
session_start();
require_once 'config/Database.php';
require_once 'models/User.php';

if (isset($_GET['error'])) {
    echo '<br><h4 style="text-align: center"> ERROR:  '.$_GET['error'].'. 
    Please Validate Input</h4><br>';
    unset($_GET['error']);
} elseif (isset($_GET['success'])) {
    // echo '<br><h4 style="text-align: center"> '.$_GET['success'].'</h4><br>';
    // unset($_GET['success']);
} else {
    $_SESSION['homeurl'] = $_SERVER['REQUEST_URI']; 
}

$_SESSION['user'] = null;
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

    <title>SBDC Robo DJ</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  </head>
  <header>
    <?php
     if (!isset($_SESSION['username'])) {
      echo "<h3>Welcome to the SaddleBrooke Ballroom Dance Club Automated Music Player</h3>";
     } else {
      echo "<h3>Welcome ".$_SESSION['userfirstname'].", to the SaddleBrooke Ballroom Dance Club Automated Music Player</h3>";
     }
  ?>
  <ul>
   <?php

   if (isset($_SESSION['username'])) {
    
       echo '<p class="musicType-Btn"><a style="color: white;font-weight: bold;font-size: large"
        href="logout.php"> Logout </a></p>'; 

   } else {

       echo '<li class="musicType-Btn"><a style="color: white;font-weight: bold;font-size: large"
        href="login.php">Login With Userid from SBBALLROOM Website to use ROBO DJ</a></li>';
        echo '<br><br><br>';
        echo '<br><br><br>';
   }
    ?>
   </ul>
   <?php
   if (isset($_SESSION['username'])) {
    echo '<h3>';
      echo '<i class="fas fa-compact-disc"></i>';
      echo ' Select a Random Playlist or a Category of Music to Play.
    </h3>';
   }
    ?>
  </header>

  <body>
  <?php
   if (isset($_SESSION['username'])) {
    echo '<a href="songlist.html" target="_blank" class="list-Btn">';
      echo '<i class="fas fa-glasses"></i>';

      echo ' Click to Show Song Lists</a>';

    echo '<div class="random-container" id="random-container">';

      echo '<button id="oldrandomBtn" class="musicType-Btn">';
      echo '<h4><strong>Use Existing Random Playlist </strong></h4>
      </button>';
    
      echo '<button id="customBtn" class="musicType-Btn">
        <h4><strong>Customize # of songs in new Playlist </strong></h4>
       </button>';
     
      echo '<button id="randomBtn" class="musicType-Btn">
       <h4><strong>New Random Playlist </strong></h4></button>
      </button>';
  
    echo '</div>';
    echo '<div class="button-container" id="button-container">';
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
      // echo '<button id="cChachaBtn" class="musicType-Btn">
      //   Cowboy Cha Cha
      // </button>';
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
      // echo '<button id="wWaltzBtn" class="musicType-Btn">
      //   Western Waltz
      // </button>';
       echo '<button id="wPartnerBtn" class="musicType-Btn">
        Western Partner
      </button>';

    echo '</div>';
  

    echo '<div class="music-container" id="music-container">
      <div class="music-info">
        <h3 id="musictype">Music Type</h3>
        <div class="progress-container" id="progress-container">
          <div class="progress" id="progress"></div>
        </div>
      </div>
      <audio id="audio"></audio>
      <div class="img-container" id="image-container">
        <img alt="music cover" id="cover" />
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
    <div id="popUp" class="popUp vis-hidden">
    <h4>Modify the number of songs for each music type to be included in the playlist (Min 0, Max 10). </h4>
     <h4>When satisfied, click the return to home to create a new random playlist and begin playing it.</h4>
    
      <div class="form-box">
          
          <form class="inpClass">
              <label for="numAmTango">  American Tangos</label>
              <input type="number" min=0 max=10 name="numAmTango" id="numAmTango" class="inpBox">
              <label for="numArgTango">  Argentine Tangos</label>
              <input type="number" min=0 max=10  name="numArgTango" id="numArgTango"class="inpBox" >
              <label for="numBachata">  Bachatas</label>
              <input type="number" min=0 max=10  name="numBachata" id="numBachata"class="inpBox">
              <label for="numBolero">  Boleros</label>
              <input type="number" min=0 max=10  name="numBolero" id="numBolero"class="inpBox">
              <label for="numChaCha">  Cha Chas</label>
              <input type="number" min=0 max=10 name="numChaCha" id="numChaCha"class="inpBox">
              <label for="numCbyCha">  Cowboy Cha Chas</label>
              <input type="number" min=0 max=10  name="numCbyCha" id="numCbyCha"class="inpBox">
          </form>

          <form class="inpClass">
            <label for="numECoast">  East Coast Swings</label>
            <input type="number" min=0 max=10  name="numECoast" id="numECoast" class="inpBox">
            <label for="numFoxtrot">  Foxtrots</label>
            <input type="number" min=0 max=10  name="numFoxtrot" id="numFoxtrot" class="inpBox">
              <label for="numHustle">  Hustles</label>
              <input type="number" min=0 max=10 name="numHustle" id="numHustle" class="inpBox">
              <label for="numLineDance">  Line Dances</label>
              <input type="number" min=0 max=10  name="numLineDance" id="numLineDance" class="inpBox">
              <label for="numMambo">  Mambos</label>
              <input type="number" min=0 max=10  name="numMambo" id="numMambo" class="inpBox">
              <label for="numMerengue">  Merengues</label>
              <input type="number" min=0 max=10 name="numMerengue" id="numMerengue" class="inpBox">
  
          </form>
          <form class="inpClass">
            <label for="numNightClub">  Night Club Two Steps</label>
            <input type="number" min=0 max=10 name="numNightClub" id="numNightClub" class="inpBox" >
            <label for="numPasoDoble">  Paso Dobles</label>
            <input type="number" min=0 max=10 name="numPasoDoble" id="numPasoDoble" class="inpBox">
            <label for="numPolka">  Polkas</label>
            <input type="number" min=0 max=10 name="numPolka" id="numPolka" class="inpBox">
            <label for="numQuickStep">  Quick Steps</label>
            <input type="number" min=0 max=10 name="numQuickStep" id="numQuickStep" class="inpBox">
            <label for="numRumba">  Rumbas</label>
            <input type="number" min=0 max=10 name="numRumba" id="numRumba" class="inpBox">
              <label for="numSalsa">  Salsas</label>
              <input type="number" min=0 max=10 name="numSalsa" id="numSalsa" class="inpBox">
              <label for="numSamba">  Sambas</label>
              <input type="number" min=0 max=10 name="numSamba" id="numSamba" class="inpBox">
          </form>

          <form class="inpClass">
            <label for="numTwoStep">  Texas Two Steps</label>
            <input type="number" min=0 max=10 name="numTwoStep" id="numTwoStep" class="inpBox">
            <label for="numVWaltz">  Viennese Waltzes</label>
            <input type="number" min=0 max=10 name="numVWaltz" id="numVWaltz" class="inpBox">
            <label for="numWaltz">  Waltzes</label>
            <input type="number" min=0 max=10 name="numWaltz" id="numWaltz" class="inpBox">
            <label for="numWCSwing">  West Coast Swings</label>
            <input type="number" min=0 max=10 name="numWCSwing" id="numWCSwing" class="inpBox">
            <label for="numWWaltz">  Western Waltzes</label>
            <input type="number" min=0 max=10 name="numWWaltz" id="numWWaltz" class="inpBox">
            <label for="numWPartner">  Western Partners</label>
            <input type="number" min=0 max=10 name="numWPartner" id="numWPartner" class="inpBox">
            </form>
      </div>
    
      <button class="submit-Btn" id="returnBtn">Return to Home Page</button>
  
      
       
  </div>
   
  
  <?php
  require 'footer.php';
  ?> 
    <script src="js/script.js"></script>
  </body>
</html>
