
<?php
session_start();

if (!isset($_POST['submitUpload'])) {
   $redirect = "Location: ".$_SESSION['requrl']."?error=File-GT-PHPLimit";
    header($redirect);
     exit;
}

// if ($_FILES['fileToUpload']['error'] > 0) {
//    redirect = "Location: ".$_SESSION['requrl']."?error=".$_FILE[]";
//         header($redirect);
//      exit;
// }
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
     if (check_file_uploaded_name($fileTemp)) {
    } else {
      $redirect = "Location: ".$_SESSION['requrl']."?error=FileName";
      header($redirect);
       exit;
    }
   if (check_file_uploaded_length($fileTemp)) {
    } else {
      $redirect = "Location: ".$_SESSION['requrl']."?error=FileNameLength";
      header($redirect);
       exit;
    }
    if (move_uploaded_file($fileTemp, $fileDestination)) {
       $redirect = "Location: ".$_SESSION['requrl']."?success=fileuploaded";
      header($redirect);
       exit;
    } else {
      var_dump('failed to upload');
    }

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
function check_file_uploaded_name ($filename)
{
    (bool) ((preg_match("`^[-0-9A-Z_\.]+$`i",$filename)) ? true : false);
}
function check_file_uploaded_length ($filename)
{
    return (bool) ((mb_strlen($filename,"UTF-8") > 225) ? true : false);
}
?>
