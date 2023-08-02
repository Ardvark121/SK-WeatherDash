const APIKey = "5ffe6b0e29acb3a5be9840d2de5815c4";
var APILatLonURL = "http://api.openweathermap.org/geo/1.0/direct?q=";
const SearchButton = $("button");
const SearchText = $("input");
const Mainbox = $("#Displaybox");
const Forecast = $("#Forecast");

SearchButton.on("click", function () {
  var InputText = $(this).text();
  if (InputText == "Search") {
    InputText = SearchText.val();
    GetLatLon();
  } else {
    GetLatLon();
  }
  function GetLatLon() {
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
        Mainbox.children().remove();
        Forecast.children().remove();
        var LatLon = {
          lat: data[0].lat,
          lon: data[0].lon,
        };
        return LatLon;
      })
      .then(function (LatLon) {
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
            const City = $("<h3>");
            const Temp = $("<p>");
            const Wind = $("<p>");
            const Humid = $("<p>");
            City.text(
              Weather.city.name + " " + Weather.list[0].dt_txt.slice(0, 10)
            );
            Temp.text("Tempurature: " + Weather.list[0].main.temp + "°F");
            Wind.text("Wind Speed: " + Weather.list[0].wind.speed + "MPH");
            Humid.text("Humidity: " + Weather.list[0].main.humidity + "%");
            Mainbox.append(City);
            Mainbox.append(Temp);
            Mainbox.append(Wind);
            Mainbox.append(Humid);
            console.log(Weather);
            for (let i = 1; i < 39; i += 8) {
              const forebox = $("<td>");
              const foredate = $("<b>");
              const foreTemp = $("<p>");
              const foreWind = $("<p>");
              const foreHumid = $("<p>");
              foredate.text(Weather.list[i].dt_txt.slice(0, 10));
              foreTemp.text("Tempurature: " + Weather.list[i].main.temp + "°F");
              foreWind.text(
                "Wind Speed: " + Weather.list[i].wind.speed + "MPH"
              );
              foreHumid.text(
                "Humidity: " + Weather.list[i].main.humidity + "%"
              );
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
