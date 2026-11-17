<?php
session_start();
require_once '../vendor/autoload.php';
require_once '../config/Database.php';
require_once '../models/Google.php';
$database = new Database();

use Google\Client;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;

use function PHPSTORM_META\type;
$db = $database->connect();
$google = new Google($db);

$google->id = 2;
$google->read_single();
$client = new Google_Client();

$client->setApplicationName('SBDCROBODJ');
$client->setScopes(['https://www.googleapis.com/auth/drive']);
$client->setAuthConfig($google->servicekey); // <--- Using the database-sourced array here
$driveService = new Drive($client);

$gdriveFolders = $_SESSION['gdriveFolders'];

if (isset($_POST['submitGUpload'])) {
// first upload to server drive
 $file = $_FILES['fileToUpload'];

  $fileTemp = $_FILES['fileToUpload']['tmp_name'];
  $fileName = $_FILES['fileToUpload']['name'];
  $fileEx = explode('.',$fileName);

  $fileActualEX = strtolower(end($fileEx));

  $allowed = array('mp3', 'm4a');
  if (in_array($fileActualEX, $allowed)) {
    $newFileName = $fileEx[0].".".$fileActualEX;
    $fileDestination = "../songuploads/".$_SESSION['username'];
    makeDir($fileDestination);
    $fileDestination .= "/".$newFileName;
  
    var_dump($fileDestination);
    move_uploaded_file($fileTemp, $fileDestination);
  } else {
        $redirect = "Location: ".$_SESSION['requrl']."?error=filetype";
        header($redirect);
     exit;
  
  }
  $localFilePath = $fileDestination; // Path to file on your server
  $fileName = basename($localFilePath);
     // upload successful; now move to gdrive
    foreach ($gdriveFolders as $folder) {
     $fChk = "fc".$folder['folderNum'];
     if (isset($_POST["$fChk"])) {
     $targetFolderId = $folder['folderId']; // Obtained from Step 3
// 4. Create Google Drive File Metadata
    $fileMetadata = new DriveFile([
    'name' => $fileName,
    'parents' => [$targetFolderId] // Restricts upload to your specific shared folder
     ]);

     try {
    // 5. Read file contents and execute upload
    $content = file_get_contents($localFilePath);
    
    $file = $driveService->files->create($fileMetadata, [
        'data' => $content,
        'mimeType' => mime_content_type($localFilePath), // Detects file type automatically
        'uploadType' => 'multipart',
        'fields' => 'id'
    ]);

    echo "Success! File uploaded successfully. Google Drive File ID: " . $file->id;

    } catch (Exception $e) {
        echo "An error occurred: " . $e->getMessage();
    }
     break;
      } // ifset
    } // foreach

  } // submit


function makeDir($path)
{
     return is_dir($path) || mkdir($path, 0777);
}
?>