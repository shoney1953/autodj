<?php
session_start();
unset($_SESSION['current_playlist']);
$str_json = file_get_contents('php://input');
var_dump($str_json);
$_SESSION['current_playlist'] = $str_json;

?>