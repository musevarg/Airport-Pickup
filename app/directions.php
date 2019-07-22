<?php

$start = preg_replace('/\s+/', '+', $_GET["start"]);
$end = preg_replace('/\s+/', '+', $_GET["end"]);

$url = 'https://maps.googleapis.com/maps/api/directions/json?origin='.$start.'&destination='.$end.'&key=AIzaSyCKfzrRm8UtGzJo9Z-ek0gX4l2eeRtfzUk';
$data = file_get_contents($url);

echo $data;

?>