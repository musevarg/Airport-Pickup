<?php

// connect to database
require ('php/connect_db.php');

//change subscription status to acvtive
$q = "UPDATE subscriptionsdsp SET subs_status = 'ACTIVE' WHERE id = (SELECT * FROM (SELECT max(id) FROM subscriptionsdsp) myAlias)";
if (mysqli_query ( $link, $q )){
	 header("Location:regMessage.html");  
  } else {
	  echo 'Error!';
  }
//close link
mysqli_close( $link ); 
?>