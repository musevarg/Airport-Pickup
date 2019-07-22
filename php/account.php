<?php
 
if(isset($_POST['data'])){
  $json = $_POST['data'];
}
$data = json_decode($json, true);
 
//code to connect to db
//require 'connect_db.php';
$link = mysqli_connect('localhost','HNDSOFTS2A21','j4H3E40Pb7','HNDSOFTS2A21'); 
if (!$link) { 	die('Could not connect to MySQL: ' . mysqli_error()); 
} 
//get data from object
$email = $data['email'];
$password = $data['password'];
$e = mysqli_real_escape_string( $link, trim( $email ) ) ;
$p = mysqli_real_escape_string( $link, trim( $password ) ) ;
//check password and email
 $q =  "SELECT * FROM accountsdsp WHERE email ='$e' AND passwrd = SHA1('$p')";
 $q2 = "SELECT * FROM customerdsp WHERE id = '$q'";
 $q3 = "SElECT * FROM addressdsp WHERE id = '$q'";
 $r = mysqli_query ( $link, $q ) ;

?>
