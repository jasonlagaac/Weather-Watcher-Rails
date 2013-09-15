require 'spec_helper'

describe WeatherController do
  it "responds with coordinates should be a success" do
    get :index, :lat => 10.00, :long => 10.00
    #response.should be_success
  end
end
