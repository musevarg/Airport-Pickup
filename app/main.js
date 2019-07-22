checkToken();

var airportCode = "";
var airportLatLng = "";
var j = [];
var searchStatus = false;
var landingTime = "";
var map; var dir;
var refreshposition = false;

function checkToken()
{
        var token = localStorage.getItem('token');
        $.getJSON("../php/check_token.php?token="+ token, function(json) {
        var myJSON = JSON.stringify(json);
        obj = JSON.parse(myJSON);
        console.log(obj);
        if(obj.status!='VALID')
        {
          localStorage.setItem('user', obj.user);
          location.replace("../");
        }
    });
}

$( document ).ready(function() {

	var inputBox = document.getElementById("myInput");
	inputBox.addEventListener("keydown", function (e) {
		//console.log("it works: " + e.keyCode);
		updateSearch();
	});

});

function searchButton()
{
  if (searchStatus)
  {
    //$("#flightInfo").fadeOut();
    if(refreshposition != false){
      clearInterval(refreshposition);
      refreshposition = false;
    }
    $("#searchBar").fadeIn();
    document.getElementById("mySelect").value = "";
    document.getElementById('flightInfo').innerHTML = "";
    $("#flightInfo").css( "flex", "0 0 0px" );
    $("#directionsInfo").css( "flex", "0 1 0px" );
    document.getElementById('directionsInfo').innerHTML = '';
    searchStatus = false;
    $('#mapoverlay').css("display", "block");
  }
}

function searchFlights()
{
	j = [];
	var time = document.getElementById('mySelect').value;
	$.getJSON("../api/arrivals/"+airportCode+"/"+(time-1), function(json) {
	var list = document.getElementById('flightList');
	list.innerHTML = '<h2 onclick="closeFlightList();">Select a flight</h2><hr>';
    createFlightList(json, list);
    $("#searchBar").fadeOut();
    $("#flightList").fadeIn();
	});
  searchStatus = true;
}

function createFlightList(json, list)
{

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth()).padStart(2, '0');
  var yy = today.getFullYear();

  json.sort(function(a, b) {

  var timeA = a.scheduledArrival.split(":");
  var dateA = new Date(yy,mm,dd,timeA[0],timeA[1],'00');
  var timeB = b.scheduledArrival.split(":");
  var dateB = new Date(yy,mm,dd,timeB[0],timeB[1],'00');

  return dateA - dateB; 

  });

	var list = document.getElementById('flightList');

	for (i=0; i<json.length; i++)
    {
    	j.push(JSON.stringify(json[i]));
    	list.innerHTML += '<div onclick="closeFlightList();showFlightInfo('+i+');" style="display:block;width:100%;padding:5px;"><p style="font-size: 14px;"><strong>'+json[i].scheduledDeparture + ' - ' + json[i].scheduledArrival+'</strong><br><span style="font-size: 12px">'+json[i].airportFromCode + ' - ' + json[i].airportToCode + '<br>'+json[i].airportFromName + ' - ' + json[i].airportToName+'</span></p><hr></div>';
    }
}

function closeFlightList()
{
	$("#flightList").fadeOut();
}

