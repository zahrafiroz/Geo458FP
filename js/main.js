// Assign the access token
mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

// Declare the map object
const map = new mapboxgl.Map({
    container: 'map', // Container ID
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 10.0, // Starting zoom
    minZoom: 8.0, // Minimum zoom level
    maxBounds: [
        // Define the bounds within which the user can pan the map
        [-123.0, 47.0], // Southwest coordinates
        [-121.0, 49.0]  // Northeast coordinates
    ],
    center: [-122.18, 47.6002614], // Starting center coordinates (adjust according to your data)
    scrollZoom: true, // Enable scroll to zoom
    dragPan: true // Enable drag panning
});


// Define the asynchronous function to load GeoJSON data
async function geojsonFetch() {
    try {
        // Fetch GeoJSON data for population, floodways, and high-risk areas
        const response1 = await fetch('assets/FP-TotalPop.geojson');
        const fpTotalPopData = await response1.json();

        const response2 = await fetch('assets/floodways.geojson');
        const floodwaysData = await response2.json();

        const response3 = await fetch('assets/high-risk.geojson');
        const highRiskData = await response3.json();

        // Once GeoJSON data is fetched, set up map layers and legend
        map.on('load', () => {
            // Add GeoJSON data as sources
            map.addSource('population', {
                type: 'geojson',
                data: fpTotalPopData
            });

            map.addSource('floodway', {
                type: 'geojson',
                data: floodwaysData
            });

            map.addSource('floodrisk', {
                type: 'geojson',
                data: highRiskData
            });

            // Circle Layer for population
            map.addLayer({
                id: 'population-circle',
                type: 'circle',
                source: 'population',
                paint: {
                    'circle-color': '#FFA500',
                    'circle-radius': 5,
                    'circle-opacity': 0.5
                },
                layout: {
                    'visibility': 'visible' // Make population circle layer initially visible
                }
            }, 'waterway-label');

            // Line Layer for high-risk areas
            map.addLayer({
                id: 'risk-line',
                type: 'line',
                source: 'floodrisk',
                paint: {
                    'line-color': '#EE4B2B',
                    'line-opacity': 0.7
                },
                layout: {
                    'visibility': 'none' // Make risk line layer initially hidden
                }
            }, 'waterway-label');

            // Line Layer for floodways
            map.addLayer({
                id: 'flood-line',
                type: 'line',
                source: 'floodway',
                paint: {
                    'line-color': '#5C4033',
                    'line-opacity': 0.7
                },
                layout: {
                    'visibility': 'none' // Make flood line layer initially hidden
                }
            }, 'waterway-label');

            // Create legend
            const legendContainer = document.getElementById('legend-container');

            // Define legend items with appropriate categories and colors
            const legendItems = {
                'Population': '#FFA756',
                'High Risk': '#EE4B2B',
                'Floodways': '#5C4033'
            };

            // Add legend items with click event to toggle layer visibility
            Object.entries(legendItems).forEach(([category, color]) => {
                const legendItem = document.createElement('div');
                legendItem.className = 'legend-item';
                legendItem.style.backgroundColor = color;
                legendItem.textContent = category;
                legendItem.addEventListener('click', () => {
                    toggleLayerVisibility(category);
                });
                legendContainer.appendChild(legendItem);
            });
        });
    } catch (error) {
        console.error('Error loading GeoJSON data:', error);
    }
}

// Function to toggle layer visibility based on selected category
function toggleLayerVisibility(category) {
    // Set visibility for all layers based on the selected category
    switch (category) {
        case 'Population':
            map.setLayoutProperty('population-circle', 'visibility', 'visible');
            map.setLayoutProperty('risk-line', 'visibility', 'visible');
            map.setLayoutProperty('flood-line', 'visibility', 'visible');
            break;
        case 'High Risk':
            map.setLayoutProperty('population-circle', 'visibility', 'visible');
            map.setLayoutProperty('risk-line', 'visibility', 'visible');
            map.setLayoutProperty('flood-line', 'visibility', 'visible');
            break;
        case 'Floodways':
            map.setLayoutProperty('population-circle', 'visibility', 'visible');
            map.setLayoutProperty('risk-line', 'visibility', 'visible');
            map.setLayoutProperty('flood-line', 'visibility', 'visible');
            break;
        default:
            break;
    }
}
function toggleLayerVisibility(category) {
    // Toggle visibility for the selected layer and keep others unchanged
    switch (category) {
        case 'Population':
            toggleLayer('population-circle');
            break;
        case 'High Risk':
            toggleLayer('risk-line');
            break;
        case 'Floodways':
            toggleLayer('flood-line');
            break;
        default:
            break;
    }
}

function toggleLayer(layerId) {
    const visibility = map.getLayoutProperty(layerId, 'visibility');
    const newVisibility = visibility === 'visible' ? 'none' : 'visible';
    map.setLayoutProperty(layerId, 'visibility', newVisibility);
}

// Invoke the function to fetch GeoJSON and set up the map
geojsonFetch();

// Capture the reset element and add a click event to it
const reset = document.getElementById('reset');
reset.addEventListener('click', event => {
    // This event will trigger a page refresh
    location.reload();
});

