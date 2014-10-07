class WeatherController < ApplicationController

    def index
        respond_to do |format|
            format.html
            format.js
        end
    end

    def weather_inquiry
        conn = Faraday.new(:url => 'http://5DayWeather.org')
        city = params[:city_form][:city]
        response = conn.get '/api.php', {:city => city}
        body = JSON.parse(response.body)
        if body['data']['error']
            flash[:notice] = body['data']['error']
            redirect_to :index
        else
            # http://5DayWeather.org/api.php?city=London
            @location = body["data"]["location"]
            @temp_f = body["data"]["temperature"]
            @temp_c = ((@temp_f.to_i - 32) / 1.8).floor.to_s
            @skytext = body["data"]["skytext"]
            @humidity = body["data"]["humidity"]
            @wind = body["data"]["wind"]
            @date = body["data"]["date"]
            @day = body["data"]["day"]
            render :index
        end

    end

end
