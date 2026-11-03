
<?php
require_once 'vendor/autoload.php';

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
// $fileId = '16CkCoOboTQgXrxN7myoeIcprgZAC9hgz'; //mpeg
// $mimetype = 'audio/mpeg';
// $fileId = '16CkCoOboTQgXrxN7myoeIcprgZAC9hgz'; //mpeg
// $fileId='1NrrMyK2yovVdssYwPFNeIvM60eV1IHB7';
// $fileId='1mTo7_YeONYn3jjDiAvn2084sjKkeeFjO';
// 2. Initialize the Google Client & Authenticate
$client = new Client();
// Provide the path to your OAuth2 or Service Account credentials JSON file
$client->setAuthConfig('config/service_key.json');
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