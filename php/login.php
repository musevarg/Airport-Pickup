<?php

require ('connect_db.php');
 
if(isset($_POST['data'])){
  $json = $_POST['data'];
}

$data = json_decode($json, true);
 
//get data from object
$email = $data['email'];
$password = $data['password'];

$e = mysqli_real_escape_string( $link, trim( $email ) ) ;
$p = mysqli_real_escape_string( $link, trim( $password ) ) ;


//check password and email
 $q =  "SELECT * FROM accountsdsp WHERE email ='$e' AND passwrd = SHA1('$p')";
 $r = mysqli_query ( $link, $q ) ;
 
    if (mysqli_num_rows( $r ) == 1 ) {
  
    $login = "true";

        $row = @mysqli_fetch_assoc($r);
        $id = $row["id"];
        $token = bin2hex(random_bytes(64));

        $q = "SELECT TOKEN FROM AUTH_TOKENS WHERE ACCOUNT_ID='$id'";  
        $r = @mysqli_query($link, $q) or die(mysql_error());

        if($r)
        {
          if ( @mysqli_num_rows( $r ) > 0 ) 
          {
            $q = "UPDATE AUTH_TOKENS SET TOKEN='$token', DATE_ASSIGNED=NOW() WHERE ACCOUNT_ID='$id'" ;   
            $r = @mysqli_query($link, $q) or die(mysql_error());

            if($r)
            {
              $myObj->status = "OK";
              $myObj->message = "Token already existing for this user, new token has been assigned";
              $myObj->token = $token;
              $myJSON = json_encode($myObj);
              echo $myJSON;
            }
            else
            {
              $myObj->status = "ERROR";
              $myObj->message = "Could not update token table";
              $myJSON = json_encode($myObj);
              echo $myJSON;
            }
          }
          else
          {
            $q = "INSERT INTO AUTH_TOKENS (ACCOUNT_ID, TOKEN, DATE_ASSIGNED) VALUES ('$id', '$token', NOW())" ;   
            $r = @mysqli_query($link, $q) or die(mysql_error());

            if($r)
            {
                $myObj->status = "OK";
                $myObj->message = "No token found, new token assigned";
                $myObj->token = $token;
                $myJSON = json_encode($myObj);
                echo $myJSON;
            }
            else
            {
              $myObj->status = "ERROR";
              $myObj->message = "Account found but token could not be added to the db";
              $myJSON = json_encode($myObj);
              echo $myJSON;
            }
          }
        }
  
    } else {
	          $myObj->status = "ERROR";
              $myObj->message = "Unable to connect";
              $myJSON = json_encode($myObj);
              echo $myJSON;	
	}

mysqli_close( $link ); 



?>