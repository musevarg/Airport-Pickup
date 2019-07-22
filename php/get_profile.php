<?php

require ('connect_db.php');

$id = $_GET["id"];

if(isset($id) && $id != "")
{

$q = "SELECT * FROM accountsdsp WHERE id='$id'";
$r = @mysqli_query($link, $q) or die(mysql_error());
if($r)
{  
	$row = mysqli_fetch_assoc($r);
	$email = $row['email'];

	$q = "SELECT * FROM customerdsp WHERE account_id='$id'";  
    $r = @mysqli_query($link, $q) or die(mysql_error());
    if($r)
    {
    	if (@mysqli_num_rows($r)>0)
    	{
			$row = mysqli_fetch_assoc($r);
			$data[] = $row;

			array_push($data[0]["email"] = $email);
			$array = $data[0];
			echo json_encode($array);		
    	}
    	else
    	{
    	   	$myObj->status = "ERROR";
            $myObj->message = "More than one profile with this account ID";
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
	$myObj->status = "FAILED";
    $myObj->message = "Error with query";
    $myJSON = json_encode($myObj);
    echo $myJSON;
}
}
else
{
	$myObj->status = "INVALID";
    $myObj->message = "Id is not set";
    $myJSON = json_encode($myObj);
    echo $myJSON;
}


?>