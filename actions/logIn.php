<?php
session_start();

require_once '../config/Database.php';
require_once '../models/User.php';
$database = new Database();
$db = $database->connect();
$user = new User($db);
$pass2 = '';
$isValid = false;

$passEntered = "";

   if(isset($_POST['SubmitLogIN'])) {
    $user->username = htmlentities($_POST['username']);
    $passEntered = htmlentities($_POST['password']); 
    if ($user->getUserName($user->username)) { 
        // if(password_verify($passEntered, $user->password )) {
            $_SESSION['username'] = $user->username;
            $_SESSION['role'] = $user->role;
            $_SESSION['userid'] = $user->id;
            $_SESSION['userfirstname'] = $user->firstname;
            $_SESSION['userlastname'] = $user->lastname;
            $_SESSION['useremail'] = $user->email;
            $user->robodjnumlogins++;
            $user->updateLogin();
            $redirect = "Location: ".$_SESSION['homeurl']."?success=Success";
            header($redirect);
            exit;   
        }
        // else {
           
        //     if(isset($_SESSION['username'])) {
        //         unset($_SESSION['username']);
        //     }
        //     if(isset($_SESSION['role'])) {
        //         unset($_SESSION['role']);
        //     }
        //     if(isset($_SESSION['userid'])) {
        //         unset($_SESSION['userid']);
        //     }
        //     if(isset($_SESSION['userfirstname'])) {
        //         unset($_SESSION['userfirstname']);
        //     }
        //     if(isset($_SESSION['userlastname'])) {
        //         unset($_SESSION['userlastname']);
        //     }
        //     if(isset($_SESSION['useremail'])) {
        //         unset($_SESSION['useremail']);
        //     }
        //     $redirect = "Location: ".$_SESSION['loginurl'].'?error=InvalidPassword';
        //     header($redirect);
        //     exit;  
        // } 
    } else {
    
        if(isset($_SESSION['username'])) {
            unset($_SESSION['username']);
        }
        if(isset($_SESSION['role'])) {
            unset($_SESSION['role']);
        }
        if(isset($_SESSION['userid'])) {
            unset($_SESSION['userid']);
        }
        if(isset($_SESSION['userfirstname'])) {
            unset($_SESSION['userfirstname']);
        }
        if(isset($_SESSION['userlastname'])) {
            unset($_SESSION['userlastname']);
        }
        if(isset($_SESSION['useremail'])) {
            unset($_SESSION['useremail']);
        }
      
      $redirect = "Location: ".$_SESSION['signurl'].'?error=NoUser';
        header($redirect);
        exit;  
    } 
 
// }