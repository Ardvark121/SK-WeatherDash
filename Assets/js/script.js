//Set all the constants such as the API key and link consts to html elements to be call upon in the js
const APIKey = "5ffe6b0e29acb3a5be9840d2de5815c4";
const SearchButton = $("button");
const SearchText = $("input");
const Mainbox = $("#Displaybox");
const Forecast = $("#Forecast");

//Listens for any button elemt to be clicked
SearchButton.on("click", function () {
  //Gets the name of the button clicked
  var InputText = $(this).text();
  if (InputText == "Search") {
    //switches the input to the typed sting if they hit the button named search
    InputText = SearchText.val();
    //Activates the next function
    GetLatLonWeather();
  } else {
    GetLatLonWeather();
  }
  function GetLatLonWeather() {
    // Plugs in the API uses the name of a city as input and outputs the latitude and longitude 
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        InputText +
        "&limit=1&appid=" +
        APIKey
    )
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        //Clears the all the boxes on the right side
        Mainbox.children().remove();
        Forecast.children().remove();
        // Adds error message to be taken out later if everyfunction is sucsessful
        Mainbox.text("Please check spelling or choose another city");
        var LatLon = {
          lat: data[0].lat,
          lon: data[0].lon,
        };
        return LatLon;
      })
      .then(function (LatLon) {
        // Plugs in the API uses the latitude and longitude and outputs Weather data
        fetch(
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            LatLon.lat +
            "&lon=" +
            LatLon.lon +
            "&units=imperial" +
            "&appid=" +
            APIKey
        )
          .then((response1) => {
            return response1.json();
          })
          .then(function (Weather) {
            // Erases error message
            Mainbox.text("");
            //Sets consts elemnts
            const City = $("<h3>");
            const Temp = $("<p>");
            const Wind = $("<p>");
            const Humid = $("<p>");
            //Adds texts to those elemts
            City.text(
              Weather.city.name + " " + Weather.list[0].dt_txt.slice(0, 10)
            );
            Temp.text("Tempurature: " + Weather.list[0].main.temp + "°F");
            Wind.text("Wind Speed: " + Weather.list[0].wind.speed + "MPH");
            Humid.text("Humidity: " + Weather.list[0].main.humidity + "%");
            //Adds those elemnts to the mainbox of the page
            Mainbox.append(City);
            Mainbox.append(Temp);
            Mainbox.append(Wind);
            Mainbox.append(Humid);
            // Adds 8 because thats how many seperates values stored in the array from the API in a day
            for (let i = 1; i < 39; i += 8) {
              //Sets consts elemnts
              const forebox = $("<td>");
              const foredate = $("<b>");
              const foreTemp = $("<p>");
              const foreWind = $("<p>");
              const foreHumid = $("<p>");
              //Adds texts to those elemts
              foredate.text(Weather.list[i].dt_txt.slice(0, 10));
              foreTemp.text("Tempurature: " + Weather.list[i].main.temp + "°F");
              foreWind.text(
                "Wind Speed: " + Weather.list[i].wind.speed + "MPH"
              );
              foreHumid.text(
                "Humidity: " + Weather.list[i].main.humidity + "%"
              );
              //Adds those elemnts to the Forecast section of the page
              forebox.append(foredate);
              forebox.append(foreTemp);
              forebox.append(foreWind);
              forebox.append(foreHumid);
              Forecast.append(forebox);
            }
          });
      });
  }
});
