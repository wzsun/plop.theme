// Plop Lock Screen
// Author: Wesley Sun (wqzsun@gmail.com)

$(document).ready(function(){
	getDate();
	getTime();
	getWeather();
	getBattery();
});

function getTime(){
	var date = new Date();
	var hours = date.getHours();
	
	//12 hours: true
	//24 hours: false
	if (true){
		hours = hours > 12 ? hours - 12 : hours;
	}
	
	$("#hours").html(hours > 9 ? hours : "0" + hours);
	$("#mins").html(date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());
	
	
	setTimeout("getTime();", 1000);
}

function getDate() {
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	// Formats the date when it reaches double digits
	if (month > 9){
		document.getElementById("day").style.left = "22px";
	}


	$("#month").html(month);
	$("#day").html(day);
	$("#year").html(year);
}

function getWeather () {
	// Place your woeid here
	var woeid = 12765399;

	// This is the unit, either f or c. f:fahrenheit or c:celcius
	var unit = "f";

	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20%22"+ woeid+"%22%20and%20u%3D%22"+unit+"%22&format=json&diagnostics=true&callback=?"
	$.getJSON(url,function(data){
		document.getElementById("city").innerHTML = data.query.results.channel.location.city+" "+data.query.results.channel.location.region;
		if(unit == "f")
			document.getElementById("temp").innerHTML = data.query.results.channel.item.condition.temp + "&#176;F";
		else
			document.getElementById("temp").innerHTML = data.query.results.channel.item.condition.temp + "&#176;C";
	});
}	

function getBattery () {
	jQuery.get('file:///var/mobile/Library/Stats/BatteryStats.txt', function(stats) {
		
		var widthpx = 200;
		var substr = stats.split('\n');
		var Level = substr[0].split(':')[1];

		var col=""

		//debug
		//var Level = 60;		

		document.getElementById("batterynumber").innerHTML = Level;
	
		Level = (Level/100) * widthpx;

		document.getElementById("battery").style.left = widthpx-Level + "px";
		document.getElementById("battery").style.width = Level + "px";
		
	});
}