function showFlightInfo(i)
{
    $('#searchBtn').css("display", "block");
    $('#mapoverlay').css("display", "none");
		console.log(j[i]);
		var flightInfo = document.getElementById('flightInfo');
		json = JSON.parse(j[i]);
    flightInfo.innerHTML = "";

			if (json.status == "Delayed")
			{
				flightInfo.innerHTML += ' <div style="width:100%"> <div style="float:left;height:100%;width:50%;padding:8px;"> <p style="font-size:15px;text-align:center;font-weight:bold;">'+ json.scheduledDeparture + ' - ' + json.scheduledArrival +'</p> <p style="font-size:12px;text-align:center;"><span style="color:rgb(0,128,128);font-weight:bold;">From '+json.airportFromCity+'</span><br><span>'+json.airportFromName+'</span></p> <p style="font-size:12px;text-align:center;"><span style="color:rgb(0,128,128);font-weight:bold;">To '+json.airportToCity+'</span><br><span>'+json.airportToName+'</span></p></div> <div style="float:right;height:100%;width:50%;padding:5px;"> <p style="font-size:20px;font-weight: bold;text-align:center;">'+json.flightCode+'<br><span style="font-size:12px;">'+json.airline+'</span></p><p style="font-size:20px;font-weight: bold;text-align:center;color:red">DELAYED</p><p style="font-size:12px;text-align:center;">ETA: <span style="font-size:15px;font-weight:bold;">'+json.estimatedArrival+'</span></p></div></div>';
			  landingTime = json.estimatedArrival;
      }
			else
			{
				flightInfo.innerHTML += ' <div style="width:100%"> <div style="float:left;height:100%;width:50%;padding:8px;"> <p style="font-size:15px;text-align:center;font-weight:bold;">'+ json.scheduledDeparture + ' - ' + json.scheduledArrival +'</p> <p style="font-size:12px;text-align:center;"><span style="color:rgb(0,128,128);font-weight:bold;">From '+json.airportFromCity+'</span><br><span>'+json.airportFromName+'</span></p> <p style="font-size:12px;text-align:center;"><span style="color:rgb(0,128,128);font-weight:bold;">To '+json.airportToCity+'</span><br><span>'+json.airportToName+'</span></p></div> <div style="float:right;height:100%;width:50%;padding:5px;"> <p style="font-size:20px;font-weight: bold;text-align:center;">'+json.flightCode+'<br><span style="font-size:12px;">'+json.airline+'</span></p><p style="font-size:20px;font-weight: bold;text-align:center;color:green">ON TIME</p></div></div>';
			  landingTime = json.scheduledArrival;
      }

    $("#flightInfo").css( "flex", "0 1 150px" );

  navigator.geolocation.getCurrentPosition(function(location) {
  console.log(location.coords.latitude);
  console.log(location.coords.longitude);
  console.log(location.coords.accuracy);
  console.log("This one has run");
  getRouteData(location.coords.latitude, location.coords.longitude, airportLatLng);
});
}


function closeFlightInfo()
{
	$("#flightInfo").fadeOut();
  $("#searchBar").fadeIn();
}


function getAirports()
{
	$.getJSON("../api/airports", function(json) {
    console.log(json);
	});
}

function updateSearch()
{
	var results = document.getElementById("suggestiveDropDown");
	//results.innerHTML = '<option value="0">0:00</option><option value="1">1:00</option><option value="2">2:00</option><option value="3">3:00</option><option value="4">4:00</option>  <option value="5">5:00</option>  <option value="6">6:00</option>  <option value="7">7:00</option>';
	//results.size=results.options.length;
	var obj;
	$.getJSON("../api/airports", function(json) {
    //console.log(json);
    autocomplete(document.getElementById("myInput"), json);
	});

}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.airports.length; i++) {
      	if (arr.airports[i].fs != null)
      	{

        /*check if the item starts with the same letters as the text field value:*/
        if (arr.airports[i].city.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr.airports[i].city.substr(0, val.length) + "</strong>";
          b.innerHTML += arr.airports[i].city.substr(val.length) + "<i> - " + arr.airports[i].name + "</i>";
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr.airports[i].fs + "'>";
          b.innerHTML += "<input type='hidden' value='" + arr.airports[i].name + "'>";
          b.innerHTML += "<input type='hidden' value='" + arr.airports[i].latitude + ',' + arr.airports[i].longitude + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[1].value;
              airportCode = this.getElementsByTagName("input")[0].value;
              airportLatLng = this.getElementsByTagName("input")[2].value;
              document.getElementById("mySelect").disabled = false;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }

    }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
//autocomplete(document.getElementById("myInput"), countries);

function initDirectionMap(lat, lng, airport) {

    var mapOptions = {
    disableDefaultUI: true
  }
  
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var trafficLayer = new google.maps.TrafficLayer();

  var start = new google.maps.LatLng(lat, lng);
  var end = airport;
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });

  directionsDisplay.setMap(map);
  trafficLayer.setMap(map);

  console.log("Route has been calculated.");

  if(!refreshposition){
  var bounds = new google.maps.LatLngBounds();
  bounds.extend(dir.routes[0].bounds.northeast);
  bounds.extend(dir.routes[0].bounds.southwest);
  map.fitBounds(bounds);
  }

  console.log("initDirections");
}

function calcRoute(lat, lng, airport) {

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var trafficLayer = new google.maps.TrafficLayer();

  var start = new google.maps.LatLng(lat, lng);
  var end = airport;
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });

  directionsDisplay.setMap(map);
  trafficLayer.setMap(map);

  console.log("Route has been calculated.");

  if(!refreshposition){
  var bounds = new google.maps.LatLngBounds();
  bounds.extend(dir.routes[0].bounds.northeast);
  bounds.extend(dir.routes[0].bounds.southwest);
  map.fitBounds(bounds);
  }
}

