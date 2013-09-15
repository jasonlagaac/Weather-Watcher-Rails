class WeatherController < ApplicationController

  def current_weather
    latitude = params[:lat]
    longitude = params[:long]
    @response = HTTParty.get("http://api.openweathermap.org/data/2.5/weather?lat=#{latitude}&lon=#{longitude}")

    respond_to do |format|
      format.json { render :json => @response }
    end
  end

  def five_day_forecast
    latitude = params[:lat]
    longitude = params[:long]
    @response = HTTParty.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat=#{latitude}&lon=#{longitude}&units=metric&cnt=5")

    respond_to do |format|
      format.json { render :json => @response }
    end
  end

end
