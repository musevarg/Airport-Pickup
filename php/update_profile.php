<?php

require ('connect_db.php');

$accountid = $_GET["id"];
$forename = $_GET["fname"];
$surname = $_GET["sname"];
$street = $_GET["street"];
$city = $_GET["city"];
$postcode = $_GET["postcode"];
$email = $_GET["email"];

if(isset($accountid) && $accountid != "")
{

$q = "UPDATE customerdsp SET forename='$forename', surname='$surname', street='$street', city='$city', postcode='$postcode' WHERE account_id='$accountid'";
$r = @mysqli_query($link, $q) or die(mysql_error());

if($r)
{
	$q = "UPDATE accountsdsp SET email='$email' WHERE id='$accountid'";
	$r = @mysqli_query($link, $q) or die(mysql_error());

	if($r)
	{
		$myObj->status = "OK";
		$myObj->message = "Tables updated sucessfully";
		$myJSON = json_encode($myObj);
		echo $myJSON;
	}
	else
	{
		$myObj->status = "ERROR";
		$myObj->message = "accountsdsp query issue";
		$myJSON = json_encode($myObj);
		echo $myJSON;
	}

}

else
{
	$myObj->status = "ERROR";
	$myObj->message = "customerdsp query issue";
	$myJSON = json_encode($myObj);
	echo $myJSON;
}

}
else
{
	$myObj->status = "ERROR";
	$myObj->message = "no id found";
	$myJSON = json_encode($myObj);
	echo $myJSON;
}

?>