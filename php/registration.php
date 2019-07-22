<?php

require ('connect_db.php');
 
if(isset($_POST['data'])){
  $json = $_POST['data'];
}
// transfer jason data into object
$data = json_decode($json, true);
 
// get data from object
$email = $data['email'];
$password = $data['password'];
$forename = $data['forename'];
$surname = $data['surname'];
$street = $data['street'];
$townCity = $data['townCity'];
$postcode = $data['postcode'];
$subscription = $data['subscription'];

//check email if email already registered
$q = "SELECT id FROM accountsdsp WHERE email='$email'";
$r =  mysqli_query ( $link, $q ) ;  
                 
if (mysqli_num_rows ($r) != 0) {

//create object if email already registered
$object->emailRegistered = "true";
$object->accounts = "false";
$object->customer = "false";
$object->subscriptions = "false";

} else {
		
//modify string to use in an SQL statement

       $e = mysqli_real_escape_string( $link, trim( $email ) ) ;
       $p = mysqli_real_escape_string( $link, trim( $password ) ) ;
       $f = mysqli_real_escape_string( $link, trim( $forename ) ) ;
       $s = mysqli_real_escape_string( $link, trim( $surname ) ) ;
       $st = mysqli_real_escape_string( $link, trim( $street ) ) ;
       $t = mysqli_real_escape_string( $link, trim( $townCity ) ) ;
       $pc = mysqli_real_escape_string( $link, trim( $postcode ) ) ;
       $ss = mysqli_real_escape_string( $link, trim( $subscription ) ) ;

//create queries
       $q1 =  "INSERT INTO accountsdsp (email, passwrd, account_type) VALUES ('$e', SHA1('$p'), '$ss')";
       $q2 =  "INSERT INTO customerdsp (forename, surname, street, city, postcode, account_id) VALUES ('$f', '$s', '$st', '$t', '$pc', (SELECT id FROM accountsdsp WHERE email = '$email'))";
 
              if ($subscription == "trial") {

                $object->sendToPaypal = "false";

                 $q3 = "INSERT INTO subscriptionsdsp (subs_start, subs_end, subs_status, account_id) VALUES (CURDATE(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'ACTIVE', (SELECT id FROM accountsdsp WHERE email = '$email'))";

               } else {

                $object->sendToPaypal = "true";

                 $q3 = "INSERT INTO subscriptionsdsp (subs_start, subs_end, subs_status, account_id) VALUES (CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR), 'ACTIVE', (SELECT id FROM accountsdsp WHERE email = '$email'))";

               }

      $result1 = inserData($link, $q1);

      $result2 = inserData($link, $q2);

      $result3 = inserData($link, $q3);
    

// put results into object
       
      $object->emailRegistered = "false";
      $object->accounts = $result1;
      $object->customer = $result2;
      $object->subscriptions = $result3;
}

// create json file and send
$json2 = json_encode($object);
echo $json2;

//close link
mysqli_close( $link ); 

//send query to database
function inserData($link, $q) {
  if (mysqli_query ( $link, $q )){
	  return "true";
  } else {
	  return "false";
  }
} 
 

?>