function getRouteData(lat, lng, airport)
{
  console.log("getRouteData: " + airport.replace(' ','+'));
    $.getJSON("../php/directions.php?start="+lat+","+lng+"&end="+airport.replace(' ','+'), function(json) {
        var myJSON = JSON.stringify(json);
        obj = JSON.parse(myJSON);
        dir = obj;
        console.log(obj);
        if(!refreshposition){
        var depTime = calcDepartureTime(landingTime, json.routes[0].legs[0].duration.value);
        var fDepTime = ((depTime.getHours() < 10)?"0":"") + depTime.getHours() +":"+ ((depTime.getMinutes() < 10)?"0":"") + depTime.getMinutes();
        document.getElementById('directionsInfo').innerHTML = '<div style="width:100%"><div style="float:left;height:120px;width:50%;padding:5px;"><p style="font-size:15px;text-align:center;font-weight:bold;">'+ obj.routes[0].legs[0].duration.text +'<br><span style="font-size:12px;font-weight:normal;">'+ Math.round(obj.routes[0].legs[0].distance.value*0.000621) +' miles</span></p><p style="font-size:11px;text-align:center;">'+ obj.routes[0].legs[0].end_address +'</p></div><div style="float:right;height:120px;width:50%;padding:5px;"><p style="font-size:12px;text-align:center;">You should leave at<br><span style="font-size:15px;font-weight:bold;">'+ fDepTime +'</span></p><a id="leaveBtn" class="btn btn-default" style="width: 100%; color: white;font-weight:bold;font-size:14px;background-color: rgb(0,128,128);" onclick="leaveButton();">Leave Now</a></div></div>';
        $("#directionsInfo").css( "flex", "0 1 120px" );
        initDirectionMap(lat, lng, airport);
      }
  });
}

function calcDepartureTime(landingTime, travelTime)
{
  var today = new Date();
  //var time = today.getTime();
  console.log(today);

  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth()).padStart(2, '0');
  var yy = today.getFullYear();

  var splitLandingTime = landingTime.split(":");
  var landing = new Date(yy,mm,dd,splitLandingTime[0],splitLandingTime[1],'00');
    console.log(landing);
  //var landingTimestamp = landing.getTime();
  travelTime = travelTime * 1000;
  var departureTime = landing - travelTime;
  console.log(new Date(departureTime));
  return new Date(departureTime);
}

function leaveButton()
{
  leaveNow();
  refreshposition = setInterval(leaveNow, 10000);
}

function leaveNow()
{
  navigator.geolocation.getCurrentPosition(function(location) {
    getRouteData(location.coords.latitude, location.coords.longitude, dir.routes[0].legs[0].end_address);
    var mapOptions = {
      center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
      zoom: 17
  }
  map.setOptions(mapOptions);
  var now = new Date(); 
  var duration = parseInt(dir.routes[0].legs[0].duration.value) * 1000;
  var arrival = new Date(parseInt(now.getTime() + duration));
  var fArrTime = ((arrival.getHours() < 10)?"0":"") + arrival.getHours() +":"+ ((arrival.getMinutes() < 10)?"0":"") + arrival.getMinutes(); 
  //document.getElementById('directionsInfo').innerHTML = '<center><p style="font-size:12px;">Live Navigation</p><p style="font-size:16px;">'+dir.routes[0].legs[0].steps[0].html_instructions+'</p></center>';
  document.getElementById('directionsInfo').innerHTML = '<div style="width:100%"><div style="float:left;height:120px;width:70%;padding:5px;"><p style="font-size:14px;text-align:center;">Arriving for <span style="font-size:15px;font-weight:bold;color:rgb(0,128,128);">'+fArrTime+'</span></p><p style="font-size:16px;text-align:center;">'+dir.routes[0].legs[0].steps[0].html_instructions+'</p></div><div style="float:right;height:120px;width:30%;padding:5px;"><p style="font-size:12px;text-align:center;">Live Navigation</p><a id="leaveBtn" onclick="stopNavigation();" class="btn btn-default" style="width: 100%; color: white;font-weight:bold;font-size:14px;background-color: rgb(0,128,128);">Stop</a></div></div>';
  console.log('refreshed');
});

}

function stopNavigation()
{
  clearInterval(refreshposition);
  refreshposition = false;
  navigator.geolocation.getCurrentPosition(function(location) {
    getRouteData(location.coords.latitude, location.coords.longitude, airportLatLng);
  });
}

function profileButton()
{
  location.replace("../profile");
}

