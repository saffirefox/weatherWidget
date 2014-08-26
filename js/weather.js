$(function() {
	    weather = {
		cityID: '',
		temp: '',

		getWeather: function(id) {                      //in JSON, each city has an id number
			
			if(id === '') {                             //if id is empty string (no city selected)
				this.cityID = $('#cityList').val();     //get value of city selected (#cityList is pull down list of cities)
			} else {
				this.cityID = id;                       //if a city has already been selected, set id to city number from JSON
			}


			$.ajax({                                                    //AJAX call
				url: 'http://api.openweathermap.org/data/2.5/weather',  //link to openweathermap.org data
				type: 'GET',                                            //use GET request to retrieve data
				dataType: 'json',                                       //retrieve info in JSON format rather than XML
				data: {id: this.cityID}                                 //id in JSON record is a 7 digit number identifying the city
			})
			.done(function(data) {
				// console.log(data);
				// console.log(data.main.temp);

				weather.postTemp(data.main.temp);                       //"main" is a key in JSON, temp is a value paired to "main" and is in Kelvin units
				weather.changeTown();                                   //function call
				weather.changeIcon(data.weather[0].icon);               //

				
				// console.log("success");
			})
			.fail(function() {
				alert('There was a failure.  Please check the logs.');
				// console.log("error");
			})
			.always(function() {
				// console.log("complete");
			});
			
		},

		listenCity: function() {
			$('#cityList').on('change', function() {
				var city = $('#cityList').val();

				weather.getWeather(city);
			})
		},

		listenFormat: function() {
			$('input:radio[name=tempFormat]').on('change', function() {
				var city = $('#cityList').val();
				weather.getWeather(city);
			})
		},

		postTemp: function(temp) {
			
			if($('input:radio[name=tempFormat]:checked').val() ==='F') {
				
				$('.temp').html(weather.convertF(temp).toFixed(1) + ' F&deg;');
			} else {
				$('.temp').html(weather.convertC(temp).toFixed(1) + ' C&deg;');
			}
		},

		convertF: function(temp) {
			var newtemp = (temp - 273.15)* 1.8000 + 32.00;
			return newtemp;
		},
		convertC: function(temp) {
			var newtemp = (temp - 273.15);
			return newtemp;
		},
		changeTown: function() {
			$('.cityName').html($( "#cityList option:selected" ).text());
		},
		changeIcon: function(icon) {
			// console.log(icon);
			$('.icon img').attr('src', "http://openweathermap.org/img/w/"+icon+".png")
		}
	};

	weather.listenCity();
	weather.listenFormat();

	weather.getWeather(5577147);
});