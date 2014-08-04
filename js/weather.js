$(function() {
	weather = {
		cityID: '',
		temp: '',

		getWeather: function(id) {
			
			if(id === '') {
				this.cityID = $('#cityList').val();				
			} else {
				this.cityID = id;
			}
			// console.log(this.cityID);

			$.ajax({
				url: 'http://api.openweathermap.org/data/2.5/weather',
				type: 'GET',
				dataType: 'json',
				data: {id: this.cityID},
			})
			.done(function(data) {
				// console.log(data);
				// console.log(data.main.temp);

				weather.postTemp(data.main.temp);
				weather.changeTown();
				weather.changeIcon(data.weather[0].icon);

				
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
	}

	weather.listenCity();
	weather.listenFormat();

	weather.getWeather(5419384);
});