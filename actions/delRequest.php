<?php
session_start();
require_once '../config/Database.php';
require_once '../models/User.php';
require_once '../models/Playlist.php';
$database = new Database();
$db = $database->connect();
$user = new User($db);
$playList = new Playlist($db);
$playListArray = [];

$row_count = 0;
$reqArray = [];
if (isset($_SESSION['reqArray'])) {
  $reqArray = $_SESSION['reqArray'];
}

if (isset($_POST['submitDelReq'])) {
  $songNum = 0;
foreach($reqArray as $fileName) {
  $delCHK = 'delCHK'.$songNum;

  if (isset($_POST["$delCHK"])) {
   $file = '../uploads/'.$_SESSION['username'].'/'.$fileName;

    // Check if the file exists before attempting to delete
    if (file_exists($file)) {
      if (unlink($file)) {

            // $redirect = "Location: ".$_SESSION['requrl']."?filesuccess=filedeleted";
            // header($redirect);
            // exit;
      } else {
          // $redirect = "Location: ".$_SESSION['requrl']."?fileerror=filenotdeleted";
          // header($redirect);
          // exit;
    
      }
  
    } else {
       $redirect = "Location: ".$_SESSION['requrl']."?error=nofile";
         header($redirect);
         exit;
      }
    }
   $songNum++;
  }  //for each song

} //submit
            $redirect = "Location: ".$_SESSION['requrl'];
            header($redirect);
            exit;

?>