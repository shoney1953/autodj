
<?php
session_start();
if (!isset($_POST['submitUpload'])) {
   $redirect = "Location: ".$_SESSION['requrl']."?error=File-GT-PHPLimit";
    header($redirect);
     exit;
}
if (isset($_POST['submitUpload'])) {
  $file = $_FILES['fileToUpload'];

  $fileTemp = $_FILES['fileToUpload']['tmp_name'];
  $fileName = $_FILES['fileToUpload']['name'];
  $fileEx = explode('.',$fileName);

  $fileActualEX = strtolower(end($fileEx));

  $allowed = array('mp3');
  if (in_array($fileActualEX, $allowed)) {
    $newFileName = $fileEx[0].".".$fileActualEX;
    $fileDestination = "../uploads/".$_SESSION['username'];
    makeDir($fileDestination);
    $fileDestination .= "/".$newFileName;
    move_uploaded_file($fileTemp, $fileDestination);

    $redirect = "Location: ".$_SESSION['requrl']."?success=fileuploaded";
    header($redirect);
     exit;
  } else {
        $redirect = "Location: ".$_SESSION['requrl']."?error=filetype";
        header($redirect);
     exit;
  
  }


}
function makeDir($path)
{
     return is_dir($path) || mkdir($path, 0777);
}


?>
