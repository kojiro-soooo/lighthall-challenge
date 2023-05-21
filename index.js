let map;

const { Map } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

async function initMap() {
    const center = { lat: 37.7529, lng: -122.4474, };
    const sourceData = await fetch("https://data.sfgov.org/resource/rqzj-sfat.json").then((data)=>data.json());
    const foodTrucks = [];
    const numFoodTrucks = 2;
    // sourceData.length
    const infowindow = new google.maps.InfoWindow();

    map = new Map(document.getElementById("map"), {
        zoom: 12.25,
        center: center,
        mapId: "DEMO_MAP_ID",
    });

    map.addListener('click', () => {
    if (infowindow != undefined){
        infowindow.close()
    } else {
        return
    }})
    
    // create food trucks array
    for (let i=0; i<numFoodTrucks; i++){
        foodTrucks.push({
            name: sourceData[i].applicant,
            type: (sourceData[i].fooditems != undefined ? "Menu items: " + sourceData[i].fooditems.replaceAll(':', ',') : "Menu is unavailable"),
            location: {lat: parseFloat(sourceData[i].latitude), lng: parseFloat(sourceData[i].longitude)}
        })
    }     

    function placeMarker(foodTruck) {
        const marker = new AdvancedMarkerElement({
            position: foodTruck.location,
            map: map
        });
        google.maps.event.addListener(marker, 'click', () => {
            infowindow.close();
            infowindow.setContent(`<h3>${foodTruck.name}</h3><p>${foodTruck.type}</p>`);
            infowindow.open(map, marker)
        })
    }
    foodTrucks.forEach( placeMarker )
}

window.initMap = initMap();
// window.eqfeed_callback = eqfeed_callback();