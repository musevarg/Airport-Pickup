# Airport Pickup - Progressive Web App

### Context

This application was developed as part of a pilot programme aiming to give students experience of real-world challenges. Five teams of students across Scotland were competing and this project ultimately won the prize.

More information available [here](https://digitalskillspartnership.scot/digital-skills-partnership-pilot-programme-takes-radical-new-approach-to-delivering-work-ready-tech-talent/).

### A smartphone app to reduce airport drop-off charges

19 of the UK's 30 busiest airports charge drivers for a 10-minute drop-off or collection, with fees ranging from £1 to £4.50.

Entering the terminal drop off area to collect arriving passengers can be especially expensive if you arrive too early with some
airports adding as much as £1/minute if you take any longer than 10 minutes.

This application focuses on providing users with an accurate departure time from their location to be at the airport
just on time and avoid drop-off charges. 
The departure time is calculated using live flight data and obtaining the up-to-date estimated landing time
(is the flight on time or delayed?) and also traffic conditions from the user's location to the airport drop-off.

### Progressive Web App

The app can run within a web browser and standalone as
a [progressive web app](https://developers.google.com/web/progressive-web-apps/) on Android devices.

iOS does not allow progressive web apps to fetch the user's location (yet), but the app can be installed on iOS and will run normally up
to the point where the GPS is needed.

When run within a web browser, the application works on all devices.

Flights API: [flightstats.com](https://developer.flightstats.com)  
Traffic and Directions: [Google APIs](https://developers.google.com/maps/documentation/directions/start)

![](https://github.com/musevarg/Airport-Pickup/blob/master/pic.png?raw=true)
