const APIKey = "5ffe6b0e29acb3a5be9840d2de5815c4";
var APILatLonURL = "http://api.openweathermap.org/geo/1.0/direct?q=";
const SearchButton = $("button");
const SearchText = $("input");

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
    ).then((response) => {
      console.log(response.json());
    });
  }
});
