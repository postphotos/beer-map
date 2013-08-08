   	var map;

	var mapcenter = (typeof getUrlVars()["fire"] != 'undefined') ? getUrlVars()["fire"] : 'state_view';
	
	switch(mapcenter) {
		case 'east_peak':		chosencity = 1;
								break;
		case 'black_forest':	chosencity = 2;
								break;
		case 'royal_gorge':		chosencity = 3;
								break;
		case 'wild_rose':		chosencity = 4;
								break;
		case 'ward_gulch':		chosencity = 5;
								break;
		case 'big_meadow':		chosencity = 6;
								break;
		case 'west_fork':		chosencity = 7;
								break;
		case 'lime_gulch':		chosencity = 8;
								break;
		case 'east_fork':		chosencity = 9;
								break;
		case 'state_view':		chosencity = 0;
								break;
		default:				chosencity = 0;
								break;
		}

	var mapcenter = new Array();
			
	//   [zoom level,latitude,longitude]
	mapcenter[0] = [7,39.052002,-105.457425]; //default -- state of Colorado
	mapcenter[1] = [15,39.750786,-104.997203]; //LoDo
	mapcenter[2] = [12,39.045069,-104.698157]; //Black Forest fire
	mapcenter[3] = [12,38.456295,-105.280434]; //Royal Gorge fire
	mapcenter[4] = [12,39.774104,-108.813224]; //Wild Rose fire
	mapcenter[5] = [13,39.663212,-107.725234]; //Ward Gulch fire
	//mapcenter[6] = [14,40.327588,-105.771214]; //Big Meadow fire
	mapcenter[7] = [10,37.599917,-106.919627]; //West Fork fire
	mapcenter[8] = [13,39.413277,-105.226369]; //Lime Gulch fire
	mapcenter[9] = [14,38.201629,-107.495732]; //East Fork fire



  

			
//		var mapZoom = null;
	function initialize() {

	var ctaLayer = new google.maps.KmlLayer({
    url: 'http://gmaps-samples.googlecode.com/svn/trunk/ggeoxml/cta.kml'
  });
	ctaLayer.setMap(map);
	
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: mapcenter[chosencity][0],
			/* disableDefaultUI: true,
			panControl: true,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: true,
			streetViewControl: false,
			overviewMapControl: false, */
			center: new google.maps.LatLng(mapcenter[chosencity][1],mapcenter[chosencity][2]),
			mapTypeId: google.maps.MapTypeId.TERRAIN
		});


}

google.maps.event.addDomListener(window, 'load', initialize);


/*	var beer = new google.maps.KmlLayer({url: 'http://www.leopostovoit.com/beermap/breweries.kml', preserveViewport: true });
	
	beer.setMap(map); */




	
/* layer toggles */
	/*	layers[1].setMap(map);

		$('a[class*=' + mapcenter + ']').removeClass('unselected').addClass('selected');

		google.maps.event.addListener(map, 'idle', function(){ console.log(map.getZoom() + ', ' + map.getCenter()) })
	}
	
	 function toggleLayer(i,caller) {
		if(layers[i].getMap() === null) {
			layers[i].setMap(map);
			$(caller).removeClass('unselected');
			$(caller).addClass('selected');
			$('wrapper-dropdown-1').removeClass('active');
		} else {
			layers[i].setMap(null);
			$(caller).removeClass('selected');
			$(caller).addClass('unselected');
			$('wrapper-dropdown-1').removeClass('active');
		}
	} */
 
/* end layer toggles */
	

	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}

	function centerMap(newcenter,caller) {
		map.setCenter(new google.maps.LatLng(newcenter[1],newcenter[2]));
		map.setZoom(newcenter[0]);
		$('#dd2 > ul.dropdown > li > a').removeClass('selected').addClass('unselected');
		$(caller).removeClass('unselected').addClass('selected');
		$('wrapper-dropdown-1').removeClass('active');
	}

	function DropDown(el) {
				this.dd = el;
				this.placeholder = this.dd.children('span');
				this.opts = this.dd.find('.wrapper-dropdown-1 > ul.dropdown > li');
				this.val = '';
				this.index = -1;
				this.initEvents();
			}
			DropDown.prototype = {
				initEvents : function() {
					var obj = this;

					obj.dd.on('click', function(event){
						$(this).toggleClass('active').siblings().removeClass('active');
						return false;
					});

					obj.opts.on('click', 'li', function(){
						var opt = $(this);
						obj.val = opt.text();
						obj.index = opt.index();
						obj.placeholder.text(obj.val);
					});
				},
				getValue : function() {
					return this.val;
				},
				getIndex : function() {
					return this.index;
				}
			}

			$(function() {

				var dd = new DropDown( $('#dd1') );
				var dd2 = new DropDown( $('#dd2') );

				$(document).click(function() {
					// all dropdowns
					$('.wrapper-dropdown-1').removeClass('active');
				});

			});