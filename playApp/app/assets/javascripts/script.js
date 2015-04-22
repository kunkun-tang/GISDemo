/*jshint sub:true */
/*jshint smarttabs:true */

(function($, window){

  var data = {};
  var DataUrl = '/query';

  var tiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/fsi206914.lolpnlag/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZnNpMjA2OTE0IiwiYSI6InJqOERGME0ifQ.T--NTZ9hN8xt7ZQQ5tLj4Q', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    }), OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  var latlng = L.latLng(32.604402, -85.480068);
  L.mapbox.accessToken = 'pk.eyJ1IjoiZnNpMjA2OTE0IiwiYSI6InJqOERGME0ifQ.T--NTZ9hN8xt7ZQQ5tLj4Q';

  var map1 = L.map('map1', { center: latlng, zoom: 13, layers: [tiles] }),
    map2 = L.map('map2', { center: latlng, zoom: 13, layers: [OpenStreetMap_Mapnik] });

  var heat = L.heatLayer([], { maxZoom: 9 }).addTo(map2);

  map1.on('moveend', follow).on('zoomend', follow);
  map2.on('moveend', follow).on('zoomend', follow);

  var progress = document.getElementById('progress');
  var progressBar = document.getElementById('progress-bar');

  function updateProgressBar(processed, total, elapsed, layersArray) {
    if (elapsed > 1000) {
      // if it takes more than a second to load, display the progress bar:
      progress.style.display = 'block';
      progressBar.style.width = Math.round(processed/total*100) + '%';
    }

    if (processed === total) {
      // all markers processed - hide the progress bar:
      progress.style.display = 'none';
      liang.style.display = 'none';
    }
  }

  var markers = new L.MarkerClusterGroup({chunkedLoading: true, chunkProgress: updateProgressBar});
  var markerList = [];
  $.ajax({
    url: DataUrl,
    data: data,
    dataType: 'json'
    }).success(function(json) {
      // var i, data = json;
      for (var i = 0; i < json.length; i++) {
        var a = json[i];
        heat.addLatLng(new L.LatLng(a['coorx'], a['coory']));
        var marker = L.marker(new L.LatLng(a['coorx'], a['coory']), {
            icon: L.mapbox.marker.icon({'marker-color': '#ff8888'})
        });
        markerList.push(marker);
      }
      markers.addLayers(markerList);
      map1.addLayer(markers);
    });

  var quiet = false;
  function follow(e){
      if (quiet) return;
      quiet = true;
      if (e.target === map1) sync(map2, e);
      if (e.target === map2) sync(map1, e);
      quiet = false;
  }

  // sync simply steals the settings from the moved map (e.target)
  // and applies them to the other map.
  function sync(map, e) {
    map.setView(e.target.getCenter(), e.target.getZoom(), {
      animate: false,
      reset: true
    });
  }

})(jQuery, window);