mapboxgl.accessToken =
'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom: 6.3,
center: [-120.7401, 47.7511],
projection: 'albers'
});

const grades = [10000, 20000, 30000], 
colors = ['rgb(254,224,210)', 'rgb(252,146,114)', 'rgb(222,45,38)'], 
radii = [5, 15, 20];

map.on('load', () => {
map.addSource('covidCounts', {
    type: 'geojson',
    data: 'assets/us-covid-2020-counts.json'
});

map.on('click', 'covidCounts-point', (event) => {
    new mapboxgl.Popup()
    .setLngLat(event.features[0].geometry.coordinates)
    .setHTML(`<strong>Cases:</strong> ${event.features[0].properties.cases}`)
    .addTo(map);
});

const legend = document.getElementById('legend');

var labels = ['<strong>Size</strong>'], vbreak;
for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    dot_radius = 2 * radii[i];
    labels.push(
    '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radius +
    'px; height: ' +
    dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 + 'px;">' + vbreak +
    '</span></p>');

}

legend.innerHTML = labels.join('');

map.addLayer({
    'id': 'covidCounts-point',
    'type': 'circle',
    'source': 'covidCounts',
    'paint': {
        'circle-radius': {
            'property': 'cases',
            'stops': [
            [grades[0], radii[0]],
            [grades[1], radii[1]],
            [grades[2], radii[2]]
            ]
        },
        'circle-color': {
            'property': 'cases',
            'stops': [
            [grades[0], colors[0]],
            [grades[1], colors[1]],
            [grades[2], colors[2]]
            ]
        },
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        'circle-opacity': 0.28
    }       
});



});