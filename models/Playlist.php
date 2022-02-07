<?php

class Playlist {
    // DB stuff
    private $conn;
    private $table = 'playlists';

    public $id;
    public $userid;
    public $datecreated;
    public $playlistname;
    public $playlist;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get Playlists
    public function read() {
      // Create query
      $query = 'SELECT * FROM ' . $this->table . ' ORDER BY userid, datecreated DESC';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    // Get Single Danceclass
    public function read_single() {
        
          // Create query
          $query = 'SELECT * FROM ' . $this->table . ' WHERE id = ? LIMIT 0,1'; 
  
          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Bind ID
          $stmt->bindParam(1, $this->id);

          // Execute query
          $stmt->execute();

          $row = $stmt->fetch(PDO::FETCH_ASSOC);

          // Set properties
          $this->id = $row['id'];
          $this->datecreated = $row['datecreated'];
          $this->playlist = $row['playlist'];
          $this->userid = $row['userid'];
          $this->playlistname = $row['playlistname'];
        
    
    }
 
    // Get Playlists
    public function readByUserid() {
        // Create query
        $query = 'SELECT * FROM ' . $this->table . ' ORDER BY userid, 
        datecreated DESC
        where userid = :userid';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':userid', $this->userid);
        // Execute query
        $stmt->execute();
  
        return $stmt;
      }
   




    // Create User
    public function create() {
          // Create query
          $query = 'INSERT INTO ' . $this->table . 
          ' SET playlistname = :playlistname, playlist = :playlist, 
            userid = :userid';
      

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->playlistname = htmlspecialchars(strip_tags($this->playlistname));
          $this->playlist = $this->playlist;
          $this->userid = $this->userid;



          // Bind data
          $stmt->bindParam(':playlistname', $this->playlistname);
          $stmt->bindParam(':playlist', $this->playlist);
          $stmt->bindParam(':userid', $this->userid);
         

          // Execute query
          if ($stmt->execute()) {

            return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }


    public function update() {
          // Create query
      
          $query = 'UPDATE ' . $this->table . 
          ' SET playlistname = :playlistname, playlist = :playlist, userid = :userid    
          WHERE id = :id';
   

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->playlistname = htmlspecialchars(strip_tags($this->playlistname));
          $this->playlist = $this->playlist;
          $this->userid = $this->userid;


          // Bind data
          $stmt->bindParam(':id', $this->id);
          $stmt->bindParam(':playlistname', $this->playlistname);
          $stmt->bindParam(':playlist', $this->playlist);
          $stmt->bindParam(':userid', $this->userid);


          // Execute query
          if($stmt->execute()) {
            return true;
          }

          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);

          return false;
    }
    

    // Delete Danceclass
    public function delete() {
        
          // Create query
          $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->id = htmlspecialchars(strip_tags($this->id));

          // Bind data
          $stmt->bindParam(':id', $this->id);

          // Execute query
          if($stmt->execute()) {
            return true;
          }

          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);

          return false;
    }
   
    
}
?>