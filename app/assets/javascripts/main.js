$(document).ready(function(){
  //-- Initialise the background
  $('body').addClass('fine');

  //-- Handle the temperature based on the geolocation
  navigator.geolocation.getCurrentPosition(handle_geolocation_query);  

  function handle_geolocation_query(position) {
    console.log('Lat: ' + position.coords.latitude + "\n" + 'Lon ' + position.coords.longitude);

    //--- Retrieve Current Weather
    Weather = Backbone.Model.extend({});
    
    var weather = new Weather();
    weather.url = '/weather/'+ position.coords.latitude + '/' + position.coords.longitude + '.json';

    weather.fetch({
      success : function(){
          console.log(weather);
          var city_name = weather.get('name');
          $('#current-location').html(city_name);

          var current_temp = weather.get('main')['temp_max'];
          $('#current-temperature').html(Math.round(current_temp * 10) / 10);

          // Set the weather icon
          var icon = weather.get('weather')[0]['icon'];
          console.log(convertToWeatherIcon(icon));
          $('#weather-icon').attr("src",'/assets/' + convertToWeatherIcon(icon));

          // Change the background based on the temperature
          $('body').attr('class', colorForTemperature(current_temp));
      }
    });

    //--- Retreive Forecast
    var Forecasts = Backbone.Model.extend({});
    var forecasts = new Forecasts();
    console.log(new Date(1379214000 * 1000));

    forecasts.url = '/weather/fivedayforecast/' + position.coords.latitude + '/' + position.coords.longitude + '.json'
    forecasts.fetch({
        success : function(){
          var forecast_list = forecasts.get('list');
          console.log(forecast_list);

          for (var i = 0; i < 5; i++) {
            var entry = forecast_list[i];
            var entryDay = new Date(entry['dt'] * 1000);
            var icon = entry["weather"][0]["icon"];

            console.log(icon);

            $('ul').append(
                "<li class=\"span2 forecast-item\">" +
                "<div class=\"forecast-icon\">" +
                "<img src=\"/assets/" + convertToWeatherIcon(icon) + "\"" + " class=\"icon\"/>" +
                "</div>" +
                "<h5>" + Math.round(entry["temp"]["max"] * 10) / 10 + "</h5>" +
                "<h5>" + entryDay.toUTCString().substring(0,3) + "</h5>" +
                "</li>"
            );
          }
        }
     });
  }

  // Convert API keys to associated weather icons
  function convertToWeatherIcon(key) {
    if (key == '01d' || key == '01n') {
        return 'Clear.png';
    }

    if (key == '02d' || key == '02n' ||
        key == '03d' || key == '03n' || 
        key == '04d' || key == '04n') {
        return 'Cloud.png';
    }

    if (key == '09d' || key == '09n' ||
        key == '10d' || key == '10n') {
        return 'Rain.png';
    }

    if (key == '13d' || key == '13n') {
        return 'Snow.png'; 
    }

    if (key == '50d' || key == '50n') {
        return 'Fog.png'; 
    }
  }

  // Colours related to temperature
  function colorForTemperature(temperature) {    
      if (temperature < 0) {
        return 'cold';
      } else if (temperature > 0 && temperature <= 15) {
        return 'cool';
      } else if (temperature > 15 && temperature <= 25) {
        return 'fine';
      } else if (temperature > 25 && temperature <= 35) {
        return 'warm';
      } else if (temperature > 35) {
        return 'hot';
      }
  }
});
