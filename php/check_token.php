<?php

require ('connect_db.php');

$token = $_GET["token"];

if(isset($token) && $token != "")
{
	$q = "SELECT ACCOUNT_ID FROM AUTH_TOKENS WHERE TOKEN='$token'";  
    $r = @mysqli_query($link, $q) or die(mysql_error());
    if($r)
    {
    	if (@mysqli_num_rows($r)==1)
    	{
            $row = mysqli_fetch_assoc($r);
    		$myObj->status = "VALID";
            $myObj->message = "Token is valid.";
            $myObj->user = $row['ACCOUNT_ID'];
            $myJSON = json_encode($myObj);
            echo $myJSON;
    	}
    	else
    	{
    	   	$myObj->status = "INVALID";
            $myObj->message = "Token is not valid.";
            $myJSON = json_encode($myObj);
            echo $myJSON;	
    	}
    }
    else
    {
    	$myObj->status = "FAILED";
        $myObj->message = "Error with query";
        $myJSON = json_encode($myObj);
        echo $myJSON;
    }
}
else
{
	$myObj->status = "INVALID";
    $myObj->message = "Token is not valid.";
    $myJSON = json_encode($myObj);
    echo $myJSON;
}
?>