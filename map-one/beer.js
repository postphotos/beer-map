   	var map;

	var firemapcenter = (typeof getUrlVars()["fire"] != 'undefined') ? getUrlVars()["fire"] : 'state_view';
	
	switch(firemapcenter) {
		case 'east_peak':		chosenfire = 1;
								break;
		case 'black_forest':	chosenfire = 2;
								break;
		case 'royal_gorge':		chosenfire = 3;
								break;
		case 'wild_rose':		chosenfire = 4;
								break;
		case 'ward_gulch':		chosenfire = 5;
								break;
		case 'big_meadow':		chosenfire = 6;
								break;
		case 'west_fork':		chosenfire = 7;
								break;
		case 'lime_gulch':		chosenfire = 8;
								break;
		case 'east_fork':		chosenfire = 9;
								break;
		case 'state_view':		chosenfire = 0;
								break;
		default:				chosenfire = 0;
								break;
		}

	var firecenter = new Array();
			
	//   [zoom level,latitude,longitude]
	firecenter[0] = [7,39.052002,-105.457425]; //default -- state of Colorado
	firecenter[1] = [11,37.494762,-104.851117]; //East Peak fire
	firecenter[2] = [12,39.045069,-104.698157]; //Black Forest fire
	firecenter[3] = [12,38.456295,-105.280434]; //Royal Gorge fire
	firecenter[4] = [12,39.774104,-108.813224]; //Wild Rose fire
	firecenter[5] = [13,39.663212,-107.725234]; //Ward Gulch fire
	//firecenter[6] = [14,40.327588,-105.771214]; //Big Meadow fire
	firecenter[7] = [10,37.599917,-106.919627]; //West Fork fire
	firecenter[8] = [13,39.413277,-105.226369]; //Lime Gulch fire
	firecenter[9] = [14,38.201629,-107.495732]; //East Fork fire

	var layers = [];
	
	layers[1] = new google.maps.KmlLayer('http://extras.denverpost.com/media/maps/kml/2013/Coloradowildfireevacuations2013.kml', {preserveViewport: true});
	layers[2] = new google.maps.KmlLayer('http://extras.denverpost.com/media/maps/kml/2013/Coloradowildfireperimeters2013.kml', {preserveViewport: true});
	layers[3] = new google.maps.KmlLayer('http://extras.denverpost.com/media/maps/kml/2013/Coloradowildfirehomesaffected2013.kml', {preserveViewport: true});

	function drawGoogleWildfireMap() {
		
		var mapZoom = null;
		
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: firecenter[chosenfire][0],
			disableDefaultUI: true,
			panControl: true,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: true,
			streetViewControl: false,
			overviewMapControl: false,
			center: new google.maps.LatLng(firecenter[chosenfire][1],firecenter[chosenfire][2]),
			mapTypeId: google.maps.MapTypeId.TERRAIN
		});

/* layer toggles */
		layers[1].setMap(map);
		layers[2].setMap(map);
		layers[3].setMap(map);

		$('a[class*=' + firemapcenter + ']').removeClass('unselected').addClass('selected');

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
	}
 
/* end layer toggles */
	

	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}

	function centerFire(newcenter,caller) {
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