<?php

require 'vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
 
$app = new Slim\App();

$app->get('/', function(){

$myObj->apiName = "DSP Project API";
$myObj->version = "1.0";
$myObj->dateCreated = "2019-02-02";
$myObj->lastUpdated = "2019-02-20";

$myJSON = json_encode($myObj);

echo $myJSON;

});

$app->get('/arrivals/{airportCode}/{time}', function(Request $request, Response $response){

$dateY = date("Y");
$dateM = date("m");
$dateD = date("d");

$airportCode = $request->getAttribute('airportCode');

$time = $request->getAttribute('time');

/*$jsondata = file_get_contents("https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/".$airportCode."/arr/".$dateY."/".$dateM."/".$dateD."/".$time."?appId=2993fb89&appKey=341c3d6e2746f26f649613baf82b5bcb&utc=true");



$obj = json_decode($jsondata);

$airlines = $obj->appendix->airlines;
$airlineString = "";
$iata = "";

$airports = $obj->appendix->airports;
$aiportFrom = "";
$aiportTo = "";

$jsonArray = array();

foreach ($obj->flightStatuses as $flightStatus)
{

	foreach ($airlines as $airline)
	{
		if ($flightStatus->carrierFsCode == $airline->fs)
		{
			$airlineString = $airline->name;
			$iata = $airline->iata;
			break;
		}
	}

	foreach ($airports as $airport)
	{
		if ($flightStatus->departureAirportFsCode == $airport->fs)
		{
			$airportFrom = $airport->name;
			$airportFromCity = $airport ->city;
			break;
		}
	}

	foreach ($airports as $airport)
	{
		if ($flightStatus->arrivalAirportFsCode == $airport->fs)
		{
			$airportTo = $airport->name;
			$airportToCity = $airport ->city;
			break;
		}
	}

//$keywords = preg_split("/[\s,]+/", "hypertext language, programming");
$stime = explode("T", $flightStatus->operationalTimes->scheduledGateArrival->dateLocal);
$etime = explode("T", $flightStatus->operationalTimes->estimatedGateArrival->dateLocal);
$dtime = explode("T", $flightStatus->operationalTimes->scheduledGateDeparture->dateLocal);

if($stime[1]!=null && $etime[1]!= null)
{
	if (date("h:i", strtotime($stime[1])) < date("h:i", strtotime($etime[1])))
	{
		$status = "Delayed";
	}
	else
	{
		$status = "On Time";
	}
}
else
{
	$status = "Not Available";
}

$myObj->flightId = $flightStatus->flightId;
$myObj->flightCode = $iata . $flightStatus->flightNumber;
$myObj->airline = $airlineString;
$myObj->airportFromCode = $flightStatus->departureAirportFsCode;
$myObj->airportFromName = $airportFrom;
$myObj->airportFromCity = $airportFromCity;
$myObj->scheduledDeparture = ($dtime[1] == null) ? null : date("H:i", strtotime($dtime[1]));
//$myObj->estimatedDeparture = $flightStatus->operationalTimes->estimatedGateDeparture->dateLocal;
$myObj->airportToCode = $flightStatus->arrivalAirportFsCode;
$myObj->airportToName = $airportTo;
$myObj->airportToCity = $airportToCity;
$myObj->scheduledArrival = ($stime[1] == null) ? null : date("H:i", strtotime($stime[1]));
$myObj->estimatedArrival = ($etime[1] == null) ? null : date("H:i", strtotime($etime[1]));
$myObj->status = $status;

$myJSON = json_encode($myObj);

array_push($jsonArray, json_decode($myJSON));

}

//echo '<html><head><style> body {font-family: "Lucida Console", "Lucida Sans Typewriter", monaco, "Bitstream Vera Sans Mono", monospace; font-size: 13px; font-style: normal; font-variant: normal; }</style></head>';

//echo json_encode($jsonArray);


	//print "Flight ID: " . $flightStatus->flightId . "Flight Code: " . $iata . $flightStatus->flightNumber . "Airline: " . $airlineString . "FROM: " . $airportFrom . "TO: " . $airportTo;
	//print str_pad("Flight ID: " . $flightStatus->flightId,60," ") . str_pad("Flight Code: " . $iata . $flightStatus->flightNumber,60," ") . str_pad("Airline: " . $airlineString,60," ") . str_pad("FROM: " . $airportFrom,60," ") . str_pad("TO: " . $airportTo,60," ");
	//printf("%-40s","Flight ID: " . $flightStatus->flightId) . printf("%-40s","Flight Code: " . $iata . $flightStatus->flightNumber ) . printf("%-40s","Airline: " . $airlineString) . printf("%-40s","FROM: " . $airportFrom) . printf("%-40s","TO: " . $airportTo);


echo json_encode($jsonArray);*/

$jsondata = json_decode(file_get_contents("json/".$airportCode."/".$time.".json"));
echo json_encode($jsondata);

});

/*----------------------------------------------*/

$app->get('/flight/{flightId}', function(Request $request, Response $response){

$flightId = $request->getAttribute('flightId'); //989316734 - 989267044

$jsondata = file_get_contents("https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/".$flightId."?appId=2993fb89&appKey=341c3d6e2746f26f649613baf82b5bcb");

$obj = json_decode($jsondata);

echo json_encode($obj->flightStatus);

/*print "Scheduled arrival: " . $obj->flightStatus->operationalTimes->scheduledGateArrival->dateLocal;
echo "<br />";
print "Estimated arrival: " . $obj->flightStatus->operationalTimes->estimatedGateArrival->dateLocal;**/


});

$app->get('/airports', function(Request $request, Response $response){

	 $data= json_decode(file_get_contents('airports.json'), true);
    echo json_encode($data);
});

$app->run();

?>