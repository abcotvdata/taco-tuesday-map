/* script.js 
   Author:
   Date:
*/


$(document).ready(function(){ // begin document.ready block

	//jquery code here

	$("#map").click(function(){
		console.log("CLICK ON A PLUS SIGN!")
		$(".leaflet-fixed-pane").show()
	});



	if ($(window).width() >= 600) {
	   // alert('Greater than 600');

		var southWest = L.latLng(30, -112),
	    northEast = L.latLng(37, -125),
	    bounds = L.latLngBounds(southWest, northEast);


		var map = L.map('map', {minZoom: 8}).setView([34.2,-119], 8).setMaxBounds(bounds);
		// var pane = map.createPane('fixedbg', document.getElementById('map'));
		var pane = map.createPane('fixed', document.getElementById('map'));
		var pane = map.createPane('bgfixed', document.getElementById('map'));

		map.getPane('bgfixed').style.zIndex = 300;

		//background layer
	    var imageUrl = 'img/Background.png',
	    imageBounds = [[30, -112], [37, -125]];
	    L.imageOverlay(imageUrl, imageBounds, {pane: 'bgfixed'}).addTo(map).setOpacity(1);


	    //shade layer
	    var imageUrl = 'img/Shade.png',
	    imageBounds = [[30, -112], [37, -125]];
	    L.imageOverlay(imageUrl, imageBounds, {pane: 'bgfixed'}).addTo(map).setOpacity(1).setZIndex(2);


	    //tile layer
		L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			subdomains: 'abcd',
			opacity: 0.25,
	    	pane: 'overlayPane',
			ext: 'png'
		}).addTo(map);


		map.createPane("polygonsPane");
		map.createPane("polygonsColor");



		// county layer
		$.getJSON("socal-counties.geojson",function(polygondata){

	    	var myStyle = {
	    		"fillColor": "#407f7b",
			    "color": "white",
			    "weight": 2,
			    "fillOpacity": 0.65
			};

	    	L.geoJson(polygondata, {
	        	style: myStyle,
	        	pane: "polygonsPane",
	        	opacity: 0.55
	    	}).addTo(map).bringToBack();


	    });



		// taco locations layer
		$.getJSON("tt_data_locations.geojson",function(data){

	    	var layerGroup = L.geoJSON(data, {

	    		pointToLayer: function(feature,latlng){

	    			var plusIcon = L.icon({
						iconSize: [30, 30],
						iconAnchor: [13, 27],
						popupAnchor:  [1, -24],
					    iconUrl: 'img/plus-icon-shaddow-01.png'
					});

		        	return L.marker(latlng, {
		        		icon: plusIcon
		        	});

	        	},
				onEachFeature: function (feature, layer) {

				  	var popup = L.popup({
					  pane: 'fixed',
					  className: 'popup-fixed',
					  autoPan: false,
					}).setContent('<div class="textbox"><div class="title"><h3>'+feature.properties.headline+'</h3></div><div class="text"><p> By ' + feature.properties.reporter_producer + '<br>' + feature.properties.street_address + '<br>' + feature.properties.city_state + ', '+ feature.properties.zip +' <br> <a href="'+feature.properties.link_to_full_story+'" target="_blank">Click here for the full story</a></p></div></div><div class="video"><iframe src="'+feature.properties.link_to_video+'"></iframe></div>');

				    layer.bindPopup(popup);
			  }
			}).addTo(map);


	    });


	}
	else {
	   // alert('Less than 600');

		var southWest = L.latLng(30, -112),
	    northEast = L.latLng(37, -125),
	    bounds = L.latLngBounds(southWest, northEast);


		var map = L.map('map', {minZoom: 8}).setView([33.3,-118.2], 8).setMaxBounds(bounds);
		// var pane = map.createPane('fixedbg', document.getElementById('map'));
		var pane = map.createPane('fixed', document.getElementById('map'));
		var pane = map.createPane('bgfixed', document.getElementById('map'));

		map.getPane('bgfixed').style.zIndex = 300;

		//background layer
	    var imageUrl = 'img/Background.png',
	    imageBounds = [[30, -112], [37, -125]];
	    L.imageOverlay(imageUrl, imageBounds, {pane: 'bgfixed'}).addTo(map).setOpacity(1);


	    //shade layer
	    var imageUrl = 'img/Shade.png',
	    imageBounds = [[30, -112], [37, -125]];
	    L.imageOverlay(imageUrl, imageBounds, {pane: 'bgfixed'}).addTo(map).setOpacity(1).setZIndex(2);


	    //tile layer
		L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			subdomains: 'abcd',
			opacity: 0.25,
	    	pane: 'overlayPane',
			ext: 'png'
		}).addTo(map);


		map.createPane("polygonsPane");
		map.createPane("polygonsColor");



		// county layer
		$.getJSON("socal-counties.geojson",function(polygondata){

	    	var myStyle = {
	    		"fillColor": "#407f7b",
			    "color": "white",
			    "weight": 2,
			    "fillOpacity": 0.65
			};

	    	L.geoJson(polygondata, {
	        	style: myStyle,
	        	pane: "polygonsPane",
	        	opacity: 0.55
	    	}).addTo(map).bringToBack();


	    });



		// taco locations layer
		$.getJSON("tt_data_locations.geojson",function(data){

	    	var layerGroup = L.geoJSON(data, {

	    		pointToLayer: function(feature,latlng){

	    			var plusIcon = L.icon({
						iconSize: [30, 30],
						iconAnchor: [13, 27],
						popupAnchor:  [1, -24],
					    iconUrl: 'img/plus-icon-shaddow-01.png'
					});

		        	return L.marker(latlng, {
		        		icon: plusIcon
		        	});

	        	},
				onEachFeature: function (feature, layer) {

				  	var popup = L.popup({
					  pane: 'fixed',
					  className: 'popup-fixed',
					  autoPan: false,
					}).setContent('<div class="textbox"><div class="title"><h3>'+feature.properties.headline+'</h3></div><div class="text"><p> By ' + feature.properties.reporter_producer + '<br>' + feature.properties.street_address + '<br>' + feature.properties.city_state + ', '+ feature.properties.zip +' <br> <a href="'+feature.properties.link_to_full_story+'" target="_blank">Click here for the full story</a></p></div></div><div class="video"><iframe src="'+feature.properties.link_to_video+'"></iframe></div>');

				    layer.bindPopup(popup);
			  }
			}).addTo(map);


	    });	   

	}


	

    



    
	



}); //end document.ready block
