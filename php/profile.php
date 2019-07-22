<style>

#popup1, #popup2, #popup3, #popup4, #popup5, #popup6 {
    width: 100%;
    height: 100%;
    position: absolute;
    visibility:hidden;
    display:none;
    background-color: rgba(22,22,22,0.5);
}

#popup1:target, #popup2:target, #popup3:target, #popup4:target, #popup5:target, #popup6:target {
    visibility: visible;
    display: block;
}
.reveal-modal {
    background:#e1e1e1; 
    margin: 0 auto;
    width:75%; 
    position:relative; 
    z-index:41;
    top: 25%;
    padding:30px; 
    -webkit-box-shadow:0 0 10px rgba(0,0,0,0.4);
    -moz-box-shadow:0 0 10px rgba(0,0,0,0.4); 
    box-shadow:0 0 10px rgba(0,0,0,0.4);
}

.close-reveal-modal
{
	position:absolute;
	top: 15px;
	right: 15px; 
}

input
{
  width: 100%;
}

</style>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Airport Pickup</title>
  
  <link rel="manifest" href="manifest.json">
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css?family=Comfortaa" rel="stylesheet"> 
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKfzrRm8UtGzJo9Z-ek0gX4l2eeRtfzUk" type="text/javascript"></script>
  <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <script src="https://rawgit.com/googlemaps/v3-utility-library/master/richmarker/src/richmarker.js"></script>
  <script src="profile.js"></script>
  <script>
	var email = localStorage.getItem("email");
	document.write(localStorage.getItem("email"));
	
	
	document.cookie = 'email=' + localStorage.getItem("email");
  </script>
  </head>
  
  <body>
<?php
	$email = $_COOKIE['email'];

	// connect to database
	$link = mysqli_connect('localhost','HNDSOFTS2A21','j4H3E40Pb7','HNDSOFTS2A21'); 
	if (!$link) { 
		die('Could not connect to MySQL: ' . mysqli_error()); 
	} 
	
	#Get ID from Database
	$q = "SELECT * FROM accountsdsp WHERE email = '$email'";
	$r = mysqli_query($link,$q);
	
	$row = mysqli_fetch_array($r, MYSQLI_ASSOC);
	
	$id = $row['id'];
	
	# Retrieve items from database table.
	$q1 = "SELECT * FROM customerdsp WHERE account_id = $id";
	$r1 = mysqli_query($link,$q1);

	if(mysqli_num_rows($r1) == 1)
	{
		$row1 = mysqli_fetch_array($r1, MYSQLI_ASSOC);

		$forename = $row1['forename'];
		$surname = $row1['surname'];
		$street = $row1['street'];
		$townCity = $row1['city'];
		$postcode = $row1['postcode'];		
	}
	else{
		echo("<meta http-equiv='refresh' content='0; url = main.html'>");
	};
	
	if(isset($_POST['forename']))
	{
		$q = "UPDATE customerdsp SET forename = '$_POST[forename]' WHERE account_id = $id";
		$r = mysqli_query($link,$q);
		echo"<script>localStorage.setItem('forename', '$_POST[forename]');
		window.location.replace('profile.php');
		</script>";
	};
	
	if(isset($_POST['surname']))
	{
		$q = "UPDATE customerdsp SET surname = '$_POST[surname]' WHERE account_id = $id";
		$r = mysqli_query($link,$q);
		echo"<script>localStorage.setItem('surname', '$_POST[surname]');
		window.location.replace('profile.php');
		</script>";
	};
	
	if(isset($_POST['email']))
	{
		$q = "UPDATE accountsdsp SET email = '$_POST[email]' WHERE id = $id";
		$r = mysqli_query($link,$q);
		echo"<script>localStorage.setItem('email', '$_POST[email]');
		window.location.replace('profile.php');
		</script>";
	};
	
	if(isset($_POST['street']))
	{
		$q = "UPDATE customerdsp SET street = '$_POST[street]' WHERE account_id = $id";
		$r = mysqli_query($link,$q);
		echo"<script>localStorage.setItem('street', '$_POST[street]');
		window.location.replace('profile.php');
		</script>";
	};
	
	if(isset($_POST['city']))
	{
		$q = "UPDATE customerdsp SET city = '$_POST[city]' WHERE account_id = $id";
		$r = mysqli_query($link,$q);
		echo"<script>localStorage.setItem('townCity', '$_POST[city]');
		window.location.replace('profile.php');
		</script>";
	};
	
	if(isset($_POST['postcode']))
	{
		$q = "UPDATE customerdsp SET postcode = '$_POST[postcode]' WHERE account_id = $id";
		$r = mysqli_query($link,$q);
		echo"<script>localStorage.setItem('postcode', '$_POST[postcode]');
		window.location.replace('profile.php');
		</script>";
	};
	
	echo"
	<script>
	function getDetails() {
		localStorage.setItem('forename', '$forename');
		localStorage.setItem('surname', '$surname');
		localStorage.setItem('street', '$street');
		localStorage.setItem('townCity', '$townCity');
		localStorage.setItem('postcode', '$postcode');
	}
	
	document.getElementById(demo).innerHTML = getDetails(); 
	</script></script>
	";
	
	echo("<meta http-equiv='refresh' content='0; url = profile.html'>");
?>

<script>getDetails();</script>
		
</body>

