/* script.js 
   Author:
   Date:
*/


$(document).ready(function(){ // begin document.ready block

	//jquery code here


	if ($(window).width() >= 600) {
	   // alert('Greater than 600');

		var southWest = L.latLng(30, -112),
	    northEast = L.latLng(37, -125),
	    bounds = L.latLngBounds(southWest, northEast);


		var map = L.map('map', {minZoom: 9}).setView([34.1,-118.8], 9).setMaxBounds(bounds);
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
					    iconUrl: 'img/taco-01.png'
					});

		        	return L.marker(latlng, {
		        		icon: plusIcon,
		        	});

		        	L.DomUtil.addClass(marker._icon, 'plusicon');

	        	},
				onEachFeature: function (feature, layer) {

					if (feature.properties.link_to_full_story == "NOTYET") {

						var popup = L.popup({
					  	pane: 'fixed',
					  	className: 'popup-fixed',
					  	autoPan: false,
						}).setContent('<div class="textbox"><div class="new-close-button"><img src="img/exit.png"></div><div class="title"><h3>'+feature.properties.headline+'</h3></div><div class="text"><p>' + feature.properties.street_address + '<br>' + feature.properties.city_state + ', '+ feature.properties.zip +'</p></div></div><div class="video nostory"><h3>STORY COMING SOON!</h3></div>');

					} else {

						var popup = L.popup({
					  	pane: 'fixed',
					  	className: 'popup-fixed',
					  	autoPan: false,
						}).setContent('<div class="textbox"><div class="new-close-button"><img src="img/exit.png"></div><div class="title"><h3>'+feature.properties.headline+'</h3></div><div class="text"><p> By ' + feature.properties.reporter_producer + '<br>' + feature.properties.street_address + '<br>' + feature.properties.city_state + ', '+ feature.properties.zip +' <br> <a href="'+feature.properties.link_to_full_story+'" target="_blank">Click here for the full story</a></p></div></div><div class="video"><iframe src="'+feature.properties.link_to_video+'"></iframe></div>');

					}

				  	

				    layer.bindPopup(popup);

			  }
			}).addTo(map);

			$(".leaflet-marker-icon").click(function(){
				$(".leaflet-fixed-pane").show()
				$(this).addClass("selected-icon")
			});

			$(document.body).on('click', '.selected-icon' ,function(){
				if( $('.leaflet-fixed-pane').is(':empty') ) {
					// alert("HAS STUFF")

					$(".leaflet-fixed-pane").hide()
					$(".selected-icon").removeClass("selected-icon")

				} else {
					// alert("POPUP IS EMPTY")

					$(".leaflet-fixed-pane").show()
					
					
				}
				
				
				
			});



			$(document.body).on('click', '.new-close-button' ,function(){
				// alert("HIDE POPUP")
				$(".leaflet-fixed-pane").hide().empty()
				// $(".selected-icon").removeClass("selected-icon")
				
			});




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
						iconSize: [40, 40],
						iconAnchor: [13, 27],
						popupAnchor:  [1, -24],
					    iconUrl: 'img/taco-01.png'
					});

		        	return L.marker(latlng, {
		        		icon: plusIcon,
		        	});

		        	L.DomUtil.addClass(marker._icon, 'plusicon');

	        	},
				onEachFeature: function (feature, layer) {

				  	if (feature.properties.link_to_full_story == "NOTYET") {

						var popup = L.popup({
					  	pane: 'fixed',
					  	className: 'popup-fixed',
					  	autoPan: false,
						}).setContent('<div class="textbox"><div class="new-close-button"><img src="img/exit.png"></div><div class="title"><h3>'+feature.properties.headline+'</h3></div><div class="text"><p>' + feature.properties.street_address + '<br>' + feature.properties.city_state + ', '+ feature.properties.zip +'</p></div></div><div class="video nostory"><h3>STORY COMING SOON!</h3></div>');

					} else {

						var popup = L.popup({
					  	pane: 'fixed',
					  	className: 'popup-fixed',
					  	autoPan: false,
						}).setContent('<div class="textbox"><div class="new-close-button"><img src="img/exit.png"></div><div class="title"><h3>'+feature.properties.headline+'</h3></div><div class="text"><p> By ' + feature.properties.reporter_producer + '<br>' + feature.properties.street_address + '<br>' + feature.properties.city_state + ', '+ feature.properties.zip +' <br> <a href="'+feature.properties.link_to_full_story+'" target="_blank">Click here for the full story</a></p></div></div><div class="video"><iframe src="'+feature.properties.link_to_video+'"></iframe></div>');

					}

				    layer.bindPopup(popup);

			  }
			}).addTo(map);

			$(".leaflet-marker-icon").click(function(){
				$(".leaflet-fixed-pane").show()
				$(this).addClass("selected-icon")
			});

			$(document.body).on('click', '.selected-icon' ,function(){
				if( $('.leaflet-fixed-pane').is(':empty') ) {
					// alert("HAS STUFF")

					$(".leaflet-fixed-pane").hide()
					$(".selected-icon").removeClass("selected-icon")

				} else {
					// alert("POPUP IS EMPTY")

					$(".leaflet-fixed-pane").show()
					
					
				}
				
				
				
			});



			$(document.body).on('click', '.new-close-button' ,function(){
				// alert("HIDE POPUP")
				$(".leaflet-fixed-pane").hide().empty()
				// $(".selected-icon").removeClass("selected-icon")
				
			});




	    });

	}


	

    



    
	



}); //end document.ready block
