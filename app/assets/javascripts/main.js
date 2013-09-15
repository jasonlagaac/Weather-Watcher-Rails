$(document).ready(function(){
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
            console.log((entryDay));

            $('ul').append(
                "<li class=\"span2 forecast-item\">" +
                "<img src=\"/assets/Cloud.png\" class=\"forecast-icon\"/>" +
                "<h5>" + Math.round(entry["temp"]["max"] * 10) / 10 + "</h5>" +
                "<h5>" + entryDay.toUTCString().substring(0,3) + "</h5>" +
                "</li>"
            );
          }
        }
     });
  }
});
