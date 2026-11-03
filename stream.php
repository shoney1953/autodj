
<?php
session_start();
require_once 'vendor/autoload.php';
require_once 'config/Database.php';
require_once 'models/Google.php';
use Google\Client;
use Google\Service\Drive;

// 1. Get the requested File ID from the query string
$fileId = $_GET['id'];
$mimetype = filter_input(INPUT_GET, 'mimetype', FILTER_SANITIZE_SPECIAL_CHARS);

if (!$fileId) {
    header("HTTP/1.1 400 Bad Request");
    die("Missing file ID.");
}
if (!$mimetype) {
    header("HTTP/1.1 400 Bad Request");
    die("Missing mimetype.");
}
$database = new Database();
$db = $database->connect();
$google = new Google($db);

$google->id = 1;
 $google->read_single();

$client = new Client();
// Provide the path to your OAuth2 or Service Account credentials JSON file
$client->setApplicationName('ROBODJ');
// $client->addScope(drive::DRIVE);

$client->setAuthConfig($google->servicekey); // <--- Using the database-sourced array here
// $client->setAuthConfig('config/service_key.json');
$client->addScope(Drive::DRIVE_READONLY);

// Initialize the Drive Service
$driveService = new Drive($client);

try {
    // header("Content-Type: audio/mpeg");
     header("Content-Type: ".$mimetype);
     $metadata = $driveService->files->get($fileId, ['fields' => 'size']);
     $fileSize = $metadata->getSize();
     header("Accept-Ranges: bytes");
     if ($fileSize) {
       header("Content-Length: " . $fileSize);
     }

    // 5. Download and stream the file contents directly to output
    $response = $driveService->files->get($fileId, ['alt' => 'media']);
 
    $stream = $response->getBody();

    while (!$stream->eof()) {
        echo $stream->read(1024 * 8); // Stream in 8KB chunks
        flush();
    }
        
        
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo "Error streaming file: " . $e->getMessage();
}
?>