<?php
session_start();

if (isset($_GET['error'])) {
    echo '<br><h4 style="text-align: center"> ERROR:  '.$_GET['error'].'. Please Reenter Data</h4><br>';
    unset($_GET['error']);
} elseif(isset($_GET['success'])) {
    echo '<br><h4 style="text-align: center"> Success:  '.$_GET['success'].'</h4><br>';
    unset($_GET['success']);
} else {
    $_SESSION['loginurl'] = $_SERVER['REQUEST_URI']; 
}
date_default_timezone_set("America/Phoenix");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>SBDC ROBODJ Login</title>
</head>
<body>
    <nav class="nav">
        <div class="container">
        
        <ul>
            <li style="list-style:none"><a href="index.php">Back to Home</a></li>
        </ul>
        </div>
    </nav>
    <div class="container-section ">
    <section id="login" class="content">
   
        
        <div class="form-grid1">
   
        <h1 class="section-header">Please Login</h1>
            <form method="POST" action="actions/logIn.php">
                <div class="form-grid-div">

                <label for="username">User Name or Email for the SBDC Website</label><br>
                <input type="text" name="username" required><br>
                <label for="password">Enter Password</label><br>
                <input type="password" name="password" required minlength="8"><br>

                <br>
                <button class="musicType-Btn" type="submit" name="SubmitLogIN">Login</button><br>
                </div>
        </form>
        </div>
    </section>
    </div>

    </div>
    <footer >

<div class="footer-section">

    <p>Copyright &copy; 2022    Sheila Honey  - All Rights Reserved</p>
    
</div> 

</footer>
</body>
</html>