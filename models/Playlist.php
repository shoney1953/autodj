<?php

class Playlist {
    // DB stuff
    private $conn;
    private $table = 'robodjplaylists';

    public $id;
    public $name;
    public $userid;
    public $datecreated;
    public $description;
    public $jsonPlaylist;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get Users
    public function read() {
      // Create query
      $query = 'SELECT u.username as username, 
      p.id, p.name, p.userid, p.datecreated, p.description, p.jsonPlaylist
       FROM ' . $this->table . ' p
       LEFT JOIN
        users u ON p.userid = u.id
       ORDER BY username, p.name ';

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
          $this->name = $row['name'];
          $this->userid = $row['userid'];
          $this->datecreated = $row['datecreated'];
          $this->description = $row['description'];
          $this->jsonPlaylist = json_decode($row['jsonPlaylist']);

        

    }
    public function getUserId($userid) {
        
      // Create query
      $query = 'SELECT * FROM ' . $this->table . ' WHERE userid = :userid
      ORDER BY name'; 

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Bind ID
      $stmt->bindParam('userid', $userid);
  
      // Execute query
      $stmt->execute();

      return $stmt;


}
   

    // Create User
    public function create() {
          // Create query
          $query = 'INSERT INTO ' . $this->table . 
          ' SET name = :name, userid = :userid, description = :description, jsonPlaylist = :jsonPlaylist';


          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->name = htmlspecialchars(strip_tags($this->name));
 
          // Bind data
          $stmt->bindParam(':name', $this->name);
          $stmt->bindParam(':userid', $this->userid);
          $stmt->bindParam(':description', $this->description);
          $stmt->bindParam(':jsonPlaylist', $this->jsonPlaylist);

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
          ' SET name = :name, userid = :userid, jsonPlaylist = :jsonPlaylist, description = :description
          WHERE id = :id';
          

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->name = htmlspecialchars(strip_tags($this->name));

          // Bind data
          $stmt->bindParam(':id', $this->id);
          $stmt->bindParam(':name', $this->name);
          $stmt->bindParam(':userid', $this->userid);
          $stmt->bindParam(':description', $this->description);
          $stmt->bindParam(':jsonPlaylist', $this->jsonPlaylist);

          // Execute query
          if($stmt->execute()) {
            return true;
          }

          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);

          return false;
    }


    // Delete Playlist
